const PRODUCT_ID = "chatgpt";
const POLL_INTERVAL_MS = 3000;
const CHANNEL2_POLL_INTERVAL_MS = 1000;
const CHANNEL2_DIRECT_BASE = "https://activatecdk.me/shop/api/activate/chatgpt";
const CHANNEL2_ENDPOINTS = {
  checkCdk: (code) => `/keys/${encodeURIComponent(code)}`,
  activateSession: "/keys/activate-session",
  activation: (code) => `/keys/${encodeURIComponent(code)}/activation`,
  bulkStatus: "/keys/bulk-status",
};
const STORAGE_LANGUAGE_KEY = "redeem_chatgpt_language";
const STORAGE_THEME_KEY = "redeem_chatgpt_theme";
const LANGUAGE_ORDER = ["vi", "en", "ur"];

const translations = {
  vi: {
    pageTitle: "Trung tâm CDK ChatGPT",
    pageSubtitle: "Redeem ChatGPT và tra cứu CDK trên cùng một trang",
    guideTitle: "Các bước",
    redeemTitle: "Redeem ChatGPT",
    taskTitle: "Tra cứu task",
    queryTitle: "Tra cứu hàng loạt CDK",
    buttons: {
      validateCdk: "Kiểm tra CDK",
      validateCdkCh1: "Check CDK K1",
      validateCdkCh2: "Check CDK K2",
      validateAuth: "Kiểm tra AuthSession",
      redeem: "Bắt đầu redeem",
      redeemCh1: "Redeem Kênh 1",
      redeemCh2: "Redeem Kênh 2",
      queryTask: "Tra cứu task",
      queryBatch: "Tra cứu",
      queryBatchCh1: "Tra cứu K1",
      queryBatchCh2: "Tra cứu K2",
      clear: "Xóa",
      copyAll: "Sao chép tất cả",
      copyUsed: "Sao chép đã dùng",
      copyUnused: "Sao chép chưa dùng",
      confirm: "OK",
      openChatGPT: "Mở ChatGPT",
      openAuthSession: "Mở AuthSession",
    },
    labels: {
      cdk: "CDK",
      email: "Email",
      authSession: "AuthSession JSON",
      taskId: "Task ID",
      taskStatus: "Trạng thái",
      progress: "Tiến độ",
      app: "Ứng dụng",
      product: "Gói",
      user: "Tài khoản",
      used: "Đã dùng",
      unused: "Chưa dùng",
      invalid: "Không hợp lệ",
      total: "Tổng",
      all: "Tất cả",
      currentTask: "Task hiện tại",
      channel1: "Kênh 1",
      channel2: "Kênh 2",
      batchInput: "Nhập CDK, mỗi dòng một mã",
      waiting: "Chờ nhập dữ liệu",
      ready: "Sẵn sàng",
      checking: "Đang kiểm tra...",
      querying: "Đang tra cứu...",
      redeeming: "Đang redeem...",
      success: "Thành công",
      failure: "Thất bại",
      pending: "Đang xử lý",
      noData: "Chưa có dữ liệu",
      clearHint: "Nút Xóa sẽ làm sạch nội dung và kết quả của khối này.",
      message: "Thông báo",
      redeemTime: "Thời gian redeem",
      tokenExpires: "Token hết hạn",
    },
    notes: {
      auth: "Dán nguyên JSON từ AuthSession để kiểm tra tài khoản trước khi redeem.",
      polling: "Sau khi gửi redeem, hệ thống sẽ tự cập nhật trạng thái task.",
      batch: "Nhập nhiều CDK, mỗi dòng một mã để tra cứu nhanh.",
      channel1: "Kênh 1 có bước kiểm tra AuthSession bằng API trước khi redeem.",
      channel2: "Kênh 2 không có bước check tài khoản riêng, nút redeem sẽ gửi trực tiếp AuthSession JSON.",
      channel2Email: "Kênh 2 không có bước check tài khoản. Hệ thống chỉ đọc email từ AuthSession JSON trước khi redeem.",
      planOverwriteWarning: "Tài khoản này đang có gói Plus. Khi redeem, số ngày Plus hiện tại có thể bị mất và bị đè bằng gói mới.",
    },
    messages: {
      cdkRequired: "Hãy nhập CDK trước.",
      authRequired: "Hãy nhập AuthSession JSON trước.",
      taskRequired: "Hãy nhập task id trước.",
      batchRequired: "Hãy nhập ít nhất 1 CDK.",
      cdkUsed: "CDK này đã được sử dụng.",
      cdkInvalid: "CDK không hợp lệ hoặc không đúng gói.",
      authInvalid: "AuthSession không hợp lệ hoặc chưa đủ điều kiện redeem.",
      authParseFailed: "Không đọc được AuthSession JSON cho Kênh 2.",
      authEmailMissing: "Không tìm thấy địa chỉ email trong AuthSession JSON.",
      network: "Có lỗi mạng. Vui lòng thử lại sau.",
      taskCreated: "Task đã được tạo.",
      taskPending: "Task vẫn đang được xử lý.",
      taskSucceeded: "Task đã hoàn tất thành công.",
      taskFailed: "Task xử lý thất bại.",
      routeInvalid: "Trang này chỉ hỗ trợ `/redeem/chatgpt`.",
      footer: "Trang này dùng để redeem ChatGPT và tra cứu CDK.",
      copyDone: "Đã sao chép vào clipboard.",
      copyEmpty: "Không có dữ liệu để sao chép.",
      channel2Success: "Redeem Kênh 2 thành công.",
      channel2Failed: "Redeem Kênh 2 thất bại.",
      channel2Unavailable: "Kênh 2 đang tạm thời bị chặn hoặc không phản hồi đúng. Vui lòng thử lại sau.",
      channel2Reconfiguring: "Kênh 2 đang được làm lại API. Tạm thời đã tắt, vui lòng chờ cấu hình mới.",
    },
    guide: [
      {
        accent: "green",
        title: "Bước 1: Kiểm tra CDK",
        description: "Nhập CDK rồi bấm kiểm tra để xác nhận mã còn dùng được.",
      },
      {
        accent: "blue",
        title: "Bước 2: Lấy AuthSession",
        description: "Đăng nhập ChatGPT, mở trang AuthSession và sao chép toàn bộ JSON.",
      },
      {
        accent: "yellow",
        title: "Bước 3: Kiểm tra AuthSession",
        description: "Dán JSON vào ô bên dưới rồi bấm kiểm tra để xác minh tài khoản.",
      },
      {
        accent: "green",
        title: "Bước 4: Bắt đầu redeem",
        description: "Khi CDK và AuthSession đều hợp lệ, bấm bắt đầu redeem và chờ task xử lý.",
      },
      {
        accent: "blue",
        title: "Bước 5: Tra cứu CDK",
        description: "Dùng khối bên dưới để tra cứu task hoặc nhiều CDK khi cần.",
      },
    ],
  },
  en: {
    pageTitle: "ChatGPT CDK Center",
    pageSubtitle: "Combined redeem and batch query in one page",
    guideTitle: "Steps",
    redeemTitle: "Redeem ChatGPT",
    taskTitle: "Task Lookup",
    queryTitle: "Batch CDK Lookup",
    buttons: {
      validateCdk: "Validate CDK",
      validateCdkCh1: "Check CDK Ch1",
      validateCdkCh2: "Check CDK Ch2",
      validateAuth: "Check AuthSession",
      redeem: "Start Redeem",
      redeemCh1: "Redeem Channel 1",
      redeemCh2: "Redeem Channel 2",
      queryTask: "Query Task",
      queryBatch: "Query",
      queryBatchCh1: "Query Ch1",
      queryBatchCh2: "Query Ch2",
      clear: "Clear",
      copyAll: "Copy All",
      copyUsed: "Copy Used",
      copyUnused: "Copy Unused",
      confirm: "OK",
      openChatGPT: "Open ChatGPT",
      openAuthSession: "Open AuthSession",
    },
    labels: {
      cdk: "CDK",
      email: "Email",
      authSession: "AuthSession JSON",
      taskId: "Task ID",
      taskStatus: "Task Status",
      progress: "Progress",
      app: "App",
      product: "Product",
      user: "User",
      used: "Used",
      unused: "Unused",
      invalid: "Invalid",
      total: "Total",
      all: "All",
      currentTask: "Current Task",
      channel1: "Channel 1",
      channel2: "Channel 2",
      batchInput: "Enter one CDK per line",
      waiting: "Waiting for input",
      ready: "Ready",
      checking: "Checking...",
      querying: "Querying...",
      redeeming: "Redeeming...",
      success: "Success",
      failure: "Failed",
      pending: "Pending",
      noData: "No data yet",
      clearHint: "Clear input and results inside this section.",
      message: "Message",
      redeemTime: "Redeem Time",
      tokenExpires: "Token Expires",
    },
    notes: {
      auth: "Paste the full AuthSession JSON to verify the account before redeeming.",
      polling: "After redeem starts, the page will keep updating the task status automatically.",
      batch: "Enter multiple CDKs, one code per line, for quick lookup.",
      channel1: "Channel 1 verifies AuthSession through API before redeeming.",
      channel2: "Channel 2 has no separate account-check API. Redeem will send the raw AuthSession JSON directly.",
      channel2Email: "Channel 2 does not verify the account by API. It only reads the email from the AuthSession JSON before redeeming.",
      planOverwriteWarning: "This account already has a Plus plan. Redeeming may remove the remaining Plus days and overwrite the old plan with the new one.",
    },
    messages: {
      cdkRequired: "Enter a CDK first.",
      authRequired: "Enter the AuthSession JSON first.",
      taskRequired: "Enter a task id first.",
      batchRequired: "Enter at least one CDK.",
      cdkUsed: "This CDK has already been used.",
      cdkInvalid: "The CDK is invalid or does not match the product.",
      authInvalid: "The AuthSession is invalid or does not meet redeem requirements.",
      authParseFailed: "The AuthSession JSON could not be parsed for Channel 2.",
      authEmailMissing: "No email address was found in the AuthSession JSON.",
      network: "Network error. Please try again later.",
      taskCreated: "Task created.",
      taskPending: "The task is still processing.",
      taskSucceeded: "The task succeeded.",
      taskFailed: "The task failed.",
      routeInvalid: "This page only supports `/redeem/chatgpt`.",
      footer: "This page is used for ChatGPT redeem and CDK lookup.",
      copyDone: "Copied to clipboard.",
      copyEmpty: "Nothing to copy.",
      channel2Success: "Channel 2 redeem succeeded.",
      channel2Failed: "Channel 2 redeem failed.",
      channel2Unavailable: "Channel 2 is temporarily blocked or unavailable. Please try again later.",
      channel2Reconfiguring: "Channel 2 is being rebuilt with a new API. It is temporarily disabled.",
    },
    guide: [
      {
        accent: "green",
        title: "Step 1: Validate the CDK",
        description: "Enter the CDK and check whether it is still valid.",
      },
      {
        accent: "blue",
        title: "Step 2: Fetch AuthSession",
        description: "Open ChatGPT, visit the AuthSession page, and copy the full JSON.",
      },
      {
        accent: "yellow",
        title: "Step 3: Validate AuthSession",
        description: "Paste the JSON and verify the account before redeeming.",
      },
      {
        accent: "green",
        title: "Step 4: Start redeem",
        description: "Start redeem once both the CDK and AuthSession are valid.",
      },
      {
        accent: "blue",
        title: "Step 5: Lookup task or CDKs",
        description: "Use the lower sections to inspect a task or many CDKs when needed.",
      },
    ],
  },
  ur: {
    pageTitle: "چیٹ جی پی ٹی سی ڈی کے سینٹر",
    pageSubtitle: "Redeem ChatGPT اور CDK تلاش ایک ہی صفحے پر",
    guideTitle: "مراحل",
    redeemTitle: "Redeem ChatGPT",
    taskTitle: "ٹاسک تلاش",
    queryTitle: "کئی CDK کی تلاش",
    buttons: {
      validateCdk: "CDK چیک کریں",
      validateCdkCh1: "CDK چینل 1",
      validateCdkCh2: "CDK چینل 2",
      validateAuth: "AuthSession چیک کریں",
      redeem: "Redeem شروع کریں",
      redeemCh1: "Redeem چینل 1",
      redeemCh2: "Redeem چینل 2",
      queryTask: "ٹاسک تلاش کریں",
      queryBatch: "تلاش کریں",
      queryBatchCh1: "تلاش چینل 1",
      queryBatchCh2: "تلاش چینل 2",
      clear: "صاف کریں",
      copyAll: "سب کاپی کریں",
      copyUsed: "استعمال شدہ کاپی کریں",
      copyUnused: "غیر استعمال شدہ کاپی کریں",
      confirm: "OK",
      openChatGPT: "ChatGPT کھولیں",
      openAuthSession: "AuthSession کھولیں",
    },
    labels: {
      cdk: "CDK",
      email: "Email",
      authSession: "AuthSession JSON",
      taskId: "Task ID",
      taskStatus: "حالت",
      progress: "پیش رفت",
      app: "ایپ",
      product: "پیکیج",
      user: "اکاؤنٹ",
      used: "استعمال شدہ",
      unused: "غیر استعمال شدہ",
      invalid: "غلط",
      total: "کل",
      all: "سب",
      currentTask: "موجودہ ٹاسک",
      channel1: "چینل 1",
      channel2: "چینل 2",
      batchInput: "CDK درج کریں، ہر لائن میں ایک کوڈ",
      waiting: "ان پٹ کا انتظار ہے",
      ready: "تیار",
      checking: "چیک کیا جا رہا ہے...",
      querying: "تلاش کی جا رہی ہے...",
      redeeming: "Redeem کیا جا رہا ہے...",
      success: "کامیاب",
      failure: "ناکام",
      pending: "پروسیسنگ میں",
      noData: "ابھی کوئی ڈیٹا نہیں",
      clearHint: "صاف کریں بٹن اس حصے کا ان پٹ اور نتیجہ ہٹا دے گا۔",
      message: "پیغام",
      redeemTime: "Redeem کا وقت",
      tokenExpires: "Token ختم ہونے کا وقت",
    },
    notes: {
      auth: "Redeem سے پہلے اکاؤنٹ چیک کرنے کے لیے مکمل AuthSession JSON پیسٹ کریں۔",
      polling: "Redeem شروع ہونے کے بعد صفحہ خودکار طور پر ٹاسک کی حالت اپڈیٹ کرے گا۔",
      batch: "جلدی تلاش کے لیے کئی CDK درج کریں، ہر لائن میں ایک کوڈ۔",
      channel1: "چینل 1 میں redeem سے پہلے API کے ذریعے AuthSession چیک ہوتا ہے۔",
      channel2: "چینل 2 میں الگ اکاؤنٹ چیک API نہیں ہے، redeem براہ راست AuthSession JSON بھیجے گا۔",
      channel2Email: "چینل 2 میں اکاؤنٹ چیک API نہیں ہے، redeem سے پہلے صرف AuthSession JSON سے email پڑھا جائے گا۔",
      planOverwriteWarning: "اس اکاؤنٹ پر پہلے سے Plus plan موجود ہے۔ Redeem کرنے پر پرانے Plus کے باقی دن ختم ہو سکتے ہیں اور نیا plan اس پر لکھ دیا جائے گا۔",
    },
    messages: {
      cdkRequired: "پہلے CDK درج کریں۔",
      authRequired: "پہلے AuthSession JSON درج کریں۔",
      taskRequired: "پہلے task id درج کریں۔",
      batchRequired: "کم از کم 1 CDK درج کریں۔",
      cdkUsed: "یہ CDK پہلے ہی استعمال ہو چکا ہے۔",
      cdkInvalid: "CDK غلط ہے یا پیکیج سے مطابقت نہیں رکھتا۔",
      authInvalid: "AuthSession غلط ہے یا redeem کے لیے کافی نہیں۔",
      authParseFailed: "چینل 2 کے لیے AuthSession JSON نہیں پڑھا جا سکا۔",
      authEmailMissing: "AuthSession JSON میں email نہیں ملا۔",
      network: "نیٹ ورک میں خرابی ہے۔ بعد میں دوبارہ کوشش کریں۔",
      taskCreated: "ٹاسک بنا دیا گیا ہے۔",
      taskPending: "ٹاسک ابھی پروسیسنگ میں ہے۔",
      taskSucceeded: "ٹاسک کامیابی سے مکمل ہو گیا۔",
      taskFailed: "ٹاسک ناکام ہو گیا۔",
      routeInvalid: "یہ صفحہ صرف `/redeem/chatgpt` کو سپورٹ کرتا ہے۔",
      footer: "یہ صفحہ ChatGPT redeem اور CDK تلاش کے لیے ہے۔",
      copyDone: "Clipboard میں کاپی ہو گیا۔",
      copyEmpty: "کاپی کرنے کے لیے کوئی ڈیٹا نہیں۔",
      channel2Success: "چینل 2 redeem کامیاب ہو گیا۔",
      channel2Failed: "چینل 2 redeem ناکام ہو گیا۔",
      channel2Unavailable: "چینل 2 عارضی طور پر بلاک ہے یا دستیاب نہیں۔ بعد میں دوبارہ کوشش کریں۔",
      channel2Reconfiguring: "چینل 2 نئے API کے ساتھ دوبارہ ترتیب دیا جا رہا ہے، فی الحال عارضی طور پر بند ہے۔",
    },
    guide: [
      {
        accent: "green",
        title: "مرحلہ 1: CDK چیک کریں",
        description: "CDK درج کریں اور چیک بٹن دبا کر اس کی درستگی دیکھیں۔",
      },
      {
        accent: "blue",
        title: "مرحلہ 2: AuthSession لیں",
        description: "ChatGPT میں لاگ اِن کریں، AuthSession صفحہ کھولیں اور مکمل JSON کاپی کریں۔",
      },
      {
        accent: "yellow",
        title: "مرحلہ 3: AuthSession چیک کریں",
        description: "JSON پیسٹ کریں اور اکاؤنٹ کی تصدیق کریں۔",
      },
      {
        accent: "green",
        title: "مرحلہ 4: Redeem شروع کریں",
        description: "جب CDK اور AuthSession دونوں درست ہوں تو redeem شروع کریں۔",
      },
      {
        accent: "blue",
        title: "مرحلہ 5: CDK تلاش کریں",
        description: "نیچے والے حصوں سے ٹاسک یا کئی CDK چیک کریں۔",
      },
    ],
  },
};

