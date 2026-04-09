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
      validateAuth: "Kiểm tra AuthSession",
      redeem: "Bắt đầu redeem",
      queryTask: "Tra cứu task",
      queryBatch: "Tra cứu",
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
    },
    messages: {
      cdkRequired: "Hãy nhập CDK trước.",
      authRequired: "Hãy nhập AuthSession JSON trước.",
      taskRequired: "Hãy nhập task id trước.",
      batchRequired: "Hãy nhập ít nhất 1 CDK.",
      cdkUsed: "CDK này đã được sử dụng.",
      cdkInvalid: "CDK không hợp lệ hoặc không đúng gói.",
      authInvalid: "AuthSession không hợp lệ hoặc chưa đủ điều kiện redeem.",
      network: "Có lỗi mạng. Vui lòng thử lại sau.",
      taskCreated: "Task đã được tạo.",
      taskPending: "Task vẫn đang được xử lý.",
      taskSucceeded: "Task đã hoàn tất thành công.",
      taskFailed: "Task xử lý thất bại.",
      routeInvalid: "Trang này chỉ hỗ trợ `/redeem/chatgpt`.",
      footer: "Trang này dùng để redeem ChatGPT và tra cứu CDK.",
      copyDone: "Đã sao chép vào clipboard.",
      copyEmpty: "Không có dữ liệu để sao chép.",
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
      validateAuth: "Check AuthSession",
      redeem: "Start Redeem",
      queryTask: "Query Task",
      queryBatch: "Query",
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
    },
    messages: {
      cdkRequired: "Enter a CDK first.",
      authRequired: "Enter the AuthSession JSON first.",
      taskRequired: "Enter a task id first.",
      batchRequired: "Enter at least one CDK.",
      cdkUsed: "This CDK has already been used.",
      cdkInvalid: "The CDK is invalid or does not match the product.",
      authInvalid: "The AuthSession is invalid or does not meet redeem requirements.",
      network: "Network error. Please try again later.",
      taskCreated: "Task created.",
      taskPending: "The task is still processing.",
      taskSucceeded: "The task succeeded.",
      taskFailed: "The task failed.",
      routeInvalid: "This page only supports `/redeem/chatgpt`.",
      footer: "This page is used for ChatGPT redeem and CDK lookup.",
      copyDone: "Copied to clipboard.",
      copyEmpty: "Nothing to copy.",
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
      validateAuth: "AuthSession چیک کریں",
      redeem: "Redeem شروع کریں",
      queryTask: "ٹاسک تلاش کریں",
      queryBatch: "تلاش کریں",
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
    },
    messages: {
      cdkRequired: "پہلے CDK درج کریں۔",
      authRequired: "پہلے AuthSession JSON درج کریں۔",
      taskRequired: "پہلے task id درج کریں۔",
      batchRequired: "کم از کم 1 CDK درج کریں۔",
      cdkUsed: "یہ CDK پہلے ہی استعمال ہو چکا ہے۔",
      cdkInvalid: "CDK غلط ہے یا پیکیج سے مطابقت نہیں رکھتا۔",
      authInvalid: "AuthSession غلط ہے یا redeem کے لیے کافی نہیں۔",
      network: "نیٹ ورک میں خرابی ہے۔ بعد میں دوبارہ کوشش کریں۔",
      taskCreated: "ٹاسک بنا دیا گیا ہے۔",
      taskPending: "ٹاسک ابھی پروسیسنگ میں ہے۔",
      taskSucceeded: "ٹاسک کامیابی سے مکمل ہو گیا۔",
      taskFailed: "ٹاسک ناکام ہو گیا۔",
      routeInvalid: "یہ صفحہ صرف `/redeem/chatgpt` کو سپورٹ کرتا ہے۔",
      footer: "یہ صفحہ ChatGPT redeem اور CDK تلاش کے لیے ہے۔",
      copyDone: "Clipboard میں کاپی ہو گیا۔",
      copyEmpty: "کاپی کرنے کے لیے کوئی ڈیٹا نہیں۔",
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
    cdkInput: "",
    authInput: "",
    verifiedCdk: null,
    verifiedUser: null,
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
  },
};

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");

init();

