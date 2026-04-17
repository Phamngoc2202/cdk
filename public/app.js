const TEXT = {
  vi: {
    common: {
      appName: "CDK Redeem",
      languageShort: "EN",
      clockLabel: "Giờ GMT+7",
      themeLight: "Giao diện sáng",
      themeDark: "Giao diện tối",
      close: "Đóng",
      loading: "Đang xử lý...",
      copy: "Sao chép",
      copied: "Đã sao chép vào clipboard.",
      backHome: "Về trang đổi CDK",
      navRedeem: "Đổi CDK",
      navQuery: "Tra cứu CDK",
      statusIdle: "Chờ thao tác",
      statusSuccess: "Đã xác minh",
      statusError: "Không hợp lệ",
      statusPending: "Đang xử lý",
      statusCreated: "Đã tạo task",
      taskId: "Task ID",
      openChatGPT: "Mở ChatGPT",
      openAuthSession: "Mở AuthSession",
      noData: "Chưa có dữ liệu.",
    },
    redeem: {
      title: "Đổi ChatGPT CDK",
      subtitle: "",
      guideTitle: "Hướng dẫn thao tác",
      guideBody: "",
      formTitle: "Xác minh và đổi CDK",
      taskPanelTitle: "Tra cứu task",
      footer: "",
      steps: [
        {
          kicker: "Bước 1",
          title: "Kiểm tra CDK",
          body: "Nhập mã CDK, bấm Kiểm tra CDK để xác minh mã chưa được sử dụng và đúng sản phẩm.",
        },
        {
          kicker: "Bước 2",
          title: "Lấy AuthSession",
          body: "Đăng nhập ChatGPT, mở trang AuthSession rồi copy toàn bộ JSON hoặc session string.",
        },
        {
          kicker: "Bước 3",
          title: "Xác minh tài khoản",
          body: "Dán AuthSession vào khung dữ liệu tài khoản, bấm Kiểm tra tài khoản để xác minh user.",
        },
        {
          kicker: "Bước 4",
          title: "Bắt đầu đổi",
          body: "Khi CDK và tài khoản đều hợp lệ, bấm Bắt đầu đổi và chờ task hoàn tất.",
        },
      ],
      form: {
        cdkLabel: "CDK",
        cdkPlaceholder: "XXXXXXXXXXXXX / XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        accountLabel: "Dữ liệu AuthSession / account",
        accountPlaceholder:
          "{\"user\":{\"id\":\"user_xxx\",\"email\":\"name@example.com\"}} hoặc session / access token mà bạn đang dùng",
        cdkHint: "Kiểm tra CDK trước để tránh redeem lỗi.",
        accountHint: "Dữ liệu này chỉ dùng để xác minh và redeem.",
        securityNote: "Khuyến nghị dán toàn bộ JSON AuthSession để hệ thống đọc user chính xác hơn.",
      },
      buttons: {
        validateCdk: "Kiểm tra CDK",
        validateAccount: "Kiểm tra tài khoản",
        redeem: "Bắt đầu đổi",
        queryTask: "Tra cứu",
      },
      sections: {
        cdkSummary: "Thông tin CDK",
        accountSummary: "Thông tin tài khoản",
        taskSummary: "Trạng thái task",
      },
      inline: {
        cdkLabel: "Gói CDK",
        accountLabel: "Email",
        warningLabel: "Cảnh báo",
        plusWarning: "Tài khoản đang có plus, nếu nâng cấp sẽ bị ghi đè.",
      },
      results: {
        cdkValid: "CDK hợp lệ.",
        accountValid: "Tài khoản hợp lệ.",
        redeemSuccess: "Đổi CDK thành công.",
      },
      errors: {
        cdkEmpty: "Vui lòng nhập CDK.",
        accountEmpty: "Vui lòng nhập dữ liệu tài khoản.",
        invalidCdk: "Không thể xác minh CDK.",
        invalidAccount: "Không thể xác minh tài khoản.",
        cdkUsed: "CDK này đã được sử dụng.",
        redeemFailed: "Tác vụ đổi CDK thất bại.",
        taskEmpty: "Vui lòng nhập Task ID.",
        network: "Lỗi mạng hoặc lỗi máy chủ.",
      },
      task: {
        idle: "Chưa có tác vụ nào.",
        created: "Tác vụ đã được tạo.",
        pending: "Tác vụ đang được xử lý.",
        success: "Tác vụ đã hoàn tất.",
        error: "Tác vụ thất bại.",
      },
    },
    query: {
      title: "Tra cứu CDK hàng loạt",
      subtitle: "",
      inputTitle: "Danh sách CDK",
      inputHint: "Mỗi dòng một CDK.",
      timezoneNote: "Tra cứu CDK theo giờ Việt Nam GMT+7",
      placeholder: "Nhập CDK, mỗi dòng một mã",
      buttons: {
        query: "Bắt đầu tra cứu",
        clear: "Xóa danh sách",
        copyAll: "Copy tất cả",
        copyUsed: "Copy đã dùng",
        copyUnused: "Copy chưa dùng",
      },
      stats: {
        total: "Tổng",
        used: "Đã dùng",
        unused: "Chưa dùng",
        invalid: "Không hợp lệ",
      },
      tabs: {
        all: "Tất cả",
        used: "Đã dùng",
        unused: "Chưa dùng",
        invalid: "Không hợp lệ",
      },
      status: {
        used: "Đã dùng",
        unused: "Chưa dùng",
        invalid: "Không hợp lệ",
      },
      empty: "Chưa có kết quả. Danh sách sau khi query sẽ hiện ở đây.",
      errors: {
        empty: "Vui lòng nhập ít nhất một CDK.",
        failed: "Không thể tra cứu danh sách CDK.",
      },
      columns: {
        code: "CDK",
        detail: "Chi tiết",
      },
    },
    notFound: {
      title: "Không tìm thấy trang",
      body: "Route này không có giao diện tương ứng trong frontend mới.",
    },
  },
  en: {
    common: {
      appName: "CDK Redeem",
      languageShort: "VI",
      clockLabel: "GMT+7 time",
      themeLight: "Light mode",
      themeDark: "Dark mode",
      close: "Close",
      loading: "Processing...",
      copy: "Copy",
      copied: "Copied to clipboard.",
      backHome: "Back to redeem",
      navRedeem: "Redeem",
      navQuery: "Batch Query",
      statusIdle: "Waiting",
      statusSuccess: "Verified",
      statusError: "Invalid",
      statusPending: "Pending",
      statusCreated: "Created",
      taskId: "Task ID",
      openChatGPT: "Open ChatGPT",
      openAuthSession: "Open AuthSession",
      noData: "No data yet.",
    },
    redeem: {
      title: "Redeem ChatGPT CDK",
      subtitle: "",
      guideTitle: "How it works",
      guideBody: "",
      formTitle: "Validate and redeem",
      taskPanelTitle: "Task lookup",
      footer: "",
      steps: [
        {
          kicker: "Step 1",
          title: "Validate the CDK",
          body: "Enter your CDK and run validation first to make sure the code is unused and matches the product.",
        },
        {
          kicker: "Step 2",
          title: "Get AuthSession",
          body: "Sign in to ChatGPT, open the AuthSession page, then copy the full JSON or session string.",
        },
        {
          kicker: "Step 3",
          title: "Validate the account",
          body: "Paste the AuthSession payload into the account box and validate the account before redeeming.",
        },
        {
          kicker: "Step 4",
          title: "Start redeem",
          body: "Once both checks pass, start the redeem flow and wait for the task to complete.",
        },
      ],
      form: {
        cdkLabel: "CDK",
        cdkPlaceholder: "XXXXXXXXXXXXX / XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        accountLabel: "AuthSession / account data",
        accountPlaceholder:
          "{\"user\":{\"id\":\"user_xxx\",\"email\":\"name@example.com\"}} or the session / access token you use",
        cdkHint: "Validate the CDK before redeeming to avoid unnecessary failures.",
        accountHint: "This data is used for validation and redeem only.",
        securityNote: "Pasting the full AuthSession JSON is recommended for more reliable user detection.",
      },
      buttons: {
        validateCdk: "Validate CDK",
        validateAccount: "Validate account",
        redeem: "Start redeem",
        queryTask: "Check task",
      },
      sections: {
        cdkSummary: "CDK details",
        accountSummary: "Account details",
        taskSummary: "Task status",
      },
      inline: {
        cdkLabel: "CDK plan",
        accountLabel: "Email",
        warningLabel: "Warning",
        plusWarning: "This account already has Plus. Upgrading will overwrite the current plan.",
      },
      results: {
        cdkValid: "CDK is valid.",
        accountValid: "Account is valid.",
        redeemSuccess: "Redeem completed successfully.",
      },
      errors: {
        cdkEmpty: "Please enter a CDK.",
        accountEmpty: "Please enter account data.",
        invalidCdk: "The CDK could not be validated.",
        invalidAccount: "The account could not be validated.",
        cdkUsed: "This CDK has already been used.",
        redeemFailed: "The redeem task failed.",
        taskEmpty: "Please enter a task ID.",
        network: "Network or server error.",
      },
      task: {
        idle: "No redeem task yet.",
        created: "Task created.",
        pending: "Task is being processed.",
        success: "Task completed.",
        error: "Task failed.",
      },
    },
    query: {
      title: "Batch CDK Query",
      subtitle: "",
      inputTitle: "CDK list",
      inputHint: "Use one CDK per line.",
      timezoneNote: "CDK query uses Vietnam time GMT+7",
      placeholder: "Enter CDKs, one code per line",
      buttons: {
        query: "Start query",
        clear: "Clear list",
        copyAll: "Copy all",
        copyUsed: "Copy used",
        copyUnused: "Copy unused",
      },
      stats: {
        total: "Total",
        used: "Used",
        unused: "Unused",
        invalid: "Invalid",
      },
      tabs: {
        all: "All",
        used: "Used",
        unused: "Unused",
        invalid: "Invalid",
      },
      status: {
        used: "Used",
        unused: "Unused",
        invalid: "Invalid",
      },
      empty: "No results yet. The list will appear here after you run the query.",
      errors: {
        empty: "Please enter at least one CDK.",
        failed: "The CDK list could not be queried.",
      },
      columns: {
        code: "CDK",
        detail: "Details",
      },
    },
    notFound: {
      title: "Page not found",
      body: "This route does not have a matching screen in the rebuilt frontend.",
    },
  },
};