const state = {
  language: getStoredLanguage(),
  theme: getStoredTheme(),
  modal: null,
  redeem: {
    channelMode: "channel1",
    cdkInput: "",
    authInput: "",
    verifiedCdk: null,
    verifiedUser: null,
    validatedChannel: "",
    validatedCdkValue: "",
    validatedAuthValue: "",
    cdkStatus: null,
    authStatus: null,
    cdkLoading: false,
    authLoading: false,
    redeeming: false,
    task: null,
    pollToken: 0,
  },
  taskLookup: {
    input: "",
    result: null,
    loading: false,
  },
  batch: {
    input: "",
    results: [],
    loading: false,
    progress: 0,
    filter: "all",
    lastChannel: "channel1",
  },
};

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");

init();

function init() {
  applyTheme();
  primePointerGlow();

  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", "/redeem/chatgpt");
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("pointermove", handlePointerMove, { passive: true });

  render();
}

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) {
    if (event.target === modalRoot && !state.modal?.locked) {
      closeModal();
    }
    return;
  }

  if (trigger.disabled) {
    return;
  }

  switch (trigger.dataset.action) {
    case "toggle-language":
      state.language = getNextLanguage(state.language);
      localStorage.setItem(STORAGE_LANGUAGE_KEY, state.language);
      applyTheme();
      render();
      break;
    case "toggle-theme":
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_THEME_KEY, state.theme);
      applyTheme();
      render();
      break;
    case "set-redeem-channel":
      setRedeemChannel(trigger.dataset.channel === "channel2" ? "channel2" : "channel1");
      break;
    case "open-url":
      window.open(trigger.dataset.url, "_blank", "noopener,noreferrer");
      break;
    case "validate-cdk":
      prepareRedeemChannel("channel1");
      validateCdk({ channel: "channel1" });
      break;
    case "validate-cdk-channel2":
      prepareRedeemChannel("channel2");
      validateCdk({ channel: "channel2" });
      break;
    case "validate-auth":
      validateAuthSession();
      break;
    case "start-redeem":
      startRedeem("channel1");
      break;
    case "start-redeem-channel2":
      startRedeem("channel2");
      break;
    case "clear-redeem":
      clearRedeem();
      break;
    case "query-task":
      queryTask();
      break;
    case "clear-task":
      clearTaskLookup();
      break;
    case "query-batch":
      queryBatch("channel1");
      break;
    case "query-batch-channel2":
      queryBatch("channel2");
      break;
    case "clear-batch":
      clearBatch();
      break;
    case "set-batch-filter":
      state.batch.filter = trigger.dataset.filter || "all";
      render();
      break;
    case "copy-all":
      copyBatch("all");
      break;
    case "copy-used":
      copyBatch("used");
      break;
    case "copy-unused":
      copyBatch("unused");
      break;
    case "close-modal": {
      if (state.modal?.locked) {
        break;
      }
      const onOk = state.modal?.onOk;
      closeModal();
      if (typeof onOk === "function") {
        onOk();
      }
      break;
    }
    default:
      break;
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.matches("[data-model='redeem-cdk']")) {
    state.redeem.cdkInput = target.value;
    if (normalize(target.value) !== state.redeem.validatedCdkValue) {
      resetCdkValidation();
      resetAuthValidation();
    }
    renderPreservingInput(target);
    return;
  }

  if (target.matches("[data-model='redeem-auth']")) {
    state.redeem.authInput = target.value;
    if (target.value.trim() !== state.redeem.validatedAuthValue) {
      resetAuthValidation();
    }
    renderPreservingInput(target);
    return;
  }

  if (target.matches("[data-model='task-lookup']")) {
    state.taskLookup.input = target.value;
    renderPreservingInput(target);
    return;
  }

  if (target.matches("[data-model='batch-input']")) {
    state.batch.input = target.value;
    const section = target.closest(".batch-console");
    const queryButtons = section?.querySelectorAll("[data-action='query-batch'], [data-action='query-batch-channel2']");
    const clearButton = section?.querySelector("[data-action='clear-batch']");
    const hasCodes = parseBatchCodes(target.value).length > 0;

    if (queryButtons) {
      queryButtons.forEach((button) => {
        if (button instanceof HTMLButtonElement) {
          button.disabled = state.batch.loading || !hasCodes;
        }
      });
    }

    if (clearButton instanceof HTMLButtonElement) {
      clearButton.disabled = state.batch.loading;
    }

    return;
  }
}