function init() {
  applyTheme();

  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", "/redeem/chatgpt");
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);

  render();
}

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) {
    if (event.target === modalRoot) {
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
    case "open-url":
      window.open(trigger.dataset.url, "_blank", "noopener,noreferrer");
      break;
    case "validate-cdk":
      validateCdk();
      break;
    case "validate-auth":
      validateAuthSession();
      break;
    case "start-redeem":
      startRedeem();
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
      queryBatch();
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
    const queryButton = section?.querySelector("[data-action='query-batch']");
    const clearButton = section?.querySelector("[data-action='clear-batch']");
    const hasCodes = parseBatchCodes(target.value).length > 0;

    if (queryButton instanceof HTMLButtonElement) {
      queryButton.disabled = state.batch.loading || !hasCodes;
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
    validateCdk();
    return;
  }

  if (target.matches("[data-model='task-lookup']")) {
    event.preventDefault();
    queryTask();
  }
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
            <div class="hero-stamps">
              <span class="stamp-badge">${escapeHtml(t().redeemTitle)}</span>
              <span class="stamp-badge stamp-badge--accent">${escapeHtml(t().guideTitle)}</span>
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

          <div class="hero-burst">
            <div class="control-deck">
              <button type="button" class="lang-toggle" data-action="toggle-language" title="Language">
                ${escapeHtml(languageBadge(state.language))}
              </button>
              <button type="button" class="icon-toggle" data-action="toggle-theme" title="Theme">
                ${renderThemeIcon()}
              </button>
            </div>
            <div class="burst-card">
              <div class="burst-topline">
                <span class="panel-ribbon">${escapeHtml(t().labels.currentTask)}</span>
                ${renderStatusBadge(workspaceState().label, workspaceState().tone)}
              </div>
              <h2 class="burst-title">${escapeHtml(workspaceState().label)}</h2>
              <p class="burst-note">${escapeHtml(t().notes.polling)}</p>
            </div>
            <div class="signal-grid">
              ${renderHeroStats()}
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
  const canRedeem =
    Boolean(state.redeem.verifiedCdk) &&
    Boolean(state.redeem.verifiedUser) &&
    !state.redeem.redeeming &&
    !state.redeem.cdkLoading &&
    !state.redeem.authLoading;

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
              class="button-link"
              data-action="validate-cdk"
              ${state.redeem.cdkLoading || state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(state.redeem.cdkLoading ? t().labels.checking : t().buttons.validateCdk)}
            </button>
          </div>
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
            <div class="command-note">${escapeHtml(t().buttons.validateAuth)}</div>
          </div>
        </div>
        <div class="field-group">
          <textarea
            class="input-field token-field ${statusClass(state.redeem.authStatus)}"
            data-model="redeem-auth"
            placeholder='{"user":{"id":"user-..."},"expires":"..."}'
            ${state.redeem.redeeming ? "disabled" : ""}
          >${escapeHtml(state.redeem.authInput)}</textarea>
          <div class="task-actions">
            <button
              type="button"
              class="button-link"
              data-action="validate-auth"
              ${state.redeem.authLoading || state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(state.redeem.authLoading ? t().labels.checking : t().buttons.validateAuth)}
            </button>
            <button
              type="button"
              class="button-secondary"
              data-action="clear-redeem"
              ${state.redeem.redeeming ? "disabled" : ""}
            >
              ${escapeHtml(t().buttons.clear)}
            </button>
          </div>
          <div class="helper-text">${escapeHtml(t().notes.auth)}</div>
          <div class="status-inline ${statusColorClass(state.redeem.authStatus)}">
            ${renderInlineStatus(state.redeem.authStatus, state.redeem.authLoading, t().labels.checking)}
          </div>
        </div>
      </article>
    </div>

    ${renderVerifiedPanels()}

    <section class="launch-panel">
      <div class="launch-copy">
        <span class="panel-ribbon">${escapeHtml(t().buttons.redeem)}</span>
        <h3>${escapeHtml(canRedeem ? t().labels.ready : t().labels.waiting)}</h3>
        <p>${escapeHtml(t().notes.polling)}</p>
      </div>
      <button
        type="button"
        class="button-primary button-primary--large launch-button"
        data-action="start-redeem"
        ${canRedeem ? "" : "disabled"}
      >
        ${escapeHtml(state.redeem.redeeming ? t().labels.redeeming : t().buttons.redeem)}
      </button>
    </section>
  `;
}

function renderVerifiedPanels() {
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

  if (state.redeem.verifiedUser) {
    blocks.push(`
      <section class="intel-card">
        <div class="intel-topline">
          <h3>${escapeHtml(t().labels.user)}</h3>
          ${renderStatusBadge(t().labels.ready, "success")}
        </div>
        <ul class="verified-list">
          ${formatUserDetails(state.redeem.verifiedUser)
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
          ${escapeHtml(state.batch.loading ? t().labels.querying : t().buttons.queryBatch)}
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

  return [
    renderMetricCard(
      t().labels.cdk,
      state.redeem.verifiedCdk ? t().labels.ready : t().labels.waiting,
      state.redeem.verifiedCdk?.app_product_name || t().buttons.validateCdk,
      state.redeem.verifiedCdk ? "success" : "neutral"
    ),
    renderMetricCard(
      t().labels.authSession,
      state.redeem.verifiedUser ? t().labels.ready : t().labels.waiting,
      state.redeem.verifiedUser?.user || t().buttons.validateAuth,
      state.redeem.verifiedUser ? "success" : "neutral"
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
  const lines = [
    {
      label: t().labels.cdk,
      value: state.redeem.verifiedCdk ? t().labels.ready : t().labels.waiting,
      tone: state.redeem.verifiedCdk ? "success" : "neutral",
    },
    {
      label: t().labels.authSession,
      value: state.redeem.verifiedUser ? t().labels.ready : t().labels.waiting,
      tone: state.redeem.verifiedUser ? "success" : "neutral",
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

async function validateCdk({ silent = false } = {}) {
  const code = normalize(state.redeem.cdkInput);

  if (!code) {
    state.redeem.cdkStatus = statusError(t().messages.cdkRequired);
    render();
    if (!silent) {
      showModal("error", t().labels.failure, t().messages.cdkRequired);
    }
    return false;
  }

  state.redeem.cdkLoading = true;
  state.redeem.cdkStatus = null;
  render();

  try {
    const result = await apiJson("/cdks/public/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Product-ID": PRODUCT_ID,
      },
      body: JSON.stringify({ code }),
    });

    if (result.used) {
      throw new Error(t().messages.cdkUsed);
    }

    state.redeem.verifiedCdk = result;
    state.redeem.validatedCdkValue = code;
    state.redeem.cdkStatus = statusSuccess(t().labels.ready);
    render();

    if (!silent) {
      showModal(
        "success",
        t().labels.success,
        `${t().labels.app}: ${result.app_name || "-"}\n${t().labels.product}: ${result.app_product_name || "-"}`
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

  if (cdkValue !== state.redeem.validatedCdkValue) {
    const ok = await validateCdk({ silent: true });
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

async function startRedeem() {
  if (state.redeem.redeeming) {
    return;
  }

  const authOk = await validateAuthSession({ silent: true });
  if (!authOk) {
    showModal("error", t().labels.failure, t().messages.authInvalid);
    return;
  }

  state.redeem.redeeming = true;
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

    showModal(
      "info",
      t().labels.pending,
      `${t().messages.taskCreated}\n\n${t().labels.taskId}: ${state.redeem.task.task_id}`
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

    if (task.pending) {
      await delay(POLL_INTERVAL_MS);
      continue;
    }

    state.redeem.redeeming = false;
    render();

    if (task.success) {
      showModal("success", t().labels.success, `${t().messages.taskSucceeded}\n\n${taskMessageBlock(task)}`);
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

async function queryBatch() {
  const codes = parseBatchCodes(state.batch.input);
  if (!codes.length) {
    showModal("error", t().labels.failure, t().messages.batchRequired);
    return;
  }

  state.batch.loading = true;
  state.batch.progress = 0;
  render();

  try {
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
  const user = normalize(result?.user);
  if (user) {
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
    cdkInput: "",
    authInput: "",
    verifiedCdk: null,
    verifiedUser: null,
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
  };
  render();
}

function resetCdkValidation() {
  state.redeem.verifiedCdk = null;
  state.redeem.validatedCdkValue = "";
  state.redeem.cdkStatus = null;
}

function resetAuthValidation() {
  state.redeem.verifiedUser = null;
  state.redeem.validatedAuthValue = "";
  state.redeem.authStatus = null;
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
  if (state.redeem.verifiedCdk && state.redeem.verifiedUser) {
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

function showModal(type, title, message, onOk) {
  state.modal = {
    type,
    title,
    message,
    okText: t().buttons.confirm,
    onOk,
  };
  renderModal();
}

function closeModal() {
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
        : "i";
  modalRoot.className = "modal-root is-open";
  modalRoot.innerHTML = `
    <div class="modal-card">
      <div class="modal-icon ${escapeHtml(state.modal.type)}">${icon}</div>
      <h3 class="modal-title">${escapeHtml(state.modal.title)}</h3>
      <div class="modal-message"><pre>${escapeHtml(state.modal.message)}</pre></div>
      <div class="modal-actions">
        <button type="button" class="button-primary" data-action="close-modal">
          ${escapeHtml(state.modal.okText)}
        </button>
      </div>
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