const STORAGE_KEYS = {
  language: "receipt_fe_language",
  theme: "receipt_fe_theme",
};

const state = {
  lang: loadLanguage(),
  theme: loadTheme(),
  notice: null,
  redeem: {
    cdk: "",
    account: "",
    cdkStatus: "",
    accountStatus: "",
    cdkData: null,
    accountData: null,
    cdkValidatedValue: "",
    accountValidatedValue: "",
    taskId: "",
    taskStatus: "",
    taskMessage: "",
    taskProgress: 0,
    loadingCdk: false,
    loadingAccount: false,
    redeeming: false,
    lookupTaskId: "",
    lookupLoading: false,
  },
  query: {
    raw: "",
    loading: false,
    results: [],
    activeTab: "all",
  },
};

const app = document.getElementById("app");
let clockTimerStarted = false;
const TASK_POLL_INTERVAL_FAST_MS = 5000;
const TASK_POLL_INTERVAL_SLOW_MS = 10000;

function loadLanguage() {
  const stored = localStorage.getItem(STORAGE_KEYS.language);
  if (stored === "vi" || stored === "en") {
    return stored;
  }
  return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

function loadTheme() {
  const stored = localStorage.getItem(STORAGE_KEYS.theme);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function t() {
  return TEXT[state.lang];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function formatGmt7Clock() {
  return new Intl.DateTimeFormat(state.lang === "vi" ? "vi-VN" : "en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function updateClockDisplays() {
  const value = formatGmt7Clock();
  document.querySelectorAll('[data-clock="gmt7"]').forEach((node) => {
    node.textContent = value;
  });
}

function startClockTicker() {
  if (clockTimerStarted) {
    return;
  }
  clockTimerStarted = true;
  updateClockDisplays();
  window.setInterval(updateClockDisplays, 1000);
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE_KEYS.language, lang);
  render();
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  render();
}

function setNotice(type, title, message) {
  state.notice = { type, title, message };
  render();
}

function clearNotice() {
  state.notice = null;
  render();
}

function getRoute() {
  const pathname = window.location.pathname;
  if (pathname === "/" || pathname === "/redeem/chatgpt") {
    return { name: "redeem", product: "chatgpt" };
  }
  if (pathname.startsWith("/redeem/")) {
    return { name: "redeem", product: pathname.split("/")[2] || "" };
  }
  if (pathname === "/public/query-cdk") {
    return { name: "query" };
  }
  return { name: "not-found" };
}

function apiHeaders() {
  return { "Content-Type": "application/json" };
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let json = null;

  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    throw new Error(text || `HTTP ${response.status}`);
  }

  return json;
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `HTTP ${response.status}`);
  }
  return text;
}