function handleKeyDown(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement) || event.key !== "Enter") {
    return;
  }

  if (target.matches("[data-model='redeem-cdk']")) {
    event.preventDefault();
    validateCdk({ channel: state.redeem.channelMode });
    return;
  }

  if (target.matches("[data-model='task-lookup']")) {
    event.preventDefault();
    queryTask();
  }
}

function handlePointerMove(event) {
  document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
}

function renderPreservingInput(target) {
  const model = target.getAttribute("data-model");
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const selectionStart =
    typeof target.selectionStart === "number" ? target.selectionStart : null;
  const selectionEnd =
    typeof target.selectionEnd === "number" ? target.selectionEnd : null;

  render();

  window.scrollTo(scrollX, scrollY);

  if (!model) {
    return;
  }

  const nextField = document.querySelector(`[data-model="${CSS.escape(model)}"]`);
  if (!(nextField instanceof HTMLInputElement) && !(nextField instanceof HTMLTextAreaElement)) {
    return;
  }

  nextField.focus({ preventScroll: true });

  if (selectionStart !== null && selectionEnd !== null) {
    nextField.setSelectionRange(selectionStart, selectionEnd);
  }
}

function primePointerGlow() {
  document.documentElement.style.setProperty("--pointer-x", `${Math.round(window.innerWidth * 0.72)}px`);
  document.documentElement.style.setProperty("--pointer-y", `${Math.round(window.innerHeight * 0.22)}px`);
}

function render() {
  document.title = t().pageTitle;

  if (!isValidRoute()) {
    app.innerHTML = `
      <div class="simple-shell">
        <div class="simple-container">
          <div class="card not-found">
            <h1>404</h1>
            <p>${escapeHtml(t().messages.routeInvalid)}</p>
          </div>
        </div>
      </div>
    `;
    renderModal();
    return;
  }

  app.innerHTML = `
    <div class="simple-shell">
      <div class="simple-container">
        <header class="topbar">
          ${renderUtilityDeck()}
        </header>

        <section class="hero-card">
          <div class="hero-card__copy">
            <h1>${escapeHtml(t().pageTitle)}</h1>
            <p>${escapeHtml(t().pageSubtitle)}</p>
          </div>
          <div class="hero-card__tools">
            ${renderUtilityDeck()}
          </div>
        </section>

        <section class="workspace-board">
          <div class="workspace-grid">
            <aside class="guide-panel section-card">
              <div class="section-head section-head--compact">
                <div>
                  <h2>${escapeHtml(t().guideTitle)}</h2>
                </div>
              </div>
              <div class="guide-list">${renderGuideItems()}</div>
            </aside>

            <section class="workspace-main">
              <section class="section-card section-card--primary redeem-panel">
                <div class="section-head section-head--compact">
                  <div>
                    <h2>${escapeHtml(t().redeemTitle)}</h2>
                    <p>${escapeHtml(t().notes.polling)}</p>
                  </div>
                  ${renderStatusBadge(workspaceState().label, workspaceState().tone)}
                </div>
                ${renderRedeemSection()}
              </section>

              <section class="section-card lookup-card lookup-card--task">
                <div class="section-head section-head--compact">
                  <div>
                    <h2>${escapeHtml(t().taskTitle)}</h2>
                  </div>
                </div>
                ${renderTaskLookupSection()}
              </section>
            </section>
          </div>
        </section>

        <section class="section-card lookup-card lookup-card--batch">
          <div class="section-head section-head--compact">
            <div>
              <h2>${escapeHtml(t().queryTitle)}</h2>
              <p>${escapeHtml(t().notes.batch)}</p>
            </div>
          </div>
          ${renderBatchSection()}
        </section>

        <footer class="footer-note">
          <p>${escapeHtml(t().messages.footer)}</p>
        </footer>
      </div>
    </div>
  `;

  renderModal();
}

function renderGuideItems() {
  return t().guide
    .map(
      (item, index) => `
        <article class="guide-item guide-item--${escapeHtml(item.accent || "blue")}">
          <div class="guide-number guide-number--${escapeHtml(item.accent || "blue")}">${index + 1}</div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            ${renderGuideAction(index)}
          </div>
        </article>
      `
    )
    .join("");
}

function renderGuideAction(index) {
  if (index === 1) {
    return `
      <button type="button" class="guide-action" data-action="open-url" data-url="https://chatgpt.com/">
        ${escapeHtml(t().buttons.openChatGPT)}
      </button>
    `;
  }

  if (index === 2) {
    return `
      <button type="button" class="guide-action" data-action="open-url" data-url="https://chatgpt.com/api/auth/session">
        ${escapeHtml(t().buttons.openAuthSession)}
      </button>
    `;
  }

  return "";
}

function renderUtilityDeck() {
  return `
    <div class="utility-deck">
      <button type="button" class="lang-toggle" data-action="toggle-language" title="Language">
        ${escapeHtml(languageBadge(state.language))}
      </button>
      <button type="button" class="icon-toggle" data-action="toggle-theme" title="Light / dark">
        ${renderThemeIcon()}
      </button>
    </div>
  `;
}

function renderRedeemSection() {
  const activeChannel = state.redeem.channelMode;
  const isChannel2 = activeChannel === "channel2";
  const channel2PreviewUser = isChannel2 ? getChannel2AuthPreview() : null;
  const canRedeemChannel1 =
    Boolean(state.redeem.verifiedCdk) &&
    Boolean(state.redeem.verifiedUser) &&
    state.redeem.validatedChannel === "channel1" &&
    state.redeem.validatedCdkValue === normalize(state.redeem.cdkInput) &&
    state.redeem.validatedAuthValue === state.redeem.authInput.trim() &&
    !state.redeem.redeeming &&
    !state.redeem.cdkLoading &&
    !state.redeem.authLoading;
  const canRedeemChannel2 =
    Boolean(state.redeem.verifiedCdk) &&
    Boolean(channel2PreviewUser) &&
    state.redeem.validatedChannel === "channel2" &&
    state.redeem.validatedCdkValue === normalize(state.redeem.cdkInput) &&
    !state.redeem.redeeming &&
    !state.redeem.cdkLoading;
  const launchReady = isChannel2 ? canRedeemChannel2 : canRedeemChannel1;
  const hasPlusPlanWarning = getAuthSessionPlanType(state.redeem.authInput) === "plus";
  const authStatus = isChannel2
    ? channel2PreviewUser
      ? statusSuccess(`${t().labels.email}: ${channel2PreviewUser.email}`)
      : state.redeem.authInput.trim()
        ? statusError(t().messages.authEmailMissing)
        : null
    : state.redeem.authStatus;

  return `
    <div class="redeem-layout">
      <article class="card-inner step-card">
        <div class="step-head">
          <span class="step-dot">1</span>
          <div class="block-head">
            <div>
              <h3>${escapeHtml(t().labels.cdk)}</h3>
              <p>${escapeHtml(`${t().buttons.validateCdk} • ${channelLabel(activeChannel)}`)}</p>
            </div>
          </div>
        </div>
        <div class="field-stack">
          <div class="field-stack">
            <input
              class="input-field ${statusClass(state.redeem.cdkStatus)}"
              data-model="redeem-cdk"
              value="${escapeAttribute(state.redeem.cdkInput)}"
              placeholder="XXXXXXXXXXXXX / XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              ${state.redeem.redeeming ? "disabled" : ""}
            />
            <div class="cdk-actions">
              <button
                type="button"
                class="button-secondary ${activeChannel === "channel1" ? "is-active" : ""}"
                data-action="validate-cdk"
                ${state.redeem.cdkLoading || state.redeem.redeeming ? "disabled" : ""}
              >
                ${escapeHtml(
                  state.redeem.cdkLoading && activeChannel === "channel1"
                    ? t().labels.checking
                    : t().buttons.validateCdkCh1
                )}
              </button>
              <button
                type="button"
                class="button-secondary ${activeChannel === "channel2" ? "is-active" : ""}"
                data-action="validate-cdk-channel2"
                ${state.redeem.cdkLoading || state.redeem.redeeming ? "disabled" : ""}
              >
                ${escapeHtml(
                  state.redeem.cdkLoading && activeChannel === "channel2"
                    ? t().labels.checking
                    : t().buttons.validateCdkCh2
                )}
              </button>
            </div>
          </div>
          <div class="helper-text">${escapeHtml(isChannel2 ? t().notes.channel2 : t().notes.channel1)}</div>
          <div class="status-inline ${statusColorClass(state.redeem.cdkStatus)}">
            ${renderInlineStatus(state.redeem.cdkStatus, state.redeem.cdkLoading, t().labels.checking)}
          </div>
        </div>
      </article>

      <article class="card-inner step-card">
        <div class="step-head">
          <span class="step-dot">2</span>
          <div class="block-head">
            <div>
              <h3>${escapeHtml(t().labels.authSession)}</h3>
              <p>${escapeHtml(isChannel2 ? t().labels.email : t().buttons.validateAuth)}</p>
            </div>
          </div>
        </div>
        <div class="field-stack">
          <textarea
            class="input-field token-field ${statusClass(authStatus)}"
            data-model="redeem-auth"
            placeholder='{"user":{"id":"user-..."},"expires":"..."}'
            ${state.redeem.redeeming ? "disabled" : ""}
          >${escapeHtml(state.redeem.authInput)}</textarea>
          ${
            hasPlusPlanWarning
              ? `<div class="warning-note">${escapeHtml(t().notes.planOverwriteWarning)}</div>`
              : ""
          }
          <div class="task-actions">
            ${
              isChannel2
                ? ""
                : `
                  <button
                    type="button"
                    class="button-link"
                    data-action="validate-auth"
                    ${state.redeem.authLoading || state.redeem.redeeming ? "disabled" : ""}
                  >
                    ${escapeHtml(state.redeem.authLoading ? t().labels.checking : t().buttons.validateAuth)}
                  </button>
                `
            }
            <button
              type="button"
              class="button-secondary"
              data-action="clear-redeem"
              ${state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(t().buttons.clear)}
            </button>
          </div>
          <div class="helper-text">${escapeHtml(isChannel2 ? t().notes.channel2Email : t().notes.auth)}</div>
          <div class="status-inline ${statusColorClass(authStatus)}">
            ${renderInlineStatus(authStatus, state.redeem.authLoading && !isChannel2, t().labels.checking)}
          </div>
          <div class="submit-inline">
            <button
              type="button"
              class="button-primary launch-button ${isChannel2 ? "launch-button--channel2" : ""}"
              data-action="${isChannel2 ? "start-redeem-channel2" : "start-redeem"}"
              ${launchReady ? "" : "disabled"}
            >
              ${escapeHtml(
                state.redeem.redeeming
                  ? t().labels.redeeming
                  : isChannel2
                    ? t().buttons.redeemCh2
                    : t().buttons.redeemCh1
              )}
            </button>
            <div class="helper-text submit-note">${escapeHtml(t().notes.polling)}</div>
          </div>
        </div>
      </article>
    </div>

    ${renderVerifiedPanels(getRedeemUserSnapshot())}
  `;
}

