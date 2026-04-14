(function () {
  const body = document.body;
  if (!body || body.dataset.page !== "check") return;

  const lang =
    String(body.dataset.lang || "vi")
      .trim()
      .toLowerCase() === "en"
      ? "en"
      : "vi";
  const supportUrl = String(body.dataset.supportUrl || "").trim();
  const homeUrl = String(body.dataset.homeUrl || "/").trim() || "/";
  const BULK_STATUS_URL = "/shop/api/activate/chatgpt/keys/bulk-status";

  const copy = {
    en: {
      brandSub: "CDK key checker",
      home: "Home",
      support: "Support",
      title: "Key Checker",
      lead: "Check the status of multiple CDK keys at once.",
      panelTitle: "Key Checker",
      panelLead: "Paste keys below, one per line.",
      codesLabel: "Keys",
      codesPlaceholder:
        "DEMO0000000000000000000000000001\nDEMO0000000000000000000000000002\nDEMO0000000000000000000000000003",
      note: "Each line should contain one CDK. All checks run through our Doremon storefront API.",
      redeemPage: "Go to redeem page",
      apiDocs: "Integration API docs",
      check: "Check keys",
      checking: "Checking...",
      copyAvailable: "Copy {n} available keys",
      copied: "Available keys copied.",
      copyFailed: "Could not copy available keys.",
      summary: {
        total: "Total",
        available: "Available",
        activated: "Activated",
        notFound: "Not found",
      },
      status: {
        available: "Available",
        activated: "Activated",
        notFound: "Not found",
        unknown: "Unknown",
      },
      errors: {
        missingCodes: "Enter at least one valid key.",
        lookupFailed:
          "We could not check these keys right now. Please try again.",
      },
      meta: {
        notFound: "Not found in system",
        noDetails: "No plan details returned",
      },
    },
    vi: {
      brandSub: "Kiểm tra nhiều CDK",
      home: "Trang chủ",
      support: "Hỗ trợ",
      title: "Kiểm tra nhiều CDK",
      lead: "Kiểm tra trạng thái của nhiều mã CDK cùng lúc.",
      panelTitle: "Key Checker",
      panelLead: "Dán danh sách mã bên dưới, mỗi dòng một mã.",
      codesLabel: "Danh sách mã",
      codesPlaceholder:
        "DEMO0000000000000000000000000001\nDEMO0000000000000000000000000002\nDEMO0000000000000000000000000003",
      note: "Mỗi dòng nên chứa một mã CDK. Mọi yêu cầu kiểm tra đều đi qua API storefront của Doremon.",
      redeemPage: "Mở trang kích hoạt",
      apiDocs: "Tài liệu API cho đối tác",
      check: "Kiểm tra mã",
      checking: "Đang kiểm tra...",
      copyAvailable: "Sao chép {n} mã khả dụng",
      copied: "Đã sao chép các mã khả dụng.",
      copyFailed: "Không thể sao chép các mã khả dụng.",
      summary: {
        total: "Tổng",
        available: "Khả dụng",
        activated: "Đã kích hoạt",
        notFound: "Không tìm thấy",
      },
      status: {
        available: "Khả dụng",
        activated: "Đã kích hoạt",
        notFound: "Không tìm thấy",
        unknown: "Không rõ",
      },
      errors: {
        missingCodes: "Vui lòng nhập ít nhất một mã hợp lệ.",
        lookupFailed: "Hiện không thể kiểm tra các mã này. Vui lòng thử lại.",
      },
      meta: {
        notFound: "Không tìm thấy trong hệ thống",
        noDetails: "Không có thông tin gói trả về",
      },
    },
  }[lang];

  const el = {
    langBtn: document.getElementById("checkLangBtn"),
    alert: document.getElementById("checkAlert"),
    textarea: document.getElementById("checkCodesInput"),
    count: document.getElementById("checkCodesCount"),
    submitBtn: document.getElementById("checkSubmitBtn"),
    submitBtnText: document.getElementById("checkSubmitBtnText"),
    resultsSection: document.getElementById("checkResultsSection"),
    totalValue: document.getElementById("checkTotalValue"),
    availableValue: document.getElementById("checkAvailableValue"),
    activatedValue: document.getElementById("checkActivatedValue"),
    notFoundValue: document.getElementById("checkNotFoundValue"),
    copyAvailableBtn: document.getElementById("checkCopyAvailableBtn"),
    copyAvailableText: document.getElementById("checkCopyAvailableText"),
    resultsList: document.getElementById("checkResultsList"),
  };

  const state = {
    results: [],
    availableCodes: [],
  };

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase();
  }

  function parseCodes(raw) {
    const lines = String(raw || "").split(/[\n,]+/);
    const codes = [];
    const seen = new Set();
    for (let index = 0; index < lines.length; index += 1) {
      const code = normalizeCode(lines[index]);
      if (!code || seen.has(code)) continue;
      seen.add(code);
      codes.push(code);
    }
    return codes;
  }

  function localizeApiMessage(message, fallback) {
    const normalized = String(message || "")
      .trim()
      .toLowerCase();
    if (!normalized) return fallback;
    if (normalized === "missing_codes") return copy.errors.missingCodes;
    if (normalized === "missing activation codes")
      return copy.errors.missingCodes;
    return String(message || "").trim();
  }

  async function requestJson(url, options) {
    const response = await fetch(url, options || {});
    const payload = await response.json().catch(function () {
      return {};
    });
    if (!response.ok) {
      const rawMessage = String(payload.message || payload.error || "").trim();
      throw new Error(localizeApiMessage(rawMessage, copy.errors.lookupFailed));
    }
    return payload;
  }

  function setBusy(busy) {
    if (el.submitBtn) el.submitBtn.disabled = Boolean(busy);
    if (el.submitBtnText) {
      el.submitBtnText.textContent = busy ? copy.checking : buttonLabel();
    }
  }

  function showAlert(message, kind) {
    const textValue = String(message || "").trim();
    if (!el.alert) return;
    el.alert.hidden = !textValue;
    el.alert.className =
      "activate-alert" + (kind === "success" ? " is-success" : " is-error");
    el.alert.innerHTML =
      '<i class="fas ' +
      (kind === "success" ? "fa-circle-check" : "fa-circle-exclamation") +
      '"></i><div>' +
      escapeHtml(textValue) +
      "</div>";
  }

  function clearAlert() {
    showAlert("", "error");
  }

  function buttonLabel() {
    const count = parseCodes(el.textarea ? el.textarea.value : "").length;
    return count > 0 ? copy.check + " " + count : copy.check;
  }

  function updateCount() {
    const count = parseCodes(el.textarea ? el.textarea.value : "").length;
    if (el.count) el.count.textContent = String(count);
    if (el.submitBtnText && !el.submitBtn.disabled) {
      el.submitBtnText.textContent = buttonLabel();
    }
  }

  function localizeStatus(value) {
    const normalized = String(value || "")
      .trim()
      .toLowerCase();
    if (normalized === "available") return copy.status.available;
    if (normalized === "activated") return copy.status.activated;
    if (normalized === "not_found") return copy.status.notFound;
    return String(value || copy.status.unknown).trim() || copy.status.unknown;
  }

  function badgeClass(value) {
    const normalized = String(value || "")
      .trim()
      .toLowerCase();
    if (normalized === "available") return "check-result-badge--available";
    if (normalized === "activated") return "check-result-badge--activated";
    if (normalized === "not_found") return "check-result-badge--missing";
    if (normalized === "error") return "check-result-badge--error";
    return "check-result-badge--other";
  }

  function metaText(item) {
    if (item.status === "not_found") return copy.meta.notFound;
    const parts = [];
    if (item.service) parts.push(String(item.service).toUpperCase());
    if (item.plan) parts.push(String(item.plan).toUpperCase());
    if (item.term) parts.push(String(item.term));
    if (!parts.length) return copy.meta.noDetails;
    return parts.join(" ");
  }

  function renderResults(results) {
    state.results = Array.isArray(results) ? results.slice() : [];
    state.availableCodes = state.results
      .filter(function (item) {
        return item.status === "available";
      })
      .map(function (item) {
        return item.code;
      });

    const summary = {
      total: state.results.length,
      available: 0,
      activated: 0,
      notFound: 0,
    };

    state.results.forEach(function (item) {
      if (item.status === "available") summary.available += 1;
      else if (item.status === "activated") summary.activated += 1;
      else if (item.status === "not_found") summary.notFound += 1;
    });

    el.totalValue.textContent = String(summary.total);
    el.availableValue.textContent = String(summary.available);
    el.activatedValue.textContent = String(summary.activated);
    el.notFoundValue.textContent = String(summary.notFound);
    el.resultsSection.hidden = summary.total === 0;

    if (state.availableCodes.length) {
      el.copyAvailableBtn.hidden = false;
      el.copyAvailableText.textContent = copy.copyAvailable.replace(
        "{n}",
        String(state.availableCodes.length),
      );
    } else {
      el.copyAvailableBtn.hidden = true;
    }

    el.resultsList.innerHTML = state.results
      .map(function (item) {
        return (
          '<article class="check-result-item">' +
          '<div class="check-result-main">' +
          '<strong class="check-result-code">' +
          escapeHtml(item.code) +
          "</strong>" +
          '<div class="check-result-meta">' +
          escapeHtml(metaText(item)) +
          "</div>" +
          "</div>" +
          '<span class="check-result-badge ' +
          badgeClass(item.status) +
          '">' +
          escapeHtml(localizeStatus(item.statusRaw || item.status)) +
          "</span>" +
          "</article>"
        );
      })
      .join("");
  }

  function buildResults(codes, payload) {
    const foundList = Array.isArray(payload && payload.found)
      ? payload.found
      : [];
    const notFoundList = Array.isArray(payload && payload.not_found)
      ? payload.not_found
      : [];
    const foundMap = new Map();

    foundList.forEach(function (item) {
      const code = normalizeCode(item && item.code);
      if (!code) return;
      foundMap.set(code, {
        code: code,
        status: String(item && item.status ? item.status : "unknown")
          .trim()
          .toLowerCase(),
        statusRaw: String(
          item && item.status ? item.status : copy.status.unknown,
        ),
        service: String(item && item.service ? item.service : "").trim(),
        plan: String(item && item.plan ? item.plan : "").trim(),
        term: String(item && item.term ? item.term : "").trim(),
      });
    });

    notFoundList.forEach(function (value) {
      const code = normalizeCode(value);
      if (!code || foundMap.has(code)) return;
      foundMap.set(code, {
        code: code,
        status: "not_found",
        statusRaw: "not_found",
        service: "",
        plan: "",
        term: "",
      });
    });

    return codes.map(function (code) {
      return (
        foundMap.get(code) || {
          code: code,
          status: "not_found",
          statusRaw: "not_found",
          service: "",
          plan: "",
          term: "",
        }
      );
    });
  }

  async function copyAvailableCodes() {
    if (!state.availableCodes.length) return;
    const text = state.availableCodes.join("\n");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("clipboard_unavailable");
      }
      showAlert(copy.copied, "success");
    } catch (_) {
      showAlert(copy.copyFailed, "error");
    }
  }

  async function submit() {
    const codes = parseCodes(el.textarea ? el.textarea.value : "");
    if (!codes.length) {
      showAlert(copy.errors.missingCodes, "error");
      return;
    }

    clearAlert();
    setBusy(true);
    try {
      const payload = await requestJson(BULK_STATUS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes: codes }),
      });
      renderResults(buildResults(codes, payload));
    } catch (error) {
      showAlert(error.message || copy.errors.lookupFailed, "error");
    } finally {
      setBusy(false);
      updateCount();
    }
  }

  function switchLanguage() {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang === "en" ? "vi" : "en");
    window.location.assign(url.pathname + url.search + url.hash);
  }

  function applyCopy() {
    document.title =
      copy.title + " · " + String(body.dataset.brandName || "Store");
    setText("checkBrandSub", copy.brandSub);
    setText("checkPageTitle", copy.title);
    setText("checkPageLead", copy.lead);
    setText("checkPanelTitle", copy.panelTitle);
    setText("checkPanelLead", copy.panelLead);
    setText("checkCodesLabel", copy.codesLabel);
    setText("checkNoteText", copy.note);
    setText("checkRedeemText", copy.redeemPage);
    setText("checkApiDocsText", copy.apiDocs);
    setText("checkTotalLabel", copy.summary.total);
    setText("checkAvailableLabel", copy.summary.available);
    setText("checkActivatedLabel", copy.summary.activated);
    setText("checkNotFoundLabel", copy.summary.notFound);

    const homeSpan = document.querySelector("#checkHomeLink span");
    const supportSpan = document.querySelector("#checkSupportLink span");
    if (homeSpan) homeSpan.textContent = copy.home;
    if (supportSpan) supportSpan.textContent = copy.support;
    if (el.textarea) el.textarea.placeholder = copy.codesPlaceholder;
    if (el.langBtn) el.langBtn.textContent = lang === "en" ? "VI" : "EN";
    updateCount();
  }

  function bindEvents() {
    if (el.langBtn) el.langBtn.addEventListener("click", switchLanguage);
    if (el.submitBtn) el.submitBtn.addEventListener("click", submit);
    if (el.copyAvailableBtn) {
      el.copyAvailableBtn.addEventListener("click", copyAvailableCodes);
    }
    if (el.textarea) {
      el.textarea.addEventListener("input", updateCount);
      el.textarea.addEventListener("keydown", function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          submit();
        }
      });
    }
  }

  function boot() {
    applyCopy();
    bindEvents();
    if (supportUrl) {
      document.getElementById("checkSupportLink").href = supportUrl;
    }
    if (homeUrl) {
      document.getElementById("checkHomeLink").href = homeUrl;
    }
  }

  boot();
})();
