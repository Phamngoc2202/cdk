const API_BASE = "https://receipt-api.nitro.xin";
const PRODUCT_ID = "chatgpt";
const POLL_INTERVAL_MS = 3000;
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
    },
    notes: {
      auth: "Dán nguyên JSON từ AuthSession để kiểm tra tài khoản trước khi redeem.",
      polling: "Sau khi gửi redeem, hệ thống sẽ tự cập nhật trạng thái task.",
      batch: "Nhập nhiều CDK, mỗi dòng một mã để tra cứu nhanh.",
      channel1: "Kênh 1 có bước kiểm tra AuthSession bằng API trước khi redeem.",
      channel2: "Kênh 2 không có bước check tài khoản riêng, nút redeem sẽ gửi trực tiếp AuthSession JSON.",
      channel2Email: "Kênh 2 không có bước check tài khoản. Hệ thống chỉ đọc email từ AuthSession JSON trước khi redeem.",
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
    },
    notes: {
      auth: "Paste the full AuthSession JSON to verify the account before redeeming.",
      polling: "After redeem starts, the page will keep updating the task status automatically.",
      batch: "Enter multiple CDKs, one code per line, for quick lookup.",
      channel1: "Channel 1 verifies AuthSession through API before redeeming.",
      channel2: "Channel 2 has no separate account-check API. Redeem will send the raw AuthSession JSON directly.",
      channel2Email: "Channel 2 does not verify the account by API. It only reads the email from the AuthSession JSON before redeeming.",
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
    },
    notes: {
      auth: "Redeem سے پہلے اکاؤنٹ چیک کرنے کے لیے مکمل AuthSession JSON پیسٹ کریں۔",
      polling: "Redeem شروع ہونے کے بعد صفحہ خودکار طور پر ٹاسک کی حالت اپڈیٹ کرے گا۔",
      batch: "جلدی تلاش کے لیے کئی CDK درج کریں، ہر لائن میں ایک کوڈ۔",
      channel1: "چینل 1 میں redeem سے پہلے API کے ذریعے AuthSession چیک ہوتا ہے۔",
      channel2: "چینل 2 میں الگ اکاؤنٹ چیک API نہیں ہے، redeem براہ راست AuthSession JSON بھیجے گا۔",
      channel2Email: "چینل 2 میں اکاؤنٹ چیک API نہیں ہے، redeem سے پہلے صرف AuthSession JSON سے email پڑھا جائے گا۔",
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
      validateCdk({ channel: "channel1" });
      break;
    case "validate-cdk-channel2":
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
    render();
    return;
  }

  if (target.matches("[data-model='redeem-auth']")) {
    state.redeem.authInput = target.value;
    if (target.value.trim() !== state.redeem.validatedAuthValue) {
      resetAuthValidation();
    }
    render();
    return;
  }

  if (target.matches("[data-model='task-lookup']")) {
    state.taskLookup.input = target.value;
    render();
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

function primePointerGlow() {
  document.documentElement.style.setProperty("--pointer-x", `${Math.round(window.innerWidth * 0.72)}px`);
  document.documentElement.style.setProperty("--pointer-y", `${Math.round(window.innerHeight * 0.22)}px`);
}

function render() {
  document.title = t().pageTitle;

  if (!isValidRoute()) {
    app.innerHTML = `
      <div class="anime-shell">
        <div class="manga-rays"></div>
        <div class="ink-cloud ink-cloud-a"></div>
        <div class="ink-cloud ink-cloud-b"></div>
        <div class="anime-container">
          <div class="panel-frame not-found">
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
    <div class="anime-shell">
      <div class="manga-rays"></div>
      <div class="ink-cloud ink-cloud-a"></div>
      <div class="ink-cloud ink-cloud-b"></div>
      <div class="dot-screen"></div>
      <div class="anime-container">
        <header class="hero-stage panel-frame">
          <div class="hero-main">
            <div class="hero-topline">
              <div class="hero-stamps">
                <span class="stamp-badge">${escapeHtml(t().redeemTitle)}</span>
                <span class="stamp-badge stamp-badge--accent">${escapeHtml(t().guideTitle)}</span>
              </div>
              <div class="control-deck">
                <button type="button" class="lang-toggle" data-action="toggle-language" title="Language">
                  ${escapeHtml(languageBadge(state.language))}
                </button>
                <button type="button" class="icon-toggle" data-action="toggle-theme" title="Theme">
                  ${renderThemeIcon()}
                </button>
              </div>
            </div>
            <div class="hero-title-wrap">
              <p class="hero-kicker">${escapeHtml(t().queryTitle)}</p>
              <h1 class="hero-title">${escapeHtml(t().pageTitle)}</h1>
              <p class="hero-subtitle">${escapeHtml(t().pageSubtitle)}</p>
            </div>
            <div class="hero-actions">
              <button type="button" class="button-primary" data-action="open-url" data-url="https://chatgpt.com/">
                ${escapeHtml(t().buttons.openChatGPT)}
              </button>
              <button type="button" class="button-secondary" data-action="open-url" data-url="https://chatgpt.com/api/auth/session">
                ${escapeHtml(t().buttons.openAuthSession)}
              </button>
            </div>
          </div>
        </header>

        <main class="story-board">
          <aside class="mission-column">
            <section class="panel-frame mission-panel">
              <div class="panel-head">
                <div>
                  <p class="panel-ribbon">${escapeHtml(t().guideTitle)}</p>
                  <h2 class="panel-title">${escapeHtml(t().buttons.redeem)}</h2>
                  <p class="panel-copy">${escapeHtml(t().notes.auth)}</p>
                </div>
              </div>
              <div class="guide-list">${renderGuideItems()}</div>
            </section>

            <section class="panel-frame radar-panel">
              <div class="panel-head">
                <div>
                  <p class="panel-ribbon">${escapeHtml(t().labels.currentTask)}</p>
                  <h2 class="panel-title">${escapeHtml(workspaceState().label)}</h2>
                  <p class="panel-copy">${escapeHtml(t().messages.footer)}</p>
                </div>
              </div>
              <div class="radar-list">
                ${renderLivePanel()}
              </div>
            </section>
          </aside>

          <section class="battle-column">
            <section class="panel-frame command-stage command-stage--main">
              <div class="panel-head">
                <div>
                  <p class="panel-ribbon">${escapeHtml(t().redeemTitle)}</p>
                  <h2 class="panel-title">${escapeHtml(t().pageTitle)}</h2>
                  <p class="panel-copy">${escapeHtml(t().notes.auth)}</p>
                </div>
              </div>
              ${renderRedeemSection()}
            </section>

            <div class="duel-grid">
              <section class="panel-frame command-stage">
                <div class="panel-head">
                  <div>
                    <p class="panel-ribbon">${escapeHtml(t().taskTitle)}</p>
                    <h2 class="panel-title">${escapeHtml(t().labels.currentTask)}</h2>
                    <p class="panel-copy">${escapeHtml(t().notes.polling)}</p>
                  </div>
                </div>
                ${renderTaskLookupSection()}
              </section>

              <section class="panel-frame command-stage">
                <div class="panel-head">
                  <div>
                    <p class="panel-ribbon">${escapeHtml(t().queryTitle)}</p>
                    <h2 class="panel-title">${escapeHtml(t().labels.total)}</h2>
                    <p class="panel-copy">${escapeHtml(t().notes.batch)}</p>
                  </div>
                </div>
                ${renderBatchSection()}
              </section>
            </div>
          </section>
        </main>

        <footer class="credit-strip panel-frame">
          <div class="credit-copy">
            <p class="credit-line">${escapeHtml(t().messages.footer)}</p>
            ${renderStatusBadge(workspaceState().label, workspaceState().tone)}
          </div>
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
        <article class="guide-episode tone-${escapeHtml(item.accent)}">
          <span class="episode-index">Scene ${String(index + 1).padStart(2, "0")}</span>
          <div class="episode-copy">
            <h3 class="episode-title">${escapeHtml(item.title)}</h3>
            <p class="episode-note">${escapeHtml(item.description)}</p>
          </div>
        </article>
      `
    )
    .join("");
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
  const activeUserDetails = isChannel2 ? channel2PreviewUser : state.redeem.verifiedUser;
  const authStatus = isChannel2
    ? channel2PreviewUser
      ? statusSuccess(`${t().labels.email}: ${channel2PreviewUser.email}`)
      : state.redeem.authInput.trim()
        ? statusError(t().messages.authEmailMissing)
        : null
    : state.redeem.authStatus;

  return `
    <div class="command-grid">
      <article class="command-card">
        <div class="command-head">
          <span class="step-seal">01</span>
          <div>
            <div class="command-title">${escapeHtml(t().labels.cdk)}</div>
            <div class="command-note">${escapeHtml(t().buttons.validateCdk)}</div>
          </div>
        </div>
        <div class="field-group">
          <div class="channel-switch">
            <button
              type="button"
              class="channel-chip ${activeChannel === "channel1" ? "is-active" : ""}"
              data-action="set-redeem-channel"
              data-channel="channel1"
              ${state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(t().labels.channel1)}
            </button>
            <button
              type="button"
              class="channel-chip ${activeChannel === "channel2" ? "is-active" : ""}"
              data-action="set-redeem-channel"
              data-channel="channel2"
              ${state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(t().labels.channel2)}
            </button>
          </div>
          <div class="command-actions">
            <input
              class="input-field ${statusClass(state.redeem.cdkStatus)}"
              data-model="redeem-cdk"
              value="${escapeAttribute(state.redeem.cdkInput)}"
              placeholder="XXXXXXXXXXXXX / XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              ${state.redeem.redeeming ? "disabled" : ""}
            />
            <button
              type="button"
              class="${isChannel2 ? "button-secondary" : "button-link"}"
              data-action="${isChannel2 ? "validate-cdk-channel2" : "validate-cdk"}"
              ${state.redeem.cdkLoading || state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(
                state.redeem.cdkLoading && state.redeem.validatedChannel === activeChannel
                  ? t().labels.checking
                  : isChannel2
                    ? t().buttons.validateCdkCh2
                    : t().buttons.validateCdkCh1
              )}
            </button>
          </div>
          <div class="helper-text">${escapeHtml(isChannel2 ? t().notes.channel2 : t().notes.channel1)}</div>
          <div class="status-inline ${statusColorClass(state.redeem.cdkStatus)}">
            ${renderInlineStatus(state.redeem.cdkStatus, state.redeem.cdkLoading, t().labels.checking)}
          </div>
        </div>
      </article>

      <article class="command-card">
        <div class="command-head">
          <span class="step-seal">02</span>
          <div>
            <div class="command-title">${escapeHtml(t().labels.authSession)}</div>
            <div class="command-note">${escapeHtml(isChannel2 ? t().labels.email : t().buttons.validateAuth)}</div>
          </div>
        </div>
        <div class="field-group">
          <textarea
            class="input-field token-field ${statusClass(authStatus)}"
            data-model="redeem-auth"
            placeholder='{"user":{"id":"user-..."},"expires":"..."}'
            ${state.redeem.redeeming ? "disabled" : ""}
          >${escapeHtml(state.redeem.authInput)}</textarea>
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
        </div>
      </article>
    </div>

    ${renderVerifiedPanels(activeUserDetails)}

    <section class="launch-panel">
      <div class="launch-copy">
        <span class="panel-ribbon">${escapeHtml(t().buttons.redeem)}</span>
        <h3>${escapeHtml(launchReady ? t().labels.ready : t().labels.waiting)}</h3>
        <p>${escapeHtml(t().notes.polling)}</p>
      </div>
      <div class="task-actions">
        <button
          type="button"
          class="button-primary button-primary--large launch-button ${isChannel2 ? "launch-button--channel2" : ""}"
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
      </div>
    </section>
  `;
}

function renderVerifiedPanels(activeUser = state.redeem.verifiedUser) {
  const blocks = [];

  if (state.redeem.verifiedCdk) {
    blocks.push(`
      <section class="intel-card">
        <div class="intel-topline">
          <h3>${escapeHtml(t().labels.product)}</h3>
          ${renderStatusBadge(t().labels.ready, "success")}
        </div>
        <div class="info-grid">
          <div class="task-kv"><strong>${escapeHtml(t().labels.cdk)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.code || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.app)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.app_name || "-")}</span></div>
          <div class="task-kv"><strong>${escapeHtml(t().labels.product)}</strong><span>${escapeHtml(state.redeem.verifiedCdk.app_product_name || "-")}</span></div>
        </div>
      </section>
    `);
  }

  if (activeUser) {
    blocks.push(`
      <section class="intel-card">
        <div class="intel-topline">
          <h3>${escapeHtml(t().labels.user)}</h3>
          ${renderStatusBadge(t().labels.ready, "success")}
        </div>
        <ul class="verified-list">
          ${formatUserDetails(activeUser)
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("")}
        </ul>
      </section>
    `);
  }

  if (state.redeem.task) {
    blocks.push(`
      <section class="intel-card">
        <div class="intel-topline">
          <h3>${escapeHtml(t().labels.currentTask)}</h3>
          ${renderStatusBadge(taskStatusLabel(state.redeem.task), taskTone(state.redeem.task))}
        </div>
        ${renderTaskSummary(state.redeem.task)}
        <div class="helper-text">${escapeHtml(t().notes.polling)}</div>
      </section>
    `);
  }

  return blocks.length ? `<div class="intel-grid">${blocks.join("")}</div>` : "";
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
      class="filter-tab ${active ? "is-active" : ""}"
      data-action="set-batch-filter"
      data-filter="${escapeHtml(filter)}"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

function renderBatchItem(item) {
  return `
    <article class="usage-card">
      <div class="intel-topline">
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
        <div class="radar-row">
          <span class="radar-label">${escapeHtml(item.label)}</span>
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
        : await apiJson("/cdks/public/check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Product-ID": PRODUCT_ID,
            },
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
    const result = await apiJson("/external/public/check-user", {
      method: "POST",
      headers: {
        "X-Product-ID": PRODUCT_ID,
      },
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

  showLoadingModal(t().labels.redeeming, `${channelLabel(channel)}\n${t().labels.checking}`);

  if (channel === "channel2") {
    await startRedeemChannel2();
    return;
  }

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
    const endpoint = cdk.startsWith("R_") ? "/aftersale/public/redeem" : "/stocks/public/outstock";

    const taskId = await apiText(endpoint, {
      method: "POST",
      headers: {
        "X-Device-Id": "web",
      },
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
  const codes = parseBatchCodes(state.batch.input);
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
      const results = await apiChannel2Json("/api/channel2/cdks", {
        method: "POST",
        body: JSON.stringify(codes),
      });

      if (results.code !== 1) {
        throw new Error(decodeLooseText(results.message) || t().messages.taskFailed);
      }

      state.batch.results = Array.isArray(results.data)
        ? results.data.map((item) => ({
            code: item.cdk || item.carmi || "",
            status: normalizeChannel2BatchStatus(item.useStatus),
            user: item.account || "",
            redeem_time: item.usedAt || "",
            app_name: t().labels.channel2,
            product_name: PRODUCT_ID,
          }))
        : [];
    } else {
      const results = await apiJson("/cdks/public/check-usage2", {
        method: "POST",
        body: codes.map(encodeURIComponent).join("\n"),
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
  } catch (_error) {
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
  const raw = await apiJson(`/stocks/public/outstock/${encodeURIComponent(taskId)}`, {
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
  document.body.classList.remove("dark", "light");
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
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
  const response = await fetch(`${API_BASE}${path}`, options);
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
  const response = await fetch(`${API_BASE}${path}`, options);
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

function normalizeError(error, fallback) {
  return error instanceof Error && normalize(error.message) ? error.message.trim() : fallback;
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

function createRequestSign() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `web-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function decodeLooseText(text) {
  return normalize(text);
}

function normalizeVerifiedCdk(result, code, channel = "channel1") {
  if (channel === "channel2") {
    return {
      code,
      channel,
      app_name: t().labels.channel2,
      app_product_name: PRODUCT_ID,
      raw: result?.data ?? result,
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

  let parsed = raw;

  for (let attempts = 0; attempts < 3; attempts += 1) {
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

  if (!parsed || typeof parsed !== "object") {
    throw new Error(t().messages.authParseFailed);
  }

  const userObject = parsed.user && typeof parsed.user === "object" ? parsed.user : {};
  const account = normalize(userObject.email) || normalize(parsed.email);

  if (!account || !account.includes("@")) {
    throw new Error(t().messages.authEmailMissing);
  }

  const extra = {
    channel: channelLabel("channel2"),
    email: account,
  };

  return {
    verified: true,
    user: account,
    email: account,
    has_sub: Boolean(parsed.account_ordering),
    extra,
  };
}

function normalizeChannel2BatchStatus(status) {
  const normalized = normalize(status).toLowerCase();

  if (normalized === "used") {
    return "used";
  }

  if (normalized === "not_used" || normalized === "unused") {
    return "unused";
  }

  return "invalid";
}

async function apiChannel2Json(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
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
        throw new Error(raw || `HTTP ${response.status}`);
      }
      throw new Error(t().messages.network);
    }
  }

  if (!response.ok) {
    const message =
      parsed && typeof parsed === "object" ? decodeLooseText(parsed.message) : decodeLooseText(raw);
    throw new Error(message || `HTTP ${response.status}`);
  }

  return parsed;
}

async function checkChannel2Cdk(code) {
  const result = await apiChannel2Json("/api/channel2/check", {
    method: "POST",
    body: JSON.stringify({
      cdk: code,
      sign: createRequestSign(),
      timestamp: Date.now(),
    }),
  });

  if (Number(result?.code) !== 1) {
    throw new Error(decodeLooseText(result?.message) || t().messages.cdkInvalid);
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
  state.redeem.redeeming = true;
  state.redeem.validatedChannel = "channel2";
  render();
  updateModalMessage(
    [
      channelLabel("channel2"),
      `${t().labels.email}: ${verifiedUser.email}`,
      t().labels.redeeming,
    ].join("\n\n"),
    t().labels.redeeming
  );

  try {
    const result = await apiChannel2Json("/api/channel2/redeem", {
      method: "POST",
      body: JSON.stringify({
        cdk,
        account: authRaw,
        type: "gpt",
        sign: createRequestSign(),
        timestamp: Date.now(),
      }),
    });

    if (Number(result?.code) !== 1) {
      throw new Error(decodeLooseText(result?.message) || t().messages.channel2Failed);
    }

    state.redeem.redeeming = false;
    state.redeem.task = null;
    render();

    const details = [t().messages.channel2Success];
    const message = decodeLooseText(result?.message);
    if (message) {
      details.push(message);
    }
    details.unshift(`${t().labels.email}: ${verifiedUser.email}`);
    details.unshift(channelLabel("channel2"));

    showModal("success", t().labels.success, details.join("\n\n"), null, {
      fireworks: true,
    });
  } catch (error) {
    state.redeem.redeeming = false;
    render();
    showModal("error", t().labels.failure, normalizeError(error, t().messages.channel2Failed));
  }
}