function renderVerifiedPanels(activeUser = getRedeemUserSnapshot()) {
  const blocks = [];

  if (state.redeem.verifiedCdk && activeUser) {
    const currentPlan = normalize(activeUser?.extra?.current_plan);
    const tokenExpires = normalize(activeUser?.extra?.token_expires);

    blocks.push(`
      <section class="summary-card">
        <div class="summary-head">
          <h3>${escapeHtml(state.language === "vi" ? "Xác nhận trước khi kích hoạt" : state.language === "ur" ? "ایکٹیویٹ کرنے سے پہلے تصدیق" : "Confirm Before Activation")}</h3>
          ${renderStatusBadge(t().labels.ready, "success")}
        </div>
        <div class="info-grid">
          <div class="task-kv"><strong>${escapeHtml(t().labels.email)}</strong><span>${escapeHtml(activeUser.email || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.cdk)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.code || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.app)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.app_name || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.product)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.app_product_name || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(state.language === "vi" ? "Gói hiện tại" : state.language === "ur" ? "موجودہ پلان" : "Current Plan")}</strong><span>${escapeHtml(currentPlan || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.tokenExpires)}</strong><span>${escapeHtml(tokenExpires || "-")}</span></div>
        </div>
      </section>
    `);
  }

  if (!state.redeem.task && !blocks.length) {
    return "";
  }

  if (state.redeem.task) {
    blocks.push(`
      <section class="summary-card ${blocks.length ? "" : "summary-card--task"}">
        <div class="summary-head">
          <h3>${escapeHtml(t().labels.currentTask)}</h3>
          ${renderStatusBadge(taskStatusLabel(state.redeem.task), taskTone(state.redeem.task))}
        </div>
        ${renderTaskSummary(state.redeem.task)}
        <div class="helper-text">${escapeHtml(t().notes.polling)}</div>
      </section>
    `);
  }

  return `<div class="summary-grid ${blocks.length === 1 ? "summary-grid--single" : ""}">${blocks.join("")}</div>`;
}

function renderTaskLookupSection() {
  return `
    <div class="lookup-console">
      <div class="task-query-row command-actions">
        <input
          class="input-field"
          data-model="task-lookup"
          value="${escapeAttribute(state.taskLookup.input)}"
          placeholder="task_id"
          ${state.taskLookup.loading ? "disabled" : ""}
        />
        <button
          type="button"
          class="button-secondary"
          data-action="query-task"
          ${state.taskLookup.loading ? "disabled" : ""}
        >
          ${escapeHtml(state.taskLookup.loading ? t().labels.querying : t().buttons.queryTask)}
        </button>
        <button
          type="button"
          class="button-secondary"
          data-action="clear-task"
          ${state.taskLookup.loading ? "disabled" : ""}
        >
          ${escapeHtml(t().buttons.clear)}
        </button>
      </div>
    </div>
    ${
      state.taskLookup.result
        ? `<div class="result-stage">${renderTaskSummary(state.taskLookup.result)}</div>`
        : `<div class="empty-panel">${escapeHtml(t().labels.noData)}</div>`
    }
  `;
}

function renderBatchSection() {
  const visibleResults = filterBatchResults();
  const stats = getBatchStats();

  return `
    <div class="batch-console">
      <textarea
        class="input-field token-field"
        data-model="batch-input"
        placeholder="${escapeAttribute(t().labels.batchInput)}"
        ${state.batch.loading ? "disabled" : ""}
      >${escapeHtml(state.batch.input)}</textarea>
      <div class="helper-text">${escapeHtml(t().labels.clearHint)}</div>
      <div class="task-actions">
        <button
          type="button"
          class="button-primary"
          data-action="query-batch"
          ${state.batch.loading || !parseBatchCodes(state.batch.input).length ? "disabled" : ""}
        >
          ${escapeHtml(state.batch.loading && state.batch.lastChannel === "channel1" ? t().labels.querying : t().buttons.queryBatchCh1)}
        </button>
        <button
          type="button"
          class="button-secondary"
          data-action="query-batch-channel2"
          ${state.batch.loading || !parseBatchCodes(state.batch.input).length ? "disabled" : ""}
        >
          ${escapeHtml(state.batch.loading && state.batch.lastChannel === "channel2" ? t().labels.querying : t().buttons.queryBatchCh2)}
        </button>
        <button
          type="button"
          class="button-secondary"
          data-action="clear-batch"
          ${state.batch.loading ? "disabled" : ""}
        >
          ${escapeHtml(t().buttons.clear)}
        </button>
      </div>
      ${
        state.batch.loading || state.batch.progress > 0
          ? `
            <div class="task-progress">
              <span style="width: ${Math.round(state.batch.progress * 100)}%"></span>
            </div>
          `
          : ""
        }
    </div>

    ${
      state.batch.results.length
        ? `
          <div class="power-bar">
            <span class="power-pill"><strong>${stats.total}</strong><em>${escapeHtml(t().labels.total)}</em></span>
            <span class="power-pill"><strong>${stats.used}</strong><em>${escapeHtml(t().labels.used)}</em></span>
            <span class="power-pill"><strong>${stats.unused}</strong><em>${escapeHtml(t().labels.unused)}</em></span>
            <span class="power-pill"><strong>${stats.invalid}</strong><em>${escapeHtml(t().labels.invalid)}</em></span>
          </div>

          <div class="copy-actions">
            <button type="button" class="button-secondary" data-action="copy-all">${escapeHtml(t().buttons.copyAll)}</button>
            <button type="button" class="button-secondary" data-action="copy-used">${escapeHtml(t().buttons.copyUsed)}</button>
            <button type="button" class="button-secondary" data-action="copy-unused">${escapeHtml(t().buttons.copyUnused)}</button>
          </div>

          <div class="filter-tabs">
            ${renderFilterButton("all", t().labels.all)}
            ${renderFilterButton("used", t().labels.used)}
            ${renderFilterButton("unused", t().labels.unused)}
            ${renderFilterButton("invalid", t().labels.invalid)}
          </div>

          <div class="usage-list">
            ${
              visibleResults.length
                ? visibleResults.map(renderBatchItem).join("")
                : `<div class="empty-panel">${escapeHtml(t().labels.noData)}</div>`
            }
          </div>
        `
        : `<div class="empty-panel">${escapeHtml(t().labels.noData)}</div>`
    }
  `;
}