function summarizeObject(data) {
  if (!data) {
    return "";
  }
  if (typeof data === "string") {
    return data;
  }
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

function normalizeTaskStatus(data) {
  if (!data || typeof data !== "object") {
    return { state: "error", message: "", progress: 0 };
  }

  const raw = String(data.status || "").trim().toLowerCase();
  const progress = Number.isFinite(Number(data.progress)) ? Math.max(0, Math.min(100, Number(data.progress))) : 0;
  const message = String(data.error || data.message || "").trim();

  if (raw === "finish") {
    return message ? { state: "error", message, progress } : { state: "success", message: "", progress: 100 };
  }
  if (raw === "cancel") {
    return { state: "error", message: message || "Cancelled", progress };
  }
  if (raw === "created" || raw === "prepared" || raw === "pending") {
    return { state: raw === "created" ? "created" : "pending", message, progress };
  }
  if (typeof data.pending === "boolean") {
    if (data.pending) {
      return { state: "pending", message, progress };
    }
    return data.success
      ? { state: "success", message, progress: progress || 100 }
      : { state: "error", message, progress };
  }
  return { state: "pending", message, progress };
}

function statusLabel(status) {
  const text = t().common;
  if (status === "success") {
    return text.statusSuccess;
  }
  if (status === "error") {
    return text.statusError;
  }
  if (status === "pending") {
    return text.statusPending;
  }
  if (status === "created") {
    return text.statusCreated;
  }
  return text.statusIdle;
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function formatTaskErrorMessage(message) {
  const raw = String(message || "").trim();
  if (!raw) {
    return raw;
  }

  const lower = raw.toLowerCase();
  if (lower.includes("api.openai.com/v1/receipts") && lower.includes("service unavailable")) {
    return state.lang === "vi"
      ? "Dich vu OpenAI tam thoi khong kha dung. Hay thu lai sau."
      : "The OpenAI service is temporarily unavailable. Please try again later.";
  }

  return raw;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function shiftDisplayedTime(value, hoursDelta) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  const normalized = raw.replace("T", " ");
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);

  if (match) {
    const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));

    if (!Number.isNaN(date.getTime())) {
      date.setHours(date.getHours() + hoursDelta);
      return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(
        date.getMinutes()
      )}:${pad2(date.getSeconds())}`;
    }
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    parsed.setHours(parsed.getHours() + hoursDelta);
    return `${parsed.getFullYear()}-${pad2(parsed.getMonth() + 1)}-${pad2(parsed.getDate())} ${pad2(parsed.getHours())}:${pad2(
      parsed.getMinutes()
    )}:${pad2(parsed.getSeconds())}`;
  }

  return raw;
}

async function copyText(content, title) {
  if (!content) {
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(content);
  } else {
    const area = document.createElement("textarea");
    area.value = content;
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.focus();
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  setNotice("success", title, t().common.copied);
}

async function validateCdk(silent = false) {
  const text = t();
  const code = state.redeem.cdk.trim();

  if (!code) {
    if (!silent) {
      setNotice("error", text.redeem.formTitle, text.redeem.errors.cdkEmpty);
    }
    return false;
  }

  state.redeem.loadingCdk = true;
  state.redeem.cdkStatus = "";
  render();

  try {
    const data = await fetchJson("/api/channel1/check-cdk", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ code }),
    });

    if (data && data.used) {
      state.redeem.cdkData = data;
      state.redeem.cdkStatus = "error";
      state.redeem.cdkValidatedValue = "";
      if (!silent) {
        setNotice("error", text.redeem.sections.cdkSummary, text.redeem.errors.cdkUsed);
      }
      return false;
    }

    state.redeem.cdkData = data;
    state.redeem.cdkStatus = "success";
    state.redeem.cdkValidatedValue = code.toUpperCase();
    if (!silent) {
      setNotice("success", text.redeem.sections.cdkSummary, text.redeem.results.cdkValid);
    }
    return true;
  } catch (error) {
    state.redeem.cdkData = null;
    state.redeem.cdkStatus = "error";
    state.redeem.cdkValidatedValue = "";
    if (!silent) {
      setNotice("error", text.redeem.sections.cdkSummary, error.message || text.redeem.errors.invalidCdk);
    }
    return false;
  } finally {
    state.redeem.loadingCdk = false;
    render();
  }
}

function accountLooksValid(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if ("verified" in data) {
    return Boolean(data.verified);
  }
  if ("success" in data) {
    return Boolean(data.success);
  }
  return true;
}

async function validateAccount(silent = false) {
  const text = t();
  const account = state.redeem.account.trim();
  const cdk = state.redeem.cdk.trim();

  if (!account) {
    if (!silent) {
      setNotice("error", text.redeem.formTitle, text.redeem.errors.accountEmpty);
    }
    return false;
  }

  if (!cdk) {
    if (!silent) {
      setNotice("error", text.redeem.formTitle, text.redeem.errors.cdkEmpty);
    }
    return false;
  }

  if (state.redeem.cdkValidatedValue !== cdk.toUpperCase()) {
    const cdkOk = await validateCdk(true);
    if (!cdkOk) {
      if (!silent) {
        setNotice("error", text.redeem.sections.cdkSummary, text.redeem.errors.invalidCdk);
      }
      return false;
    }
  }

  state.redeem.loadingAccount = true;
  state.redeem.accountStatus = "";
  render();

  try {
    const data = await fetchJson("/api/channel1/check-auth", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ user: account, cdk }),
    });

    if (!accountLooksValid(data)) {
      state.redeem.accountData = data;
      state.redeem.accountStatus = "error";
      state.redeem.accountValidatedValue = "";
      if (!silent) {
        setNotice("error", text.redeem.sections.accountSummary, text.redeem.errors.invalidAccount);
      }
      return false;
    }

    state.redeem.accountData = data;
    state.redeem.accountStatus = "success";
    state.redeem.accountValidatedValue = account;
    if (!silent) {
      setNotice("success", text.redeem.sections.accountSummary, text.redeem.results.accountValid);
    }
    return true;
  } catch (error) {
    state.redeem.accountData = null;
    state.redeem.accountStatus = "error";
    state.redeem.accountValidatedValue = "";
    if (!silent) {
      setNotice("error", text.redeem.sections.accountSummary, error.message || text.redeem.errors.invalidAccount);
    }
    return false;
  } finally {
    state.redeem.loadingAccount = false;
    render();
  }
}

async function lookupTask(taskId, silent = false) {
  const text = t();
  const id = String(taskId || state.redeem.lookupTaskId || state.redeem.taskId).trim();

  if (!id) {
    if (!silent) {
      setNotice("error", text.redeem.taskPanelTitle, text.redeem.errors.taskEmpty);
    }
    return null;
  }

  state.redeem.lookupLoading = true;
  render();

  try {
    const data = await fetchJson(`/api/channel1/task/${encodeURIComponent(id)}`);
    const normalized = normalizeTaskStatus(data);
    const displayMessage = formatTaskErrorMessage(normalized.message);

    state.redeem.taskId = id;
    state.redeem.lookupTaskId = id;
    state.redeem.taskStatus = normalized.state;
    state.redeem.taskMessage = displayMessage || "";
    state.redeem.taskProgress = normalized.progress;

    if (!silent) {
      const taskText =
        normalized.state === "success"
          ? text.redeem.task.success
          : normalized.state === "error"
          ? displayMessage || text.redeem.task.error
          : normalized.state === "created"
          ? text.redeem.task.created
          : text.redeem.task.pending;
      setNotice(
        normalized.state === "error" ? "error" : "success",
        text.redeem.taskPanelTitle,
        `${text.common.taskId}: ${id}\n${taskText}`
      );
    }

    return normalized;
  } catch (error) {
    state.redeem.taskId = id;
    state.redeem.taskStatus = "error";
    state.redeem.taskMessage = formatTaskErrorMessage(error.message || text.redeem.errors.network);
    state.redeem.taskProgress = 0;
    if (!silent) {
      setNotice("error", text.redeem.taskPanelTitle, state.redeem.taskMessage);
    }
    return null;
  } finally {
    state.redeem.lookupLoading = false;
    render();
  }
}

async function redeemCdk() {
  const text = t();
  const cdk = state.redeem.cdk.trim();
  const account = state.redeem.account.trim();

  const cdkOk = state.redeem.cdkValidatedValue === cdk.toUpperCase() ? true : await validateCdk(true);
  if (!cdkOk) {
    setNotice("error", text.redeem.sections.cdkSummary, text.redeem.errors.invalidCdk);
    return;
  }

  const accountOk = state.redeem.accountValidatedValue === account ? true : await validateAccount(true);
  if (!accountOk) {
    setNotice("error", text.redeem.sections.accountSummary, text.redeem.errors.invalidAccount);
    return;
  }

  state.redeem.redeeming = true;
  state.redeem.taskId = "";
  state.redeem.taskStatus = "created";
  state.redeem.taskMessage = "";
  state.redeem.taskProgress = 0;
  render();

  try {
    const taskId = (
      await fetchText("/api/channel1/redeem", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({ cdk, user: account }),
      })
    ).trim();

    if (!taskId) {
      throw new Error(text.redeem.errors.redeemFailed);
    }

    state.redeem.taskId = taskId;
    state.redeem.lookupTaskId = taskId;
    state.redeem.taskStatus = "created";
    state.redeem.taskMessage = "";
    render();

    let pollCount = 0;
    for (;;) {
      const waitMs = pollCount < 3 ? TASK_POLL_INTERVAL_FAST_MS : TASK_POLL_INTERVAL_SLOW_MS;
      await delay(waitMs);
      pollCount += 1;
      const task = await lookupTask(taskId, true);
      if (!task) {
        throw new Error(text.redeem.errors.redeemFailed);
      }
      if (task.state === "pending" || task.state === "created") {
        continue;
      }
      if (task.state === "success") {
        setNotice("success", text.redeem.sections.taskSummary, task.message || text.redeem.results.redeemSuccess);
      } else {
        setNotice("error", text.redeem.sections.taskSummary, task.message || text.redeem.errors.redeemFailed);
      }
      break;
    }
  } catch (error) {
    state.redeem.taskStatus = "error";
    state.redeem.taskMessage = error.message || text.redeem.errors.network;
    setNotice("error", text.redeem.sections.taskSummary, state.redeem.taskMessage);
  } finally {
    state.redeem.redeeming = false;
    render();
  }
}

async function runBatchQuery() {
  const text = t();
  const codes = state.query.raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!codes.length) {
    setNotice("error", text.query.title, text.query.errors.empty);
    return;
  }

  state.query.loading = true;
  render();

  try {
    const data = await fetchJson("/api/channel1/batch-query", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ codes }),
    });

    state.query.results = (Array.isArray(data) ? data : []).map((item) => {
      const status = item && typeof item === "object" ? (item.used ? "used" : item.code ? "unused" : "invalid") : "invalid";
      const displayRedeemTime = shiftDisplayedTime(item?.redeem_time, -1);
      return {
        code: String(item?.code || ""),
        status,
        detail: [item?.app_name, item?.product_name, item?.user, displayRedeemTime].filter(Boolean).join(" | "),
      };
    });
    state.query.activeTab = "all";
  } catch (error) {
    state.query.results = codes.map((code) => ({
      code,
      status: "invalid",
      detail: error.message || text.query.errors.failed,
    }));
    setNotice("error", text.query.title, error.message || text.query.errors.failed);
  } finally {
    state.query.loading = false;
    render();
  }
}

function getVisibleQueryResults() {
  if (state.query.activeTab === "all") {
    return state.query.results;
  }
  return state.query.results.filter((item) => item.status === state.query.activeTab);
}

function renderModal() {
  if (!state.notice) {
    return "";
  }

  return `
    <div class="modal-backdrop" data-action="close-notice">
      <section class="modal-card modal-card--${escapeAttr(state.notice.type)}" role="dialog" aria-modal="true">
        <div class="modal-icon">${state.notice.type === "error" ? "!" : "\u2713"}</div>
        <h3>${escapeHtml(state.notice.title)}</h3>
        <p>${escapeHtml(state.notice.message)}</p>
        <button type="button" class="primary-button" data-action="close-notice">${escapeHtml(t().common.close)}</button>
      </section>
    </div>
  `;
}

function renderHeader(route) {
  const text = t();
  const summary = route.name === "query" ? text.query.subtitle : text.redeem.subtitle;

  return `
    <header class="top-shell glass-card">
      <div class="brand">
        <p class="brand__eyebrow">${escapeHtml(text.common.appName)}</p>
        <h1>${escapeHtml(route.name === "query" ? text.query.title : text.redeem.title)}</h1>
        ${summary ? `<p class="brand__summary">${escapeHtml(summary)}</p>` : ""}
      </div>
      <div class="top-actions">
        <div class="toolbar-card">
          <button
            type="button"
            class="icon-button icon-button--toggle"
            data-action="toggle-language"
            aria-label="${escapeAttr(text.common.languageShort)}"
            title="${escapeAttr(text.common.languageShort)}"
          >
            <span class="icon-button__badge">${escapeHtml(text.common.languageShort)}</span>
          </button>
          <button
            type="button"
            class="icon-button icon-button--toggle"
            data-action="toggle-theme"
            aria-label="${escapeAttr(state.theme === "dark" ? text.common.themeLight : text.common.themeDark)}"
            title="${escapeAttr(state.theme === "dark" ? text.common.themeLight : text.common.themeDark)}"
          >
            <span class="icon-button__symbol">${state.theme === "dark" ? "☀" : "☾"}</span>
          </button>
        </div>
        <nav class="nav-pills nav-pills--primary">
          <a href="/redeem/chatgpt" class="nav-pill ${route.name === "redeem" ? "is-active" : ""}">${escapeHtml(text.common.navRedeem)}</a>
          <a href="/public/query-cdk" class="nav-pill ${route.name === "query" ? "is-active" : ""}">${escapeHtml(text.common.navQuery)}</a>
        </nav>
      </div>
    </header>
  `;
}

function renderGuideSteps() {
  const text = t();
  return `
    <article class="glass-card panel guide-panel">
      <div class="panel-header">
        <span class="panel-tag">${escapeHtml(text.redeem.guideTitle)}</span>
        <h2>${escapeHtml(text.redeem.guideTitle)}</h2>
        ${text.redeem.guideBody ? `<p>${escapeHtml(text.redeem.guideBody)}</p>` : ""}
      </div>
      <div class="guide-actions">
        <a class="secondary-button link-button" href="https://chatgpt.com/" target="_blank" rel="noreferrer">${escapeHtml(
          text.common.openChatGPT
        )}</a>
        <a class="secondary-button link-button" href="https://chatgpt.com/api/auth/session" target="_blank" rel="noreferrer">${escapeHtml(
          text.common.openAuthSession
        )}</a>
      </div>
      <div class="timeline">
        ${text.redeem.steps
          .map(
            (step) => `
              <section class="timeline-item">
                <span class="timeline-item__kicker">${escapeHtml(step.kicker)}</span>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.body)}</p>
              </section>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderStatusLine(status, loading) {
  if (loading) {
    return `<div class="status-line"><span class="status-chip status-chip--pending">${escapeHtml(t().common.loading)}</span></div>`;
  }

  if (!status) {
    return `<div class="status-line"><span class="muted">${escapeHtml(t().common.statusIdle)}</span></div>`;
  }

  return `
    <div class="status-line">
      <span class="status-chip status-chip--${escapeAttr(status)}">${escapeHtml(statusLabel(status))}</span>
    </div>
  `;
}

function getCdkSummary(data) {
  if (!data || typeof data !== "object") {
    return "";
  }
  return String(data.app_product_name || data.product_name || data.app_name || "").trim();
}

function getAccountSummary(data) {
  if (!data || typeof data !== "object") {
    return "";
  }
  const extraEmail = data.extra && typeof data.extra === "object" ? data.extra.email : "";
  return String(data.user || extraEmail || "").trim();
}

function renderInlineInfo(label, value, tone = "neutral") {
  if (!value) {
    return "";
  }

  return `
    <div class="inline-info inline-info--${escapeAttr(tone)}">
      <span class="inline-info__label">${escapeHtml(label)}</span>
      <strong class="inline-info__value">${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderRedeemPage(route) {
  const text = t();

  if (route.product !== "chatgpt") {
    return `
      <main class="page-shell">
        <section class="glass-card panel empty-panel">
          <h2>${escapeHtml(text.notFound.title)}</h2>
          <p>${escapeHtml(text.notFound.body)}</p>
          <a class="primary-button link-button" href="/redeem/chatgpt">${escapeHtml(text.common.backHome)}</a>
        </section>
      </main>
    `;
  }

  const taskCopy =
    state.redeem.taskStatus === "success"
      ? text.redeem.task.success
      : state.redeem.taskStatus === "error"
      ? state.redeem.taskMessage || text.redeem.task.error
      : state.redeem.taskStatus === "created"
      ? text.redeem.task.created
      : state.redeem.taskStatus === "pending"
      ? text.redeem.task.pending
      : text.redeem.task.idle;

  return `
    <main class="page-shell">
      <section class="content-grid">
        ${renderGuideSteps()}
        <div class="content-stack">
          <article class="glass-card panel">
            <div class="panel-header">
              <span class="panel-tag">${escapeHtml(text.redeem.formTitle)}</span>
              <h2>${escapeHtml(text.redeem.formTitle)}</h2>
              <p>${escapeHtml(text.redeem.form.securityNote)}</p>
            </div>
            <form class="redeem-form" data-form="redeem">
              <div class="step-field">
                <div class="step-title">
                  <span class="step-dot">1</span>
                  <label for="cdk-input">${escapeHtml(text.redeem.form.cdkLabel)}</label>
                </div>
                <div class="field-row">
                  <input
                    id="cdk-input"
                    name="cdk"
                    type="text"
                    class="input-field"
                    value="${escapeAttr(state.redeem.cdk)}"
                    placeholder="${escapeAttr(text.redeem.form.cdkPlaceholder)}"
                  />
                  <button type="button" class="secondary-button" data-action="validate-cdk" ${
                    state.redeem.loadingCdk || state.redeem.redeeming ? "disabled" : ""
                  }>
                    ${state.redeem.loadingCdk ? escapeHtml(text.common.loading) : escapeHtml(text.redeem.buttons.validateCdk)}
                  </button>
                </div>
                <p class="field-hint">${escapeHtml(text.redeem.form.cdkHint)}</p>
                ${renderStatusLine(state.redeem.cdkStatus, state.redeem.loadingCdk)}
                ${renderInlineInfo(text.redeem.inline.cdkLabel, getCdkSummary(state.redeem.cdkData), "success")}
              </div>

              <div class="step-field">
                <div class="step-title">
                  <span class="step-dot">2</span>
                  <label for="account-input">${escapeHtml(text.redeem.form.accountLabel)}</label>
                </div>
                <div class="field-row">
                  <input
                    id="account-input"
                    name="account"
                    type="text"
                    class="input-field"
                    value="${escapeAttr(state.redeem.account)}"
                    placeholder="${escapeAttr(text.redeem.form.accountPlaceholder)}"
                  />
                  <button type="button" class="secondary-button" data-action="validate-account" ${
                    state.redeem.loadingAccount || state.redeem.redeeming ? "disabled" : ""
                  }>
                    ${
                      state.redeem.loadingAccount
                        ? escapeHtml(text.common.loading)
                        : escapeHtml(text.redeem.buttons.validateAccount)
                    }
                  </button>
                </div>
                <p class="field-hint">${escapeHtml(text.redeem.form.accountHint)}</p>
                ${renderStatusLine(state.redeem.accountStatus, state.redeem.loadingAccount)}
                ${renderInlineInfo(text.redeem.inline.accountLabel, getAccountSummary(state.redeem.accountData), "success")}
                ${
                  state.redeem.accountData && state.redeem.accountData.has_sub
                    ? renderInlineInfo(text.redeem.inline.warningLabel, text.redeem.inline.plusWarning, "warning")
                    : ""
                }
              </div>

              <div class="primary-bar">
                <button type="submit" class="primary-button primary-button--wide" ${
                  state.redeem.redeeming ? "disabled" : ""
                }>
                  ${state.redeem.redeeming ? escapeHtml(text.common.loading) : escapeHtml(text.redeem.buttons.redeem)}
                </button>
              </div>
            </form>

            <div class="data-grid">
              <section class="data-card data-card--task">
                <div class="data-card__head">
                  <h3>${escapeHtml(text.redeem.sections.taskSummary)}</h3>
                  <span class="mini-badge mini-badge--${escapeAttr(state.redeem.taskStatus || "idle")}">${escapeHtml(
                    statusLabel(state.redeem.taskStatus)
                  )}</span>
                </div>
                <p><strong>${escapeHtml(text.common.taskId)}:</strong> ${escapeHtml(state.redeem.taskId || "-")}</p>
                <p>${escapeHtml(taskCopy)}</p>
                <div class="progress-track">
                  <span style="width:${state.redeem.taskStatus ? Math.max(8, state.redeem.taskProgress || 0) : 0}%"></span>
                </div>
                ${state.redeem.taskMessage ? `<pre>${escapeHtml(state.redeem.taskMessage)}</pre>` : ""}
              </section>
            </div>
          </article>

          <article class="glass-card panel task-panel">
            <div class="panel-header">
              <span class="panel-tag">${escapeHtml(text.redeem.taskPanelTitle)}</span>
              <h2>${escapeHtml(text.redeem.taskPanelTitle)}</h2>
              <p>${escapeHtml(text.common.taskId)}</p>
            </div>
            <div class="field-row">
              <input
                name="lookup-task"
                type="text"
                class="input-field"
                value="${escapeAttr(state.redeem.lookupTaskId)}"
                placeholder="${escapeAttr(text.common.taskId)}"
              />
              <button type="button" class="secondary-button" data-action="lookup-task" ${
                state.redeem.lookupLoading ? "disabled" : ""
              }>
                ${state.redeem.lookupLoading ? escapeHtml(text.common.loading) : escapeHtml(text.redeem.buttons.queryTask)}
              </button>
            </div>
          </article>
        </div>
      </section>

      ${text.redeem.footer ? `<footer class="glass-card footer-card"><p>${escapeHtml(text.redeem.footer)}</p></footer>` : ""}
    </main>
  `;
}

function renderQueryPage() {
  const text = t();
  const results = getVisibleQueryResults();
  const stats = {
    total: state.query.results.length,
    used: state.query.results.filter((item) => item.status === "used").length,
    unused: state.query.results.filter((item) => item.status === "unused").length,
    invalid: state.query.results.filter((item) => item.status === "invalid").length,
  };

  return `
    <main class="page-shell">
      <section class="content-stack">
        <article class="glass-card panel">
          <div class="panel-header">
            <div class="panel-header__top">
              <div class="panel-header__copy">
                <span class="panel-tag">${escapeHtml(text.query.inputTitle)}</span>
                <h2>${escapeHtml(text.query.inputTitle)}</h2>
                <p>${escapeHtml(text.query.inputHint)}</p>
                <div class="timezone-callout">${escapeHtml(text.query.timezoneNote)}</div>
              </div>
              <div class="clock-card clock-card--query">
                <span class="clock-card__label">${escapeHtml(text.common.clockLabel)}</span>
                <strong class="clock-card__time" data-clock="gmt7">${escapeHtml(formatGmt7Clock())}</strong>
              </div>
            </div>
          </div>
          <form data-form="query" class="query-form">
            <textarea
              name="query-raw"
              class="input-field input-field--textarea input-field--tall"
              rows="10"
              placeholder="${escapeAttr(text.query.placeholder)}"
            >${escapeHtml(state.query.raw)}</textarea>
            <div class="button-strip">
              <button type="submit" class="primary-button" ${state.query.loading ? "disabled" : ""}>
                ${state.query.loading ? escapeHtml(text.common.loading) : escapeHtml(text.query.buttons.query)}
              </button>
              <button type="button" class="secondary-button" data-action="clear-query" ${
                state.query.loading ? "disabled" : ""
              }>${escapeHtml(text.query.buttons.clear)}</button>
              <button type="button" class="secondary-button" data-action="copy-all" ${
                !state.query.results.length ? "disabled" : ""
              }>${escapeHtml(text.query.buttons.copyAll)}</button>
              <button type="button" class="secondary-button" data-action="copy-used" ${
                !stats.used ? "disabled" : ""
              }>${escapeHtml(text.query.buttons.copyUsed)}</button>
              <button type="button" class="secondary-button" data-action="copy-unused" ${
                !stats.unused ? "disabled" : ""
              }>${escapeHtml(text.query.buttons.copyUnused)}</button>
            </div>
          </form>
        </article>

        <section class="stats-grid">
          ${Object.entries(text.query.stats)
            .map(
              ([key, label]) => `
                <article class="glass-card stat-card">
                  <strong>${stats[key]}</strong>
                  <span>${escapeHtml(label)}</span>
                </article>
              `
            )
            .join("")}
        </section>

        <article class="glass-card panel">
          <div class="tabs">
            ${Object.entries(text.query.tabs)
              .map(
                ([key, label]) => `
                  <button type="button" class="tab-button ${state.query.activeTab === key ? "is-active" : ""}" data-action="switch-tab" data-tab="${escapeAttr(
                    key
                  )}">${escapeHtml(label)}</button>
                `
              )
              .join("")}
          </div>
          ${
            results.length
              ? `
                <div class="result-list">
                  ${results
                    .map(
                      (item) => `
                        <div class="result-row">
                          <div class="result-row__code">
                            <code>${escapeHtml(item.code)}</code>
                          </div>
                          <div class="result-row__meta">${escapeHtml(item.detail || "-")}</div>
                          <div class="result-row__actions">
                            <span class="status-chip status-chip--${escapeAttr(item.status === "used" ? "success" : item.status === "unused" ? "pending" : "error")}">
                              ${escapeHtml(text.query.status[item.status])}
                            </span>
                            <button type="button" class="copy-link" data-action="copy-code" data-code="${escapeAttr(item.code)}">${escapeHtml(
                              text.common.copy
                            )}</button>
                          </div>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
              : `<p class="empty-copy">${escapeHtml(text.query.empty)}</p>`
          }
        </article>
      </section>
    </main>
  `;
}

function renderNotFoundPage() {
  const text = t();
  return `
    <main class="page-shell">
      <section class="glass-card panel empty-panel">
        <h2>${escapeHtml(text.notFound.title)}</h2>
        <p>${escapeHtml(text.notFound.body)}</p>
        <a href="/redeem/chatgpt" class="primary-button link-button">${escapeHtml(text.common.backHome)}</a>
      </section>
    </main>
  `;
}

function renderPage(route) {
  if (route.name === "redeem") {
    return renderRedeemPage(route);
  }
  if (route.name === "query") {
    return renderQueryPage();
  }
  return renderNotFoundPage();
}

function render() {
  const route = getRoute();
  document.documentElement.lang = state.lang;
  document.body.dataset.theme = state.theme;
  document.title = route.name === "query" ? t().query.title : t().redeem.title;

  app.innerHTML = `
    <div class="app-shell">
      ${renderHeader(route)}
      ${renderPage(route)}
      ${renderModal()}
    </div>
  `;
  updateClockDisplays();
}

app.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return;
  }

  if (target.name === "cdk") {
    state.redeem.cdk = target.value;
    if (state.redeem.cdkValidatedValue && state.redeem.cdkValidatedValue !== target.value.trim().toUpperCase()) {
      state.redeem.cdkValidatedValue = "";
      state.redeem.cdkStatus = "";
      state.redeem.cdkData = null;
      state.redeem.accountValidatedValue = "";
      state.redeem.accountStatus = "";
      state.redeem.accountData = null;
    }
    return;
  }

  if (target.name === "account") {
    state.redeem.account = target.value;
    if (state.redeem.accountValidatedValue && state.redeem.accountValidatedValue !== target.value.trim()) {
      state.redeem.accountValidatedValue = "";
      state.redeem.accountStatus = "";
      state.redeem.accountData = null;
    }
    return;
  }

  if (target.name === "lookup-task") {
    state.redeem.lookupTaskId = target.value;
    return;
  }

  if (target.name === "query-raw") {
    state.query.raw = target.value;
  }
});

app.addEventListener("click", async (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.action === "close-notice" && target.classList.contains("modal-backdrop")) {
    clearNotice();
    return;
  }

  const button = target instanceof Element ? target.closest("[data-action]") : null;
  if (!button) {
    return;
  }

  const action = button.getAttribute("data-action");

  if (action === "toggle-language") {
    setLanguage(state.lang === "vi" ? "en" : "vi");
    return;
  }

  if (action === "toggle-theme") {
    toggleTheme();
    return;
  }

  if (action === "close-notice") {
    clearNotice();
    return;
  }

  if (action === "validate-cdk") {
    await validateCdk();
    return;
  }

  if (action === "validate-account") {
    await validateAccount();
    return;
  }

  if (action === "lookup-task") {
    await lookupTask();
    return;
  }

  if (action === "clear-query") {
    state.query.raw = "";
    state.query.results = [];
    state.query.activeTab = "all";
    render();
    return;
  }

  if (action === "switch-tab") {
    state.query.activeTab = button.getAttribute("data-tab") || "all";
    render();
    return;
  }

  if (action === "copy-code") {
    await copyText(button.getAttribute("data-code") || "", t().query.title);
    return;
  }

  if (action === "copy-all") {
    await copyText(
      state.query.results.map((item) => item.code).filter(Boolean).join("\n"),
      t().query.title
    );
    return;
  }

  if (action === "copy-used") {
    await copyText(
      state.query.results
        .filter((item) => item.status === "used")
        .map((item) => item.code)
        .join("\n"),
      t().query.title
    );
    return;
  }

  if (action === "copy-unused") {
    await copyText(
      state.query.results
        .filter((item) => item.status === "unused")
        .map((item) => item.code)
        .join("\n"),
      t().query.title
    );
  }
});

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const type = form.getAttribute("data-form");
  if (type === "redeem") {
    await redeemCdk();
    return;
  }
  if (type === "query") {
    await runBatchQuery();
  }
});

startClockTicker();
render();
