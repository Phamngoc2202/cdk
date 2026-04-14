(function () {
  const body = document.body;
  if (!body || body.dataset.page !== "activate") return;

  const lang =
    String(body.dataset.lang || "vi")
      .trim()
      .toLowerCase() === "en"
      ? "en"
      : "vi";
  const supportUrl = String(body.dataset.supportUrl || "").trim();
  const homeUrl = String(body.dataset.homeUrl || "/").trim() || "/";
  const API_BASE = "/shop/api/activate/chatgpt";
  const POLL_INTERVAL_MS = 1000;
  const POLL_DEADLINE_MS = 240000;

  const state = {
    step: 1,
    key: null,
    sessionRaw: "",
    sessionData: null,
    finalActivation: null,
    pollTimer: null,
    activationStartedAt: 0,
    attempts: 0,
  };

  const copy = {
    en: {
      brandSub: "Subscription activation",
      home: "Home",
      support: "Support",
      title: "Activate subscription",
      lead: "Redeem your CDK key to activate a ChatGPT subscription.",
      stepPrefix: "Step",
      steps: [
        "Validate CDK",
        "Token verification",
        "Confirm recharge",
        "Complete",
      ],
      panel1Title: "Verify card key",
      panel1Lead: "Enter your CDK key to begin the activation process.",
      codeLabel: "Subscription key",
      codePlaceholder: "e.g. 3200222F249E4CB6981FF0C362E47AC7",
      keyNote:
        "Keys are single-use only. Please ensure you are logged into the correct account before activation.",
      bulkCheck: "Bulk key checker",
      apiDocs: "Integration API docs",
      validate: "Start verification",
      validating: "Verifying key...",
      panel2Title: "Token verification",
      panel2Lead:
        "Paste the complete session JSON below. The system will automatically extract your account information.",
      sessionLink: "Get session token",
      sessionPlaceholder: "Paste the complete session JSON here...",
      panel3Title: "Confirm recharge",
      panel3Lead: "Review the details below before proceeding.",
      panel4Title: "Activating your subscription",
      panel4Lead:
        "Please keep this page open while we verify the activation status.",
      back: "Back",
      continue: "Confirm and continue",
      confirm: "Confirm recharge",
      loading: "Processing...",
      retry: "Try again",
      startOver: "Start over",
      contactSupport: "Contact support",
      labels: {
        key: "Key",
        account: "Account",
        code: "Code",
        plan: "Plan",
        duration: "Duration",
        service: "Service",
        name: "Name",
        email: "Email",
        currentPlan: "Current plan",
        tokenExpires: "Token expires",
      },
      errors: {
        missingCode: "Enter a valid activation key.",
        keyNotFound: "Key not found.",
        lookupFailed:
          "We could not verify this key right now. Please try again.",
        invalidSession:
          "Paste the full ChatGPT session JSON from the session page. Select all content and copy it again if needed.",
        noAccessToken:
          "Make sure you are logged in to ChatGPT in this browser, then copy the session JSON again.",
        workspace:
          "This session belongs to a ChatGPT workspace. Switch to your personal account and try again.",
        alreadyActivated:
          "This key has already been activated. Please contact support if that is unexpected.",
        providerRejected:
          "The activation provider rejected this request. Please try again or contact support.",
        timeout:
          "Activation is taking longer than expected. Please try again or contact support.",
        generic: "Activation failed. Please try again or contact support.",
      },
      replaceWarning:
        "This account already has a paid plan. Continuing may replace the current subscription instead of extending it.",
      successSummary: {
        accountTitle: "Upgraded account",
        keyTitle: "Activated key",
      },
      status: {
        idleTitle: "Waiting to start...",
        idleBody: "The activation status will appear here.",
        progressTitle: "Activation in progress",
        progressBody:
          "Please wait while the activation service processes your subscription.",
        progressMeta: "Attempts: {n}",
        successTitle: "Activation complete",
        successBody:
          "Refresh ChatGPT to check the updated subscription on this account.",
        successAccountBody:
          "This key was applied to {account}. Refresh ChatGPT to check the updated subscription.",
        errorTitle: "Activation failed",
      },
    },
    vi: {
      brandSub: "Kích hoạt gói đăng ký",
      home: "Trang chủ",
      support: "Hỗ trợ",
      title: "Kích hoạt gói đăng ký",
      lead: "Dùng mã CDK để kích hoạt gói ChatGPT.",
      stepPrefix: "Bước",
      steps: ["Kiểm tra CDK", "Xác minh token", "Xác nhận nạp", "Hoàn tất"],
      panel1Title: "Xác minh mã thẻ",
      panel1Lead: "Nhập mã CDK để bắt đầu quá trình kích hoạt.",
      codeLabel: "Mã kích hoạt",
      codePlaceholder: "ví dụ 3200222F249E4CB6981FF0C362E47AC7",
      keyNote:
        "Mã chỉ dùng được một lần. Hãy đảm bảo bạn đang đăng nhập đúng tài khoản trước khi kích hoạt.",
      bulkCheck: "Kiểm tra nhiều CDK",
      apiDocs: "Tài liệu API cho đối tác",
      validate: "Bắt đầu xác minh",
      validating: "Đang kiểm tra mã...",
      panel2Title: "Xác minh token",
      panel2Lead:
        "Dán toàn bộ session JSON bên dưới. Hệ thống sẽ tự động trích xuất thông tin tài khoản.",
      sessionLink: "Lấy session token",
      sessionPlaceholder: "Dán toàn bộ session JSON vào đây...",
      panel3Title: "Xác nhận nạp",
      panel3Lead: "Kiểm tra kỹ thông tin bên dưới trước khi tiếp tục.",
      panel4Title: "Đang kích hoạt gói đăng ký",
      panel4Lead:
        "Vui lòng giữ trang này mở trong khi hệ thống kiểm tra trạng thái kích hoạt.",
      back: "Quay lại",
      continue: "Xác nhận và tiếp tục",
      confirm: "Xác nhận nạp",
      loading: "Đang xử lý...",
      retry: "Thử lại",
      startOver: "Bắt đầu lại",
      contactSupport: "Liên hệ hỗ trợ",
      labels: {
        key: "Mã",
        account: "Tài khoản",
        code: "Code",
        plan: "Gói",
        duration: "Thời hạn",
        service: "Dịch vụ",
        name: "Tên",
        email: "Email",
        currentPlan: "Gói hiện tại",
        tokenExpires: "Token hết hạn",
      },
      errors: {
        missingCode: "Vui lòng nhập mã kích hoạt hợp lệ.",
        keyNotFound: "Không tìm thấy mã kích hoạt này.",
        lookupFailed: "Hiện không thể xác minh mã này. Vui lòng thử lại.",
        invalidSession:
          "Vui lòng dán đầy đủ session JSON của ChatGPT. Nếu cần, hãy mở lại trang session, chọn toàn bộ nội dung rồi sao chép lại.",
        noAccessToken:
          "Hãy đảm bảo bạn đã đăng nhập ChatGPT trong trình duyệt này rồi sao chép lại session JSON.",
        workspace:
          "Session này thuộc workspace ChatGPT. Hãy chuyển về tài khoản cá nhân rồi thử lại.",
        alreadyActivated:
          "Mã này đã được kích hoạt trước đó. Nếu có gì bất thường, vui lòng liên hệ hỗ trợ.",
        providerRejected:
          "Nhà cung cấp đã từ chối yêu cầu kích hoạt này. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
        timeout:
          "Quá trình kích hoạt đang lâu hơn dự kiến. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
        generic: "Kích hoạt thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
      },
      replaceWarning:
        "Tài khoản này đang có gói trả phí. Nếu tiếp tục, gói hiện tại có thể bị thay thế thay vì được cộng dồn thời gian.",
      successSummary: {
        accountTitle: "Tài khoản đã nâng cấp",
        keyTitle: "Mã đã kích hoạt",
      },
      status: {
        idleTitle: "Đang chờ bắt đầu...",
        idleBody: "Trạng thái kích hoạt sẽ hiển thị tại đây.",
        progressTitle: "Đang kích hoạt",
        progressBody:
          "Vui lòng chờ trong khi hệ thống xử lý yêu cầu kích hoạt của bạn.",
        progressMeta: "Số lần kiểm tra: {n}",
        successTitle: "Kích hoạt thành công",
        successBody:
          "Hãy tải lại ChatGPT để kiểm tra gói đăng ký trên tài khoản này.",
        successAccountBody:
          "Mã này đã được áp dụng cho tài khoản {account}. Hãy tải lại ChatGPT để kiểm tra gói đăng ký đã cập nhật.",
        errorTitle: "Kích hoạt thất bại",
      },
    },
  }[lang];

  const el = {
    langBtn: document.getElementById("activateLangBtn"),
    alert: document.getElementById("activateAlert"),
    progress: document.getElementById("activateStepProgress"),
    stepBadge: document.getElementById("activateStepBadge"),
    stepCurrentTitle: document.getElementById("activateStepCurrentTitle"),
    panels: [1, 2, 3, 4].map(function (step) {
      return document.getElementById("activatePanel" + step);
    }),
    codeInput: document.getElementById("activateCodeInput"),
    sessionInput: document.getElementById("activateSessionInput"),
    validateBtn: document.getElementById("activateValidateBtn"),
    continueBtn: document.getElementById("activateContinueBtn"),
    confirmBtn: document.getElementById("activateConfirmBtn"),
    retryBtn: document.getElementById("activateRetryBtn"),
    startOverBtn: document.getElementById("activateStartOverBtn"),
    replaceWarning: document.getElementById("activateReplaceWarning"),
    successBox: document.getElementById("activateSuccessBox"),
    successDetails: document.getElementById("activateSuccessDetails"),
    errorBox: document.getElementById("activateErrorBox"),
    statusTitle: document.getElementById("activateStatusTitle"),
    statusText: document.getElementById("activateStatusText"),
    statusMeta: document.getElementById("activateStatusMeta"),
    supportLinksWrap: document.querySelector(".activate-support-links"),
  };

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function queryValue(name) {
    return String(
      new URL(window.location.href).searchParams.get(name) || "",
    ).trim();
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

  function firstText(values, fallback) {
    for (let index = 0; index < values.length; index += 1) {
      const textValue = String(values[index] || "").trim();
      if (textValue) return textValue;
    }
    return fallback || "";
  }

  function asRecord(value) {
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  }

  function setBusy(button, busy, label) {
    if (!button) return;
    button.disabled = Boolean(busy);
    const textNode = button.querySelector("span");
    if (textNode && label) textNode.textContent = label;
  }

  function showAlert(message, kind) {
    const textValue = String(message || "").trim();
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

  function setStep(step) {
    state.step = step;

    el.panels.forEach(function (panel, index) {
      if (panel) panel.hidden = index + 1 !== step;
    });

    if (el.stepBadge) {
      el.stepBadge.textContent = copy.stepPrefix + " " + step + "/4";
    }
    if (el.stepCurrentTitle) {
      el.stepCurrentTitle.textContent = copy.steps[step - 1] || "";
    }

    el.progress.style.width =
      { 1: "0%", 2: "33.33%", 3: "66.66%", 4: "100%" }[step] || "0%";
  }

  function localizePlan(value) {
    const raw = String(value || "")
      .trim()
      .toLowerCase();
    if (!raw) return "-";
    const table = {
      free: lang === "en" ? "Free" : "Miễn phí",
      plus: "Plus",
      pro: "Pro",
      business: lang === "en" ? "Business" : "Business",
      personal: lang === "en" ? "Personal" : "Cá nhân",
    };
    return table[raw] || String(value);
  }

  function localizeService(value) {
    const raw = String(value || "")
      .trim()
      .toLowerCase();
    if (!raw) return "-";
    if (raw === "chatgpt") return "CHATGPT";
    return String(value || "-").toUpperCase();
  }

  function formatDate(value) {
    const raw = String(value || "").trim();
    if (!raw) return "-";
    const date = new Date(raw);
    if (!Number.isFinite(date.getTime())) return raw;
    return date.toLocaleString(lang === "en" ? "en-US" : "vi-VN");
  }

  function setStatus(title, body, meta) {
    el.statusTitle.textContent = title;
    el.statusText.textContent = body;
    el.statusMeta.textContent = meta || "";
  }

  function clearPolling() {
    if (state.pollTimer) {
      clearTimeout(state.pollTimer);
      state.pollTimer = null;
    }
  }

  function updateQueryCode(code) {
    const url = new URL(window.location.href);
    if (code) url.searchParams.set("code", code);
    else url.searchParams.delete("code");
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function applyCopy() {
    document.title =
      copy.title + " · " + String(body.dataset.brandName || "Store");
    setText("activateBrandSub", copy.brandSub);
    setText("activatePageTitle", copy.title);
    setText("activatePageLead", copy.lead);
    setText("panel1Title", copy.panel1Title);
    setText("panel1Lead", copy.panel1Lead);
    setText("activateCodeLabel", copy.codeLabel);
    setText("activateBulkCheckText", copy.bulkCheck);
    setText("activateApiDocsText", copy.apiDocs);
    setText("activateValidateBtnText", copy.validate);
    setText("activateKeyNoteText", copy.keyNote);
    setText("panel2Title", copy.panel2Title);
    setText("panel2Lead", copy.panel2Lead);
    setText("activateSessionLinkText", copy.sessionLink);
    setText("activateContinueBtnText", copy.continue);
    setText("panel3Title", copy.panel3Title);
    setText("panel3Lead", copy.panel3Lead);
    setText("activateConfirmBtnText", copy.confirm);
    setText("panel4Title", copy.panel4Title);
    setText("panel4Lead", copy.panel4Lead);
    setText("confirmKeyTitle", copy.labels.key);
    setText("confirmAccountTitle", copy.labels.account);
    setText("confirmCodeLabel", copy.labels.code);
    setText("confirmPlanLabel", copy.labels.plan);
    setText("confirmTermLabel", copy.labels.duration);
    setText("confirmServiceLabel", copy.labels.service);
    setText("confirmNameLabel", copy.labels.name);
    setText("confirmEmailLabel", copy.labels.email);
    setText("confirmCurrentPlanLabel", copy.labels.currentPlan);
    setText("confirmTokenExpiresLabel", copy.labels.tokenExpires);
    setText("activateReplaceWarningText", copy.replaceWarning);
    setText("activateSuccessTitle", copy.status.successTitle);
    setText("activateSuccessText", copy.status.successBody);
    setText("activateSuccessAccountTitle", copy.successSummary.accountTitle);
    setText("activateSuccessKeyTitle", copy.successSummary.keyTitle);
    setText("successNameLabel", copy.labels.name);
    setText("successEmailLabel", copy.labels.email);
    setText("successCurrentPlanLabel", copy.labels.currentPlan);
    setText("successTokenExpiresLabel", copy.labels.tokenExpires);
    setText("successCodeLabel", copy.labels.code);
    setText("successPlanLabel", copy.labels.plan);
    setText("successTermLabel", copy.labels.duration);
    setText("successServiceLabel", copy.labels.service);
    setText("activateErrorTitle", copy.status.errorTitle);
    setText("activateErrorText", copy.errors.generic);
    setText("activateRetryBtn", copy.retry);
    setText("activateStartOverBtn", copy.startOver);

    const homeSpan = document.querySelector("#activateHomeLink span");
    const supportSpan = document.querySelector("#activateSupportLink span");
    if (homeSpan) homeSpan.textContent = copy.home;
    if (supportSpan) supportSpan.textContent = copy.support;

    const codeInput = document.getElementById("activateCodeInput");
    const sessionInput = document.getElementById("activateSessionInput");
    if (codeInput) codeInput.placeholder = copy.codePlaceholder;
    if (sessionInput) sessionInput.placeholder = copy.sessionPlaceholder;

    const backCode = document.getElementById("activateBackToCodeBtn");
    const backSession = document.getElementById("activateBackToSessionBtn");
    if (backCode) backCode.textContent = copy.back;
    if (backSession) backSession.textContent = copy.back;

    if (el.langBtn) el.langBtn.textContent = lang === "en" ? "VI" : "EN";
    setStatus(copy.status.idleTitle, copy.status.idleBody, "");
  }

  async function requestJson(url, options) {
    const response = await fetch(url, options || {});
    const payload = await response.json().catch(function () {
      return {};
    });
    if (!response.ok) {
      const rawMessage = String(payload.message || payload.error || "").trim();
      const error = new Error(
        localizeApiMessage(
          rawMessage,
          copy.errors.lookupFailed,
          payload,
          response.status,
        ),
      );
      error.statusCode = Number(response.status || 0);
      error.apiError = String(payload.error || "")
        .trim()
        .toLowerCase();
      throw error;
    }
    return payload;
  }

  function localizeApiMessage(message, fallback, payload, statusCode) {
    const textValue = String(message || "").trim();
    const normalized = textValue.toLowerCase();
    const category = String((payload && payload.category) || "")
      .trim()
      .toLowerCase();
    const payloadError = String((payload && payload.error) || "")
      .trim()
      .toLowerCase();
    if (
      payloadError === "upstream_timeout" ||
      normalized === "upstream_timeout" ||
      Number(statusCode || 0) === 504 ||
      normalized.includes("timed out")
    ) {
      return copy.errors.timeout;
    }
    if (!normalized && category === "provider_rejected") {
      return copy.errors.providerRejected;
    }
    if (!normalized) return fallback;
    if (normalized === "key not found") return copy.errors.keyNotFound;
    if (normalized.includes("already activated")) {
      return copy.errors.alreadyActivated;
    }
    if (category === "provider_rejected") return copy.errors.providerRejected;
    return textValue;
  }

  function isUpstreamTimeoutError(error) {
    return (
      Number((error && error.statusCode) || 0) === 504 ||
      String((error && error.apiError) || "")
        .trim()
        .toLowerCase() === "upstream_timeout"
    );
  }

  function fillConfirmDetails() {
    const user =
      state.sessionData && state.sessionData.user ? state.sessionData.user : {};
    const account =
      state.sessionData && state.sessionData.account
        ? state.sessionData.account
        : {};

    setText(
      "confirmCodeValue",
      state.key && state.key.code ? state.key.code : "-",
    );
    setText("confirmPlanValue", localizePlan(state.key && state.key.plan));
    setText(
      "confirmTermValue",
      state.key && state.key.term ? state.key.term : "-",
    );
    setText(
      "confirmServiceValue",
      localizeService(state.key && state.key.service),
    );
    setText("confirmNameValue", user.name ? String(user.name) : "-");
    setText("confirmEmailValue", user.email ? String(user.email) : "-");
    setText(
      "confirmCurrentPlanValue",
      localizePlan(account.planType || "free"),
    );
    setText(
      "confirmTokenExpiresValue",
      formatDate(state.sessionData && state.sessionData.expires),
    );

    el.replaceWarning.hidden =
      String(account.planType || "free")
        .trim()
        .toLowerCase() === "free";
  }

  function fillSuccessDetails() {
    const payload = asRecord(state.finalActivation);
    const sessionData = asRecord(state.sessionData);
    const user = Object.assign(
      {},
      asRecord(sessionData.user),
      asRecord(payload.user),
    );
    const account = Object.assign(
      {},
      asRecord(sessionData.account),
      asRecord(payload.account),
    );
    const accountLabel = firstText(
      [
        payload.activated_email,
        payload.email,
        user.email,
        payload.name,
        user.name,
      ],
      "",
    );

    setText("successNameValue", firstText([payload.name, user.name], "-"));
    setText(
      "successEmailValue",
      firstText([payload.activated_email, payload.email, user.email], "-"),
    );
    setText(
      "successCurrentPlanValue",
      localizePlan(firstText([payload.plan, account.planType], "")),
    );
    setText(
      "successTokenExpiresValue",
      formatDate(firstText([payload.expires, sessionData.expires], "")),
    );
    setText(
      "successCodeValue",
      firstText([payload.code, state.key && state.key.code], "-"),
    );
    setText(
      "successPlanValue",
      localizePlan(firstText([payload.plan, state.key && state.key.plan], "")),
    );
    setText(
      "successTermValue",
      firstText([payload.term, state.key && state.key.term], "-"),
    );
    setText(
      "successServiceValue",
      localizeService(
        firstText([payload.service, state.key && state.key.service], ""),
      ),
    );

    if (el.successDetails) el.successDetails.hidden = false;
    return accountLabel;
  }

  function resetActivationFlow() {
    clearPolling();
    clearAlert();
    state.key = null;
    state.sessionRaw = "";
    state.sessionData = null;
    state.finalActivation = null;
    state.activationStartedAt = 0;
    state.attempts = 0;
    updateQueryCode("");
    if (el.codeInput) el.codeInput.value = "";
    if (el.sessionInput) el.sessionInput.value = "";
    if (el.replaceWarning) el.replaceWarning.hidden = true;
    if (el.successBox) el.successBox.hidden = true;
    if (el.successDetails) el.successDetails.hidden = true;
    if (el.errorBox) el.errorBox.hidden = true;
    setBusy(el.validateBtn, false, copy.validate);
    setBusy(el.confirmBtn, false, copy.confirm);
    setStatus(copy.status.idleTitle, copy.status.idleBody, "");
    setStep(1);
  }

  async function validateCode() {
    const code = normalizeCode(el.codeInput.value);
    if (!code) {
      showAlert(copy.errors.missingCode, "error");
      return;
    }

    clearAlert();
    setBusy(el.validateBtn, true, copy.validating);

    try {
      const payload = await requestJson(
        API_BASE + "/keys/" + encodeURIComponent(code),
      );
      el.codeInput.value = code;
      updateQueryCode(code);
      if (
        String(payload.status || "")
          .trim()
          .toLowerCase() === "activated"
      ) {
        state.key = null;
        setStep(1);
        showAlert(copy.errors.alreadyActivated, "error");
        return;
      }

      state.key = payload;
      setStep(2);
    } catch (error) {
      showAlert(error.message || copy.errors.lookupFailed, "error");
    } finally {
      setBusy(el.validateBtn, false, copy.validate);
    }
  }

  function parseSession(raw) {
    const trimmed = String(raw || "").trim();
    if (!trimmed) throw new Error(copy.errors.invalidSession);

    let payload;
    try {
      payload = JSON.parse(trimmed);
    } catch (_) {
      throw new Error(copy.errors.invalidSession);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error(copy.errors.invalidSession);
    }
    if (!payload.accessToken) {
      throw new Error(copy.errors.noAccessToken);
    }
    if (
      String((payload.account && payload.account.structure) || "")
        .trim()
        .toLowerCase() === "workspace"
    ) {
      throw new Error(copy.errors.workspace);
    }
    return payload;
  }

  function continueToConfirm() {
    clearAlert();

    try {
      state.sessionRaw = String(el.sessionInput.value || "").trim();
      state.sessionData = parseSession(state.sessionRaw);
    } catch (error) {
      showAlert(error.message || copy.errors.invalidSession, "error");
      return;
    }

    fillConfirmDetails();
    setStep(3);
  }

  function messageFromPayload(payload) {
    const message = String(
      (payload && (payload.message || payload.error)) || "",
    ).trim();
    return localizeApiMessage(message, copy.errors.generic, payload, 0);
  }

  function showSuccess(payload) {
    if (payload) state.finalActivation = asRecord(payload);
    el.errorBox.hidden = true;
    el.successBox.hidden = false;
    const accountLabel = fillSuccessDetails();
    const successText = accountLabel
      ? copy.status.successAccountBody.replace("{account}", accountLabel)
      : copy.status.successBody;
    setText("activateSuccessText", successText);
    setStatus(copy.status.successTitle, successText, "");
  }

  function showError(message) {
    el.successBox.hidden = true;
    if (el.successDetails) el.successDetails.hidden = true;
    el.errorBox.hidden = false;
    setText("activateErrorTitle", copy.status.errorTitle);
    setText("activateErrorText", message || copy.errors.generic);
    setStatus(copy.status.errorTitle, message || copy.errors.generic, "");
  }

  async function pollActivation() {
    clearPolling();
    if (!state.key || !state.key.code) return;

    if (Date.now() - state.activationStartedAt > POLL_DEADLINE_MS) {
      setBusy(el.confirmBtn, false, copy.confirm);
      showError(copy.errors.timeout);
      return;
    }

    try {
      const payload = await requestJson(
        API_BASE +
          "/keys/" +
          encodeURIComponent(state.key.code) +
          "/activation",
      );
      const status = String(payload.status || "")
        .trim()
        .toLowerCase();
      state.attempts = Number(payload.attempts || state.attempts || 0);

      if (status === "activated") {
        setBusy(el.confirmBtn, false, copy.confirm);
        showSuccess(payload);
        return;
      }

      if (status === "error") {
        setBusy(el.confirmBtn, false, copy.confirm);
        showError(messageFromPayload(payload));
        return;
      }

      setStatus(
        copy.status.progressTitle,
        copy.status.progressBody,
        copy.status.progressMeta.replace("{n}", String(state.attempts || 1)),
      );
      state.pollTimer = window.setTimeout(pollActivation, POLL_INTERVAL_MS);
    } catch (error) {
      if (isUpstreamTimeoutError(error)) {
        setBusy(el.confirmBtn, false, copy.confirm);
        showError(error.message || copy.errors.timeout);
        return;
      }
      state.pollTimer = window.setTimeout(pollActivation, POLL_INTERVAL_MS);
    }
  }

  async function startActivation() {
    if (!state.key || !state.key.code || !state.sessionRaw) {
      showAlert(copy.errors.invalidSession, "error");
      return;
    }

    clearAlert();
    clearPolling();
    state.attempts = 0;
    state.finalActivation = null;
    state.activationStartedAt = Date.now();
    setBusy(el.confirmBtn, true, copy.loading);
    setStep(4);
    el.successBox.hidden = true;
    if (el.successDetails) el.successDetails.hidden = true;
    el.errorBox.hidden = true;
    setStatus(copy.status.progressTitle, copy.status.progressBody, "");

    try {
      const payload = await requestJson(API_BASE + "/keys/activate-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: state.key.code,
          session: state.sessionRaw,
        }),
      });

      if (
        String(payload.status || "")
          .trim()
          .toLowerCase() === "activated"
      ) {
        setBusy(el.confirmBtn, false, copy.confirm);
        showSuccess(payload);
        return;
      }

      if (payload.error) {
        throw new Error(messageFromPayload(payload));
      }

      pollActivation();
    } catch (error) {
      setBusy(el.confirmBtn, false, copy.confirm);
      showError(error.message || copy.errors.generic);
    }
  }

  function switchLanguage() {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang === "en" ? "vi" : "en");
    window.location.assign(url.pathname + url.search + url.hash);
  }

  function setSupportLink(id, url) {
    const node = document.getElementById(id);
    if (!node) return false;
    const value = String(url || "").trim();
    node.hidden = !value;
    if (value) node.href = value;
    return Boolean(value);
  }

  function bindEvents() {
    if (el.langBtn) el.langBtn.addEventListener("click", switchLanguage);
    if (el.validateBtn) el.validateBtn.addEventListener("click", validateCode);
    if (el.continueBtn)
      el.continueBtn.addEventListener("click", continueToConfirm);
    if (el.confirmBtn) el.confirmBtn.addEventListener("click", startActivation);
    if (el.retryBtn) el.retryBtn.addEventListener("click", startActivation);
    if (el.startOverBtn)
      el.startOverBtn.addEventListener("click", resetActivationFlow);

    const backCode = document.getElementById("activateBackToCodeBtn");
    const backSession = document.getElementById("activateBackToSessionBtn");
    if (backCode) {
      backCode.addEventListener("click", function () {
        clearAlert();
        setStep(1);
      });
    }
    if (backSession) {
      backSession.addEventListener("click", function () {
        clearAlert();
        setStep(2);
      });
    }

    if (el.codeInput) {
      el.codeInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          validateCode();
        }
      });
    }
  }

  function boot() {
    applyCopy();
    bindEvents();
    setStep(1);

    const initialCode = normalizeCode(queryValue("code"));
    if (initialCode) {
      el.codeInput.value = initialCode;
      validateCode();
    }

    if (supportUrl) {
      document.getElementById("activateSupportLink").href = supportUrl;
    }
    if (homeUrl) {
      document.getElementById("activateHomeLink").href = homeUrl;
    }

    const visibleSupportLinks = [
      setSupportLink("activateTelegramSupportLink", supportUrl),
      setSupportLink("activateZaloSupportLink", body.dataset.zaloUrl),
      setSupportLink("activateWhatsappSupportLink", body.dataset.whatsappUrl),
    ].filter(Boolean).length;
    if (el.supportLinksWrap)
      el.supportLinksWrap.hidden = visibleSupportLinks === 0;

    window.addEventListener("beforeunload", clearPolling);
  }

  boot();
})();