function renderFilterButton(filter, label) {
  const active = state.batch.filter === filter;
  return `
    <button
      type="button"
      class="filter-chip ${active ? "is-active" : ""}"
      data-action="set-batch-filter"
      data-filter="${escapeHtml(filter)}"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

function renderBatchItem(item) {
  const isChannel2 = state.batch.lastChannel === "channel2";

  if (isChannel2) {
    return `
      <article class="usage-card">
        <div class="summary-head">
          <h3>${escapeHtml(item.code || "-")}</h3>
          ${renderStatusBadge(batchStatusLabel(item.status), batchTone(item.status))}
        </div>
        <div class="info-grid">
          <div class="task-kv"><strong>${escapeHtml(t().labels.email)}</strong><span>${escapeHtml(item.user || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.app)}</strong><span>${escapeHtml(item.app_name || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.product)}</strong><span>${escapeHtml(item.product_name || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.redeemTime)}</strong><span>${escapeHtml(item.redeem_time || "-")}</span></div>
        </div>
      </article>
    `;
  }

  return `
    <article class="usage-card">
      <div class="summary-head">
        <h3>${escapeHtml(item.code || "-")}</h3>
        ${renderStatusBadge(batchStatusLabel(item.status), batchTone(item.status))}
      </div>
      <div class="info-grid">
        <div class="task-kv"><strong>${escapeHtml(t().labels.user)}</strong><span>${escapeHtml(item.user || "-")}</span></div>
        <div class="task-kv"><strong>${escapeHtml(t().labels.app)}</strong><span>${escapeHtml(item.app_name || "-")}</span></div>
        <div class="task-kv"><strong>${escapeHtml(t().labels.product)}</strong><span>${escapeHtml(item.product_name || "-")}</span></div>
        <div class="task-kv"><strong>${escapeHtml(t().labels.redeemTime)}</strong><span>${escapeHtml(item.redeem_time || "-")}</span></div>
      </div>
    </article>
  `;
}

function renderHeroStats() {
  const batchStats = getBatchStats();
  const currentTask = state.redeem.task;
  const activeUser = getRedeemUserSnapshot();

  return [
    renderMetricCard(
      t().labels.cdk,
      state.redeem.verifiedCdk ? t().labels.ready : t().labels.waiting,
      state.redeem.verifiedCdk?.app_product_name || t().buttons.validateCdk,
      state.redeem.verifiedCdk ? "success" : "neutral"
    ),
    renderMetricCard(
      t().labels.authSession,
      activeUser ? t().labels.ready : t().labels.waiting,
      activeUser?.email || activeUser?.user || t().buttons.validateAuth,
      activeUser ? "success" : "neutral"
    ),
    renderMetricCard(
      t().labels.currentTask,
      currentTask ? taskStatusLabel(currentTask) : t().labels.noData,
      currentTask?.task_id || t().buttons.queryTask,
      currentTask ? taskTone(currentTask) : "neutral"
    ),
    renderMetricCard(
      t().queryTitle,
      String(batchStats.total),
      `${t().labels.used}: ${batchStats.used} / ${t().labels.unused}: ${batchStats.unused}`,
      batchStats.total ? "warning" : "neutral"
    ),
  ].join("");
}

function renderMetricCard(label, value, detail, tone) {
  return `
    <article class="signal-card tone-${escapeHtml(tone)}">
      <span class="signal-tag">${escapeHtml(label)}</span>
      <strong class="signal-value">${escapeHtml(value)}</strong>
      <span class="signal-note">${escapeHtml(detail)}</span>
    </article>
  `;
}

function renderLivePanel() {
  const activeUser = getRedeemUserSnapshot();
  const lines = [
    {
      label: t().labels.cdk,
      value: state.redeem.verifiedCdk ? t().labels.ready : t().labels.waiting,
      tone: state.redeem.verifiedCdk ? "success" : "neutral",
    },
    {
      label: t().labels.authSession,
      value: activeUser ? t().labels.ready : t().labels.waiting,
      tone: activeUser ? "success" : "neutral",
    },
    {
      label: t().labels.currentTask,
      value: state.redeem.task ? taskStatusLabel(state.redeem.task) : t().labels.noData,
      tone: state.redeem.task ? taskTone(state.redeem.task) : "neutral",
    },
    {
      label: t().queryTitle,
      value: String(getBatchStats().total),
      tone: getBatchStats().total ? "warning" : "neutral",
    },
  ];

  return lines
    .map(
      (item) => `
        <div class="status-row">
          <span>${escapeHtml(item.label)}</span>
          ${renderStatusBadge(item.value, item.tone)}
        </div>
      `
    )
    .join("");
}

async function validateCdk({ silent = false, channel = "channel1" } = {}) {
  const code = normalize(state.redeem.cdkInput);
  state.redeem.channelMode = channel === "channel2" ? "channel2" : "channel1";

  if (!code) {
    state.redeem.cdkStatus = statusError(t().messages.cdkRequired);
    render();
    if (!silent) {
      showModal("error", t().labels.failure, t().messages.cdkRequired);
    }
    return false;
  }

  state.redeem.cdkLoading = true;
  state.redeem.validatedChannel = channel;
  state.redeem.cdkStatus = null;
  render();

  try {
    const result =
      channel === "channel2"
        ? await checkChannel2Cdk(code)
        : await apiJson("/api/channel1/check-cdk", {
            method: "POST",
            body: JSON.stringify({ code }),
          });

    if (channel === "channel1" && result.used) {
      throw new Error(t().messages.cdkUsed);
    }

    state.redeem.verifiedCdk = normalizeVerifiedCdk(result, code, channel);
    state.redeem.validatedCdkValue = code;
    state.redeem.cdkStatus = statusSuccess(t().labels.ready);
    render();

    if (!silent) {
      showModal(
        "success",
        t().labels.success,
        `${channelLabel(channel)}\n${t().labels.app}: ${state.redeem.verifiedCdk.app_name || "-"}\n${t().labels.product}: ${state.redeem.verifiedCdk.app_product_name || "-"}`
      );
    }

    return true;
  } catch (error) {
    resetCdkValidation();
    state.redeem.cdkStatus = statusError(t().messages.cdkInvalid);
    render();

    if (!silent) {
      showModal("error", t().labels.failure, normalizeError(error, t().messages.cdkInvalid));
    }

    return false;
  } finally {
    state.redeem.cdkLoading = false;
    render();
  }
}

async function validateAuthSession({ silent = false } = {}) {
  const cdkValue = normalize(state.redeem.cdkInput);
  const authValue = state.redeem.authInput.trim();

  if (state.redeem.channelMode === "channel2") {
    try {
      const preview = parseAuthSessionChannel2(authValue);
      state.redeem.verifiedUser = preview;
      state.redeem.validatedAuthValue = authValue;
      state.redeem.authStatus = statusSuccess(`${t().labels.email}: ${preview.email}`);
      render();
      return true;
    } catch (error) {
      resetAuthValidation();
      state.redeem.authStatus = statusError(normalizeError(error, t().messages.authEmailMissing));
      render();
      if (!silent) {
        showModal("error", t().labels.failure, normalizeError(error, t().messages.authEmailMissing));
      }
      return false;
    }
  }

  if (!cdkValue) {
    state.redeem.cdkStatus = statusError(t().messages.cdkRequired);
    render();
    if (!silent) {
      showModal("error", t().labels.failure, t().messages.cdkRequired);
    }
    return false;
  }

  if (!authValue) {
    state.redeem.authStatus = statusError(t().messages.authRequired);
    render();
    if (!silent) {
      showModal("error", t().labels.failure, t().messages.authRequired);
    }
    return false;
  }

  if (cdkValue !== state.redeem.validatedCdkValue || state.redeem.validatedChannel !== "channel1") {
    const ok = await validateCdk({ silent: true, channel: "channel1" });
    if (!ok) {
      return false;
    }
  }

  state.redeem.authLoading = true;
  state.redeem.authStatus = null;
  render();

  try {
    const result = await apiJson("/api/channel1/check-auth", {
      method: "POST",
      body: JSON.stringify({
        user: authValue,
        cdk: state.redeem.validatedCdkValue,
      }),
    });

    if (!result.verified) {
      throw new Error(t().messages.authInvalid);
    }

    state.redeem.verifiedUser = result;
    state.redeem.validatedAuthValue = authValue;
    state.redeem.authStatus = statusSuccess(t().labels.ready);
    render();

    if (!silent) {
      showModal("success", t().labels.success, formatUserDetails(result).join("\n"));
    }

    return true;
  } catch (error) {
    resetAuthValidation();
    state.redeem.authStatus = statusError(t().messages.authInvalid);
    render();

    if (!silent) {
      showModal("error", t().labels.failure, normalizeError(error, t().messages.authInvalid));
    }

    return false;
  } finally {
    state.redeem.authLoading = false;
    render();
  }
}

async function startRedeem(channel = "channel1") {
  if (state.redeem.redeeming) {
    return;
  }

  if (channel === "channel2") {
    await startRedeemChannel2();
    return;
  }

  showLoadingModal(t().labels.redeeming, `${channelLabel(channel)}\n${t().labels.checking}`);

  const authOk = await validateAuthSession({ silent: true });
  if (!authOk) {
    showModal("error", t().labels.failure, t().messages.authInvalid);
    return;
  }

  state.redeem.redeeming = true;
  state.redeem.validatedChannel = "channel1";
  render();

  try {
    const cdk = normalize(state.redeem.cdkInput);
    const user = state.redeem.validatedAuthValue;

    const taskId = await apiText("/api/channel1/redeem", {
      method: "POST",
      body: JSON.stringify({ cdk, user }),
    });

    state.redeem.task = normalizeTaskResponse({
      task_id: taskId.trim(),
      cdk,
      status: "created",
      progress: 0,
      error: "",
    });
    render();

    updateModalMessage(
      [
        channelLabel("channel1"),
        t().messages.taskCreated,
        `${t().labels.taskId}: ${state.redeem.task.task_id}`,
        `${t().labels.progress}: 0%`,
      ].join("\n\n"),
      t().labels.redeeming
    );

    await pollTask(taskId.trim());
  } catch (error) {
    state.redeem.redeeming = false;
    render();
    showModal("error", t().labels.failure, normalizeError(error, t().messages.taskFailed));
  }
}

async function pollTask(taskId) {
  const token = Date.now();
  state.redeem.pollToken = token;

  while (state.redeem.pollToken === token) {
    let task;

    try {
      task = await fetchTask(taskId);
    } catch (_error) {
      await delay(POLL_INTERVAL_MS);
      continue;
    }

    state.redeem.task = task;
    render();
    updateModalMessage(
      [
        channelLabel("channel1"),
        `${t().labels.taskId}: ${task.task_id || taskId}`,
        `${t().labels.taskStatus}: ${taskStatusLabel(task)}`,
        `${t().labels.progress}: ${clampProgress(task.progress)}%`,
        `${t().labels.message}: ${task.message || task.error || "-"}`,
      ].join("\n\n"),
      t().labels.redeeming
    );

    if (task.pending) {
      await delay(POLL_INTERVAL_MS);
      continue;
    }

    state.redeem.redeeming = false;
    render();

    if (task.success) {
      showModal("success", t().labels.success, `${t().messages.taskSucceeded}\n\n${taskMessageBlock(task)}`, null, {
        fireworks: true,
      });
    } else {
      showModal("error", t().labels.failure, `${t().messages.taskFailed}\n\n${taskMessageBlock(task)}`);
    }
    return;
  }
}

async function queryTask() {
  const taskId = normalize(state.taskLookup.input);
  if (!taskId) {
    showModal("error", t().labels.failure, t().messages.taskRequired);
    return;
  }

  state.taskLookup.loading = true;
  render();

  try {
    const task = await fetchTask(taskId);
    state.taskLookup.result = task;
    render();

    if (task.pending) {
      showModal("info", t().labels.pending, `${t().messages.taskPending}\n\n${taskMessageBlock(task)}`);
    } else if (task.success) {
      showModal("success", t().labels.success, `${t().messages.taskSucceeded}\n\n${taskMessageBlock(task)}`);
    } else {
      showModal("error", t().labels.failure, `${t().messages.taskFailed}\n\n${taskMessageBlock(task)}`);
    }
  } catch (error) {
    showModal("error", t().labels.failure, normalizeError(error, t().messages.taskFailed));
  } finally {
    state.taskLookup.loading = false;
    render();
  }
}

async function queryBatch(channel = "channel1") {
  const codes = channel === "channel2" ? parseChannel2BatchCodes(state.batch.input) : parseBatchCodes(state.batch.input);
  if (!codes.length) {
    showModal("error", t().labels.failure, t().messages.batchRequired);
    return;
  }

  state.batch.loading = true;
  state.batch.progress = 0;
  state.batch.lastChannel = channel;
  render();

  try {
    if (channel === "channel2") {
      const payload = await apiChannel2Json(CHANNEL2_ENDPOINTS.bulkStatus, {
        method: "POST",
        body: JSON.stringify({ codes }),
      });
      state.batch.results = buildChannel2BatchResults(codes, payload);
    } else {
      const results = await apiJson("/api/channel1/batch-query", {
        method: "POST",
        body: JSON.stringify({ codes }),
      });

      state.batch.results = Array.isArray(results)
        ? results.map((item) => ({
            code: item.code,
            status: item.used ? "used" : "unused",
            user: item.user,
            redeem_time: item.redeem_time,
            app_name: item.app_name,
            product_name: item.product_name,
          }))
        : [];
    }
  } catch (error) {
    if (channel === "channel2") {
      showModal(
        "error",
        t().labels.failure,
        normalizeError(error, t().messages.channel2Unavailable)
      );
    }
    state.batch.results = codes.map((code) => ({
      code,
      status: "invalid",
      user: "",
      redeem_time: "",
      app_name: "",
      product_name: "",
    }));
  } finally {
    state.batch.progress = 1;
    state.batch.loading = false;
    render();
  }
}

async function copyBatch(kind) {
  const results = kind === "all" ? state.batch.results : state.batch.results.filter((item) => item.status === kind);
  const text = results.map((item) => item.code).join("\n");

  if (!text) {
    showModal("info", t().labels.pending, t().messages.copyEmpty);
    return;
  }

  await copyToClipboard(text);
  showModal("success", t().labels.success, t().messages.copyDone);
}

async function fetchTask(taskId) {
  const raw = await apiJson(`/api/channel1/task/${encodeURIComponent(taskId)}`, {
    method: "GET",
  });
  return normalizeTaskResponse(raw);
}

function normalizeTaskResponse(raw) {
  const status = normalize(raw?.status).toLowerCase();
  const hasModernShape = status || typeof raw?.progress !== "undefined" || typeof raw?.error !== "undefined";

  if (hasModernShape) {
    const pending = !["finish", "cancel", "failed", "success"].includes(status);
    const error = normalize(raw?.error);
    const success = status === "finish" && !error;
    return {
      task_id: raw?.task_id || "",
      cdk: raw?.cdk || "",
      status: raw?.status || (pending ? "created" : success ? "finish" : "failed"),
      progress: clampProgress(raw?.progress),
      pending,
      success,
      error,
      message: error,
    };
  }

  const pending = Boolean(raw?.pending);
  const success = Boolean(raw?.success);
  const message = normalize(raw?.message);
  return {
    task_id: raw?.task_id || "",
    cdk: raw?.cdk || "",
    status: pending ? "pending" : success ? "finish" : "failed",
    progress: pending ? 50 : 100,
    pending,
    success,
    error: success ? "" : message,
    message,
  };
}

function renderTaskSummary(task) {
  return `
    <div class="task-summary">
      <div class="panel-topline">
        <div class="task-identity">
          <span class="metric-label">${escapeHtml(t().labels.taskId)}</span>
          <strong class="metric-value">${escapeHtml(task.task_id || "-")}</strong>
        </div>
        ${renderStatusBadge(taskStatusLabel(task), taskTone(task))}
      </div>
      <div class="info-grid">
        <div class="task-kv"><strong>${escapeHtml(t().labels.cdk)}</strong><span>${escapeHtml(task.cdk || "-")}</span></div>
        <div class="task-kv"><strong>${escapeHtml(t().labels.progress)}</strong><span>${escapeHtml(`${clampProgress(task.progress)}%`)}</span></div>
        <div class="task-kv task-kv--wide"><strong>${escapeHtml(t().labels.message)}</strong><span>${escapeHtml(task.message || task.error || "-")}</span></div>
      </div>
      <div class="task-progress"><span style="width: ${clampProgress(task.progress)}%"></span></div>
    </div>
  `;
}

function formatUserDetails(result) {
  const lines = [];
  const email = normalize(result?.email);
  if (email) {
    lines.push(`${t().labels.email}: ${email}`);
  }

  const user = normalize(result?.user);
  if (user && user !== email) {
    lines.push(`${t().labels.user}: ${user}`);
  }

  if (result?.has_sub) {
    lines.push(
      state.language === "vi"
        ? "Lưu ý: tài khoản đã có sub vẫn có thể redeem, nhưng thời gian có thể bị ghi đè."
        : state.language === "ur"
          ? "نوٹ: جس اکاؤنٹ پر پہلے سے سبسکرپشن ہے اسے بھی redeem کیا جا سکتا ہے، لیکن وقت اووررائٹ ہو سکتا ہے۔"
        : "Note: existing subscribers can still be redeemed, but the expiry may be overwritten."
    );
  }

  const extra = result?.extra && typeof result.extra === "object" ? result.extra : {};
  for (const [key, value] of Object.entries(extra)) {
    if (value == null || value === "") {
      continue;
    }

    if (key === "current_plan") {
      lines.push(`${t().labels.product}: ${String(value)}`);
      continue;
    }

    if (key === "token_expires") {
      lines.push(`${t().labels.tokenExpires}: ${String(value)}`);
      continue;
    }

    if (key === "channel" || key === "email" || key === "name") {
      continue;
    }

    lines.push(`${key}: ${String(value)}`);
  }

  return lines.length ? lines : [t().labels.ready];
}

function clearRedeem() {
  state.redeem = {
    channelMode: "channel1",
    cdkInput: "",
    authInput: "",
    verifiedCdk: null,
    verifiedUser: null,
    validatedChannel: "",
    validatedCdkValue: "",
    validatedAuthValue: "",
    cdkStatus: null,
    authStatus: null,
    cdkLoading: false,
    authLoading: false,
    redeeming: false,
    task: null,
    pollToken: 0,
  };
  render();
}

function clearTaskLookup() {
  state.taskLookup = {
    input: "",
    result: null,
    loading: false,
  };
  render();
}

function clearBatch() {
  state.batch = {
    input: "",
    results: [],
    loading: false,
    progress: 0,
    filter: "all",
    lastChannel: "channel1",
  };
  render();
}

function resetCdkValidation() {
  state.redeem.verifiedCdk = null;
  state.redeem.validatedChannel = "";
  state.redeem.validatedCdkValue = "";
  state.redeem.cdkStatus = null;
}

function resetAuthValidation() {
  state.redeem.verifiedUser = null;
  state.redeem.validatedAuthValue = "";
  state.redeem.authStatus = null;
}

function setRedeemChannel(channel) {
  const nextChannel = channel === "channel2" ? "channel2" : "channel1";
  if (state.redeem.channelMode === nextChannel) {
    return;
  }

  state.redeem.channelMode = nextChannel;
  resetCdkValidation();
  resetAuthValidation();
  render();
}

function prepareRedeemChannel(channel) {
  const nextChannel = channel === "channel2" ? "channel2" : "channel1";
  if (state.redeem.channelMode !== nextChannel) {
    state.redeem.channelMode = nextChannel;
    resetCdkValidation();
    resetAuthValidation();
  }
}

function getChannel2AuthPreview(raw = state.redeem.authInput) {
  try {
    return parseAuthSessionChannel2(raw.trim());
  } catch (_error) {
    return null;
  }
}

function getRedeemUserSnapshot() {
  if (state.redeem.channelMode === "channel2") {
    return getChannel2AuthPreview() || (state.redeem.validatedChannel === "channel2" ? state.redeem.verifiedUser : null);
  }

  return state.redeem.verifiedUser;
}

function filterBatchResults() {
  if (state.batch.filter === "all") {
    return state.batch.results;
  }
  return state.batch.results.filter((item) => item.status === state.batch.filter);
}

function getBatchStats() {
  const stats = {
    total: state.batch.results.length,
    used: 0,
    unused: 0,
    invalid: 0,
  };

  for (const item of state.batch.results) {
    if (item.status === "used") {
      stats.used += 1;
    } else if (item.status === "unused") {
      stats.unused += 1;
    } else {
      stats.invalid += 1;
    }
  }

  return stats;
}

function parseBatchCodes(input) {
  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseChannel2BatchCodes(input) {
  const seen = new Set();
  return String(input)
    .split(/[\r\n,]+/)
    .map((line) => line.trim().toUpperCase())
    .filter((code) => {
      if (!code || seen.has(code)) {
        return false;
      }
      seen.add(code);
      return true;
    });
}

function batchStatusLabel(status) {
  if (status === "used") {
    return t().labels.used;
  }
  if (status === "unused") {
    return t().labels.unused;
  }
  return t().labels.invalid;
}

function taskStatusLabel(task) {
  if (task.pending) {
    return t().labels.pending;
  }
  if (task.success) {
    return t().labels.success;
  }
  return t().labels.failure;
}

function taskTone(task) {
  if (task.pending) {
    return "warning";
  }
  if (task.success) {
    return "success";
  }
  return "danger";
}

function batchTone(status) {
  if (status === "used") {
    return "danger";
  }
  if (status === "unused") {
    return "success";
  }
  return "neutral";
}

function workspaceState() {
  if (state.redeem.redeeming) {
    return { label: t().labels.pending, tone: "warning" };
  }
  if (state.redeem.task && !state.redeem.task.pending) {
    return { label: taskStatusLabel(state.redeem.task), tone: taskTone(state.redeem.task) };
  }
  if (state.redeem.verifiedCdk && getRedeemUserSnapshot()) {
    return { label: t().labels.ready, tone: "success" };
  }
  return { label: t().labels.waiting, tone: "neutral" };
}

function taskMessageBlock(task) {
  return [
    `${t().labels.taskId}: ${task.task_id || "-"}`,
    `${t().labels.cdk}: ${task.cdk || "-"}`,
    `${t().labels.taskStatus}: ${taskStatusLabel(task)}`,
    `${t().labels.progress}: ${clampProgress(task.progress)}%`,
    `${t().labels.message}: ${task.message || task.error || "-"}`,
  ].join("\n");
}

function renderThemeIcon() {
  return state.theme === "dark"
    ? '<span aria-hidden="true">&#9790;</span>'
    : '<span aria-hidden="true">&#9728;</span>';
}

function renderStatusBadge(label, tone = "neutral") {
  return `<span class="status-badge tone-${escapeHtml(tone)}">${escapeHtml(label)}</span>`;
}

function statusSuccess(message) {
  return { type: "success", message };
}

function statusError(message) {
  return { type: "error", message };
}

function renderInlineStatus(status, loading, loadingLabel) {
  if (loading) {
    return `<span class="spinner"></span><span>${escapeHtml(loadingLabel)}</span>`;
  }

  if (!status) {
    return `<span>${escapeHtml(t().labels.waiting)}</span>`;
  }

  return `<span>${escapeHtml(status.message)}</span>`;
}

function statusClass(status) {
  return status ? status.type : "";
}

function statusColorClass(status) {
  if (!status) {
    return "status-info";
  }
  return status.type === "success" ? "status-success" : "status-error";
}

function showModal(type, title, message, onOk, options = {}) {
  state.modal = {
    type,
    title,
    message,
    okText: t().buttons.confirm,
    onOk,
    locked: Boolean(options.locked),
    fireworks: Boolean(options.fireworks),
  };
  renderModal();
}

function showLoadingModal(title, message) {
  showModal("loading", title, message, null, { locked: true });
}

function updateModalMessage(message, title = state.modal?.title) {
  if (!state.modal) {
    return;
  }

  state.modal.message = message;
  if (title) {
    state.modal.title = title;
  }
  renderModal();
}

function closeModal(force = false) {
  if (!force && state.modal?.locked) {
    return;
  }
  state.modal = null;
  renderModal();
}

function renderModal() {
  if (!state.modal) {
    modalRoot.className = "modal-root";
    modalRoot.innerHTML = "";
    return;
  }

  const icon =
    state.modal.type === "success"
      ? "&#10003;"
      : state.modal.type === "error"
        ? "!"
        : state.modal.type === "loading"
          ? ""
          : "i";
  const iconMarkup =
    state.modal.type === "loading"
      ? `<div class="modal-spinner" aria-hidden="true"></div>`
      : icon;
  modalRoot.className = "modal-root is-open";
  modalRoot.innerHTML = `
    <div class="modal-card modal-card--${escapeHtml(state.modal.type)}">
      ${state.modal.fireworks ? renderFireworksMarkup() : ""}
      <div class="modal-icon ${escapeHtml(state.modal.type)}">${iconMarkup}</div>
      <h3 class="modal-title">${escapeHtml(state.modal.title)}</h3>
      <div class="modal-message"><pre>${escapeHtml(state.modal.message)}</pre></div>
      ${
        state.modal.locked
          ? ""
          : `
            <div class="modal-actions">
              <button type="button" class="button-primary" data-action="close-modal">
                ${escapeHtml(state.modal.okText)}
              </button>
            </div>
          `
      }
    </div>
  `;
}

function renderFireworksMarkup() {
  const sparks = [
    { x: "12%", y: "18%", hue: "192deg", delay: "0s" },
    { x: "26%", y: "8%", hue: "168deg", delay: "0.12s" },
    { x: "48%", y: "14%", hue: "210deg", delay: "0.24s" },
    { x: "72%", y: "10%", hue: "156deg", delay: "0.08s" },
    { x: "88%", y: "20%", hue: "196deg", delay: "0.18s" },
    { x: "18%", y: "64%", hue: "176deg", delay: "0.28s" },
    { x: "82%", y: "62%", hue: "204deg", delay: "0.16s" },
  ];

  return `
    <div class="fireworks" aria-hidden="true">
      ${sparks
        .map(
          (spark) => `
            <span
              class="firework"
              style="--firework-x:${spark.x}; --firework-y:${spark.y}; --firework-hue:${spark.hue}; --firework-delay:${spark.delay};"
            ></span>
          `
        )
        .join("")}
    </div>
  `;
}

function isValidRoute() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/redeem/chatgpt";
}

function applyTheme() {
  document.body.classList.remove("dark", "purple", "light");
  document.body.classList.add(state.theme);
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ur" ? "rtl" : "ltr";
}

function getStoredLanguage() {
  const stored = localStorage.getItem(STORAGE_LANGUAGE_KEY);
  if (LANGUAGE_ORDER.includes(stored)) {
    return stored;
  }
  if (stored === "zh") {
    return "vi";
  }
  const preferred = navigator.language.toLowerCase();
  if (preferred.startsWith("vi")) {
    return "vi";
  }
  if (preferred.startsWith("ur")) {
    return "ur";
  }
  return "en";
}

function getStoredTheme() {
  const stored = localStorage.getItem(STORAGE_THEME_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  if (stored === "purple") {
    return "dark";
  }
  return "light";
}

function t() {
  return translations[state.language];
}

function getNextLanguage(currentLanguage) {
  const index = LANGUAGE_ORDER.indexOf(currentLanguage);
  return LANGUAGE_ORDER[(index + 1 + LANGUAGE_ORDER.length) % LANGUAGE_ORDER.length];
}

function languageBadge(language) {
  switch (language) {
    case "vi":
      return "VI";
    case "ur":
      return "UR";
    default:
      return "EN";
  }
}

async function apiJson(path, options) {
  const headers = new Headers(options?.headers || {});
  if (options?.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(raw || `HTTP ${response.status}`);
  }

  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

async function apiText(path, options) {
  const headers = new Headers(options?.headers || {});
  if (options?.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(raw || `HTTP ${response.status}`);
  }

  return raw;
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function clampProgress(value) {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(number)));
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function normalize(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseLooseJsonValue(raw) {
  if (!normalize(raw)) {
    return null;
  }

  const source = String(raw)
    .replaceAll("\u201c", '"')
    .replaceAll("\u201d", '"')
    .replaceAll("\u2018", "'")
    .replaceAll("\u2019", "'")
    .replaceAll("\ufeff", "")
    .trim();

  const candidates = [source];
  const firstBrace = source.indexOf("{");
  const lastBrace = source.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(source.slice(firstBrace, lastBrace + 1));
  }
  if (!source.startsWith("{") && source.includes('"user"')) {
    candidates.push(`{${source.replace(/^[,\s]+/, "")}}`);
  }

  for (const candidate of candidates) {
    let parsed = candidate;

    for (let attempts = 0; attempts < 4; attempts += 1) {
      if (typeof parsed !== "string") {
        break;
      }

      const trimmed = parsed.trim();
      if (!trimmed) {
        break;
      }

      try {
        parsed = JSON.parse(trimmed);
      } catch (_error) {
        break;
      }
    }

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  }

  return null;
}

function extractEmailFromRaw(raw) {
  const text = normalize(raw);
  if (!text) {
    return "";
  }

  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? normalize(match[0]) : "";
}

function getAuthSessionPlanType(raw) {
  const parsed = parseLooseJsonValue(raw);
  if (!parsed) {
    return "";
  }

  const accountObject = parsed.account && typeof parsed.account === "object" ? parsed.account : {};
  return normalize(accountObject.planType || parsed.planType || parsed.current_plan).toLowerCase();
}

function normalizeError(error, fallback) {
  const message = error instanceof Error && normalize(error.message) ? error.message.trim() : "";
  return sanitizeChannel2ErrorMessage(message, fallback);
}

function sanitizeChannel2ErrorMessage(message, fallback) {
  const raw = normalize(message);
  if (!raw) {
    return fallback;
  }

  const lowered = raw.toLowerCase();
  if (
    lowered.includes("<html") ||
    lowered.includes("<!doctype html") ||
    lowered.includes("__cf_chl_") ||
    lowered.includes("cf_chl_") ||
    lowered.includes("challenge-platform") ||
    lowered.includes("attention required") ||
    lowered.includes("cloudflare challenge") ||
    lowered.includes("upstream blocked by cloudflare") ||
    lowered.includes("channel2_upstream_blocked")
  ) {
    return t().messages.channel2Unavailable || fallback;
  }

  return raw;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

function channelLabel(channel) {
  return channel === "channel2" ? t().labels.channel2 : t().labels.channel1;
}

function decodeLooseText(text) {
  return normalize(text);
}

function normalizeVerifiedCdk(result, code, channel = "channel1") {
  if (channel === "channel2") {
    const product = [normalize(result?.plan), normalize(result?.term)].filter(Boolean).join(" / ");
    return {
      code,
      channel,
      app_name: normalize(result?.service) || "chatgpt",
      app_product_name: product || PRODUCT_ID,
      raw: result,
    };
  }

  return {
    code: normalize(result?.code) || code,
    channel,
    app_name: normalize(result?.app_name) || "Nitro",
    app_product_name: normalize(result?.app_product_name) || PRODUCT_ID,
    raw: result,
  };
}

function parseAuthSessionChannel2(raw) {
  if (!normalize(raw)) {
    throw new Error(t().messages.authRequired);
  }

  const parsed = parseLooseJsonValue(raw);
  const emailFromRaw = extractEmailFromRaw(raw);

  if (!parsed || typeof parsed !== "object") {
    if (!emailFromRaw) {
      throw new Error(t().messages.authParseFailed);
    }

    const extra = {
      channel: channelLabel("channel2"),
      email: emailFromRaw,
    };

    return {
      verified: true,
      user: emailFromRaw,
      email: emailFromRaw,
      name: "",
      has_sub: false,
      extra,
    };
  }

  const userObject = parsed.user && typeof parsed.user === "object" ? parsed.user : {};
  const accountObject = parsed.account && typeof parsed.account === "object" ? parsed.account : {};
  const account = normalize(userObject.email) || normalize(parsed.email) || emailFromRaw;
  const name = normalize(userObject.name) || normalize(parsed.name);
  const structure = normalize(accountObject.structure).toLowerCase();
  const currentPlan = normalize(accountObject.planType) || "free";
  const expires = normalize(parsed.expires);

  if (structure === "workspace") {
    throw new Error(t().messages.authInvalid);
  }

  if (!account || !account.includes("@")) {
    throw new Error(t().messages.authEmailMissing);
  }

  const extra = {
    channel: channelLabel("channel2"),
    email: account,
  };

  if (name) {
    extra.name = name;
  }

  if (currentPlan) {
    extra.current_plan = currentPlan;
  }

  if (expires) {
    extra.token_expires = expires;
  }

  return {
    verified: true,
    user: account,
    email: account,
    name,
    has_sub: currentPlan !== "free" || Boolean(parsed.account_ordering),
    extra,
  };
}

function normalizeChannel2Activation(raw, code) {
  const status = normalize(raw?.status).toLowerCase();
  const pending = status !== "activated" && status !== "error";
  const success = status === "activated";
  const message = normalize(raw?.message) || normalize(raw?.error) || status || t().labels.pending;

  return {
    task_id: code,
    cdk: normalize(raw?.code) || code,
    status: status || "activating",
    progress: success ? 100 : pending ? 65 : 100,
    pending,
    success,
    error: success ? "" : message,
    message,
    activated_email: normalize(raw?.activated_email),
    name: normalize(raw?.name),
    service: normalize(raw?.service),
    plan: normalize(raw?.plan),
    term: normalize(raw?.term),
    expires: normalize(raw?.expires),
  };
}

function normalizeChannel2BulkStatus(status) {
  const normalized = normalize(status).toLowerCase();

  if (normalized === "available") {
    return "unused";
  }

  if (normalized === "activated" || normalized === "used" || normalized === "error") {
    return "used";
  }

  return "invalid";
}

function normalizeChannel2SingleStatus(status) {
  const normalized = normalize(status).toLowerCase();

  if (normalized === "available") {
    return "unused";
  }

  if (normalized === "activated" || normalized === "used" || normalized === "error") {
    return "used";
  }

  return "invalid";
}

function buildChannel2BatchResults(codes, payload) {
  const foundList = Array.isArray(payload?.found) ? payload.found : [];
  const notFoundList = Array.isArray(payload?.not_found) ? payload.not_found : [];
  const foundMap = new Map();

  foundList.forEach((item) => {
    const code = normalize(item?.code).toUpperCase();
    if (!code) {
      return;
    }

    foundMap.set(code, {
      code,
      status: normalizeChannel2BulkStatus(item?.status),
      user: normalize(item?.activated_email || item?.email || item?.user),
      redeem_time: normalize(item?.activated_at || item?.subscription_ends_at),
      app_name: normalize(item?.service) || "chatgpt",
      product_name: [normalize(item?.plan), normalize(item?.term)].filter(Boolean).join(" / "),
      status_raw: normalize(item?.status) || "unknown",
    });
  });

  notFoundList.forEach((value) => {
    const code = normalize(value).toUpperCase();
    if (!code || foundMap.has(code)) {
      return;
    }

    foundMap.set(code, {
      code,
      status: "invalid",
      user: "",
      redeem_time: "",
      app_name: "",
      product_name: "",
      status_raw: "not_found",
    });
  });

  return codes.map((code) =>
    foundMap.get(code) || {
      code,
      status: "invalid",
      user: "",
      redeem_time: "",
      app_name: "",
      product_name: "",
      status_raw: "not_found",
    }
  );
}

async function apiChannel2Json(path, options = {}) {
  const endpoint = buildChannel2ProxyPath(path);
  const headers = new Headers(options.headers || {});
  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!endpoint) {
    throw new Error(t().messages.channel2Unavailable);
  }

  const response = await fetch(endpoint, {
    cache: "no-store",
    ...options,
    headers,
  });
  const raw = await response.text();

  let parsed = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch (_error) {
      if (!response.ok) {
        throw new Error(sanitizeChannel2ErrorMessage(raw, t().messages.channel2Unavailable));
      }
      throw new Error(t().messages.channel2Unavailable);
    }
  }

  if (!response.ok) {
    const message = parsed && typeof parsed === "object"
      ? decodeLooseText(parsed.error || parsed.message || parsed.code)
      : decodeLooseText(raw);
    throw new Error(sanitizeChannel2ErrorMessage(message, t().messages.channel2Unavailable));
  }

  return parsed;
}

function buildChannel2ProxyPath(path) {
  const rawPath = normalize(path);
  if (!rawPath) {
    return "";
  }

  if (rawPath === CHANNEL2_ENDPOINTS.activateSession) {
    return "/api/channel2/redeem";
  }

  if (rawPath === CHANNEL2_ENDPOINTS.bulkStatus) {
    return "/api/channel2/bulk-status";
  }

  const activationMatch = rawPath.match(/^\/keys\/([^/]+)\/activation$/i);
  if (activationMatch) {
    return `/api/channel2/activation/${activationMatch[1]}`;
  }

  const checkMatch = rawPath.match(/^\/keys\/([^/]+)$/i);
  if (checkMatch) {
    return `/api/channel2/check-cdk/${checkMatch[1]}`;
  }

  return "";
}

async function checkChannel2Cdk(code) {
  const result = await apiChannel2Json(CHANNEL2_ENDPOINTS.checkCdk(code), {
    method: "GET",
  });

  const normalizedStatus = normalizeChannel2SingleStatus(result?.status);
  const service = normalize(result?.service).toLowerCase();

  if (normalizedStatus === "used") {
    throw new Error(t().messages.cdkUsed);
  }

  if (normalizedStatus === "invalid") {
    throw new Error(t().messages.cdkInvalid);
  }

  if (service && service !== PRODUCT_ID) {
    throw new Error(t().messages.cdkInvalid);
  }

  if (normalize(result?.error)) {
    throw new Error(decodeLooseText(result.error) || t().messages.cdkInvalid);
  }

  return result;
}

async function startRedeemChannel2() {
  const cdk = normalize(state.redeem.cdkInput);
  const authRaw = state.redeem.authInput.trim();

  if (!cdk) {
    state.redeem.cdkStatus = statusError(t().messages.cdkRequired);
    render();
    showModal("error", t().labels.failure, t().messages.cdkRequired);
    return;
  }

  if (!authRaw) {
    state.redeem.authStatus = statusError(t().messages.authRequired);
    render();
    showModal("error", t().labels.failure, t().messages.authRequired);
    return;
  }

  const cdkOk =
    state.redeem.validatedChannel === "channel2" && state.redeem.validatedCdkValue === cdk
      ? true
      : await validateCdk({ silent: true, channel: "channel2" });

  if (!cdkOk) {
    showModal("error", t().labels.failure, t().messages.cdkInvalid);
    return;
  }

  let verifiedUser;
  try {
    verifiedUser = parseAuthSessionChannel2(authRaw);
  } catch (error) {
    resetAuthValidation();
    state.redeem.authStatus = statusError(t().messages.authParseFailed);
    render();
    showModal("error", t().labels.failure, normalizeError(error, t().messages.authParseFailed));
    return;
  }

  state.redeem.verifiedUser = verifiedUser;
  state.redeem.validatedAuthValue = authRaw;
  state.redeem.authStatus = statusSuccess(`${t().labels.email}: ${verifiedUser.email}`);
  state.redeem.validatedChannel = "channel2";
  render();

  const channel2Plan = normalize(state.redeem.verifiedCdk?.raw?.plan);
  const channel2Term = normalize(state.redeem.verifiedCdk?.raw?.term);
  const confirmLines = [
    channelLabel("channel2"),
    `${t().labels.email}: ${verifiedUser.email}`,
    verifiedUser.name ? `${t().labels.user}: ${verifiedUser.name}` : "",
    `${state.language === "vi" ? "Gói hiện tại" : state.language === "ur" ? "موجودہ پلان" : "Current Plan"}: ${normalize(verifiedUser?.extra?.current_plan) || "free"}`,
    `${t().labels.cdk}: ${cdk}`,
    `${state.language === "vi" ? "Dịch vụ" : state.language === "ur" ? "سروس" : "Service"}: ${state.redeem.verifiedCdk?.app_name || "chatgpt"}`,
    `${state.language === "vi" ? "Gói kích hoạt" : state.language === "ur" ? "ایکٹیویشن پلان" : "Activation Plan"}: ${channel2Plan || "-"}`,
    `${state.language === "vi" ? "Thời hạn gói" : state.language === "ur" ? "مدت" : "Term"}: ${channel2Term || "-"}`,
    `${t().labels.tokenExpires}: ${normalize(verifiedUser?.extra?.token_expires) || "-"}`,
    state.language === "vi"
      ? "Nhấn OK để bắt đầu kích hoạt."
      : state.language === "ur"
        ? "ایکٹیویشن شروع کرنے کے لیے OK دبائیں۔"
        : "Press OK to start activation.",
  ];

  showModal(
    "info",
    state.language === "vi" ? "Xác nhận tài khoản đích" : state.language === "ur" ? "ہدف اکاؤنٹ کی تصدیق" : "Confirm Target Account",
    confirmLines.filter(Boolean).join("\n\n"),
    () => {
      void beginChannel2Activation({ cdk, authRaw, verifiedUser });
    }
  );
}

async function beginChannel2Activation({ cdk, authRaw, verifiedUser }) {
  if (state.redeem.redeeming) {
    return;
  }

  state.redeem.redeeming = true;
  render();

  showLoadingModal(
    t().labels.redeeming,
    [
      channelLabel("channel2"),
      `${t().labels.email}: ${verifiedUser.email}`,
      t().labels.redeeming,
    ].join("\n\n")
  );

  try {
    const result = await apiChannel2Json(CHANNEL2_ENDPOINTS.activateSession, {
      method: "POST",
      body: JSON.stringify({
        code: cdk,
        session: authRaw,
      }),
    });

    const initialStatus = normalize(result?.status).toLowerCase();

    if (normalize(result?.error)) {
      throw new Error(decodeLooseText(result.error) || t().messages.channel2Failed);
    }

    if (initialStatus === "error") {
      throw new Error(decodeLooseText(result?.message) || t().messages.channel2Failed);
    }

    state.redeem.task = normalizeChannel2Activation(
      {
        ...result,
        code: result?.code || cdk,
        status: initialStatus || "activating",
        activated_email: verifiedUser.email,
        name: verifiedUser.name,
        service: state.redeem.verifiedCdk?.app_name,
        plan: state.redeem.verifiedCdk?.raw?.plan,
        term: state.redeem.verifiedCdk?.raw?.term,
      },
      cdk
    );
    render();

    if (initialStatus === "activated") {
      state.redeem.redeeming = false;
      render();
      showModal(
        "success",
        t().labels.success,
        [
          channelLabel("channel2"),
          `${t().labels.email}: ${state.redeem.task.activated_email || verifiedUser.email}`,
          state.redeem.task.name ? `${t().labels.user}: ${state.redeem.task.name}` : "",
          state.redeem.task.service ? `${t().labels.app}: ${state.redeem.task.service}` : "",
          state.redeem.task.plan || state.redeem.task.term
            ? `${t().labels.product}: ${[state.redeem.task.plan, state.redeem.task.term].filter(Boolean).join(" / ")}`
            : "",
          t().messages.channel2Success,
        ]
          .filter(Boolean)
          .join("\n\n"),
        null,
        { fireworks: true }
      );
      return;
    }

    updateModalMessage(
      [
        channelLabel("channel2"),
        `${t().labels.email}: ${verifiedUser.email}`,
        `${t().labels.taskStatus}: ${t().labels.pending}`,
        `${t().labels.progress}: 65%`,
      ].join("\n\n"),
      t().labels.redeeming
    );

    await pollChannel2Activation(cdk, verifiedUser);
  } catch (error) {
    state.redeem.redeeming = false;
    render();
    showModal("error", t().labels.failure, normalizeError(error, t().messages.channel2Failed));
  }
}

async function pollChannel2Activation(code, verifiedUser) {
  while (state.redeem.redeeming && state.redeem.validatedChannel === "channel2") {
    let activation;

    try {
      const raw = await apiChannel2Json(CHANNEL2_ENDPOINTS.activation(code), {
        method: "GET",
      });
      activation = normalizeChannel2Activation(raw, code);
    } catch (_error) {
      await delay(CHANNEL2_POLL_INTERVAL_MS);
      continue;
    }

    state.redeem.task = activation;
    render();

    const messageLines = [
      channelLabel("channel2"),
      `${t().labels.email}: ${activation.activated_email || verifiedUser.email}`,
      `${t().labels.taskStatus}: ${activation.success ? t().labels.success : activation.pending ? t().labels.pending : t().labels.failure}`,
      `${t().labels.progress}: ${clampProgress(activation.progress)}%`,
      `${t().labels.message}: ${activation.message || "-"}`,
    ];

    if (activation.plan || activation.term) {
      messageLines.push(
        `${t().labels.product}: ${[activation.plan, activation.term].filter(Boolean).join(" / ") || "-"}`
      );
    }

    updateModalMessage(messageLines.join("\n\n"), t().labels.redeeming);

    if (activation.pending) {
      await delay(CHANNEL2_POLL_INTERVAL_MS);
      continue;
    }

    state.redeem.redeeming = false;
    render();

    if (activation.success) {
      const details = [
        channelLabel("channel2"),
        `${t().labels.email}: ${activation.activated_email || verifiedUser.email}`,
      ];

      if (activation.name) {
        details.push(`${t().labels.user}: ${activation.name}`);
      }

      if (activation.service) {
        details.push(`${t().labels.app}: ${activation.service}`);
      }

      if (activation.plan || activation.term) {
        details.push(`${t().labels.product}: ${[activation.plan, activation.term].filter(Boolean).join(" / ")}`);
      }

      details.push(t().messages.channel2Success);

      showModal("success", t().labels.success, details.join("\n\n"), null, {
        fireworks: true,
      });
    } else {
      showModal(
        "error",
        t().labels.failure,
        [
          channelLabel("channel2"),
          `${t().labels.email}: ${activation.activated_email || verifiedUser.email}`,
          activation.message || t().messages.channel2Failed,
        ].join("\n\n")
      );
    }
    return;
  }
}

