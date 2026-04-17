const app = document.getElementById("app");

const state = {
  cdk: "",
  auth: "",
  cdkChecked: false,
  authChecked: false,
  checkingCdk: false,
  checkingAuth: false,
  redeeming: false,
  task: null,
  batchInput: "",
  batchLoading: false,
  batchResults: [],
  batchTab: "all",
  message: "",
  messageType: "info",
  modalOpen: false,
  modalTitle: "",
  modalMessage: "",
  modalType: "info",
};

init();

function init() {
  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", "/redeem/chatgpt");
  }

  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  render();
}

function onInput(event) {
  const el = event.target;
  if (!(el instanceof HTMLElement)) {
    return;
  }

  if (el.matches("[data-model='cdk']")) {
    state.cdk = el.value;
    state.cdkChecked = false;
    state.authChecked = false;
    render();
    return;
  }

  if (el.matches("[data-model='auth']")) {
    state.auth = el.value;
    state.authChecked = false;
    render();
    return;
  }

  if (el.matches("[data-model='batch']")) {
    state.batchInput = el.value;
    render();
  }
}

async function onClick(event) {
  const btn = event.target.closest("[data-action]");
  if (!btn || btn.disabled) {
    return;
  }

  switch (btn.dataset.action) {
    case "check-cdk":
      await checkCdk();
      break;
    case "check-auth":
      await checkAuth();
      break;
    case "redeem":
      await redeem();
      break;
    case "query-batch":
      await queryBatch();
      break;
    case "clear-redeem":
      clearRedeem();
      break;
    case "clear-batch":
      state.batchInput = "";
      state.batchResults = [];
      state.batchTab = "all";
      render();
      break;
    case "copy-all":
      await copyBatch("all");
      break;
    case "copy-used":
      await copyBatch("used");
      break;
    case "copy-unused":
      await copyBatch("unused");
      break;
    case "set-batch-tab":
      state.batchTab = btn.dataset.tab || "all";
      render();
      break;
    case "close-modal":
      closeModal();
      break;
    default:
      break;
  }
}

function render() {
  app.innerHTML = `
    <div class="simple-shell">
      <div class="simple-container">
        <section class="hero-card">
          <div class="hero-card__copy">
            <h1>ChatGPT CDK Center</h1>
            <p>Channel 1 only</p>
          </div>
        </section>

        ${renderMessage()}

        <section class="content-grid">
          <article class="card">
            <h2>Redeem (Channel 1)</h2>
            <div class="field-stack">
              <input class="input-field" data-model="cdk" value="${escapeAttr(state.cdk)}" placeholder="CDK" ${state.redeeming ? "disabled" : ""} />
              <textarea class="input-field token-field" data-model="auth" placeholder="AuthSession JSON" ${state.redeeming ? "disabled" : ""}>${escapeHtml(state.auth)}</textarea>
              <div class="task-actions">
                <button class="button-secondary" data-action="check-cdk" ${state.checkingCdk || state.redeeming ? "disabled" : ""}>${state.checkingCdk ? "Checking..." : "Check CDK"}</button>
                <button class="button-secondary" data-action="check-auth" ${state.checkingAuth || state.redeeming ? "disabled" : ""}>${state.checkingAuth ? "Checking..." : "Check Auth"}</button>
                <button class="button-primary" data-action="redeem" ${canRedeem() ? "" : "disabled"}>${state.redeeming ? "Redeeming..." : "Redeem"}</button>
                <button class="button-secondary" data-action="clear-redeem" ${state.redeeming ? "disabled" : ""}>Clear</button>
              </div>
              ${state.task ? renderTask(state.task, "Current Task") : ""}
            </div>
          </article>

          <article class="card">
            <h2>CDK Lookup (Channel 1)</h2>
            <div class="field-stack">
              <textarea class="input-field token-field" data-model="batch" placeholder="One CDK per line" ${state.batchLoading ? "disabled" : ""}>${escapeHtml(state.batchInput)}</textarea>
              <div class="task-actions">
                <button class="button-secondary" data-action="query-batch" ${state.batchLoading || parseCodes(state.batchInput).length === 0 ? "disabled" : ""}>${state.batchLoading ? "Querying..." : "Query"}</button>
                <button class="button-secondary" data-action="clear-batch" ${state.batchLoading ? "disabled" : ""}>Clear</button>
              </div>
              ${renderBatchSummary()}
              ${renderBatchTools()}
              ${renderBatchResults()}
            </div>
          </article>
        </section>
      </div>
    </div>
    ${renderModal()}
  `;
}

function canRedeem() {
  return Boolean(state.cdkChecked && state.authChecked && !state.redeeming && state.cdk.trim() && state.auth.trim());
}

function renderMessage() {
  if (!state.message) {
    return "";
  }

  const cls = state.messageType === "error" ? "status-inline error" : state.messageType === "success" ? "status-inline success" : "status-inline";
  return `<div class="${cls}">${escapeHtml(state.message)}</div>`;
}

function renderModal() {
  if (!state.modalOpen) {
    return "";
  }

  const tone =
    state.modalType === "error"
      ? "#ef4444"
      : state.modalType === "success"
        ? "#22c55e"
        : "#3b82f6";

  return `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px;">
      <div style="width:min(520px,100%);background:#fff;border-radius:12px;border:1px solid #e5e7eb;box-shadow:0 12px 28px rgba(0,0,0,0.25);overflow:hidden;">
        <div style="padding:12px 16px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;">
          <strong style="color:${tone};">${escapeHtml(state.modalTitle || "Notification")}</strong>
          <button data-action="close-modal" style="border:0;background:transparent;font-size:20px;line-height:1;cursor:pointer;" aria-label="Close">&times;</button>
        </div>
        <div style="padding:16px;white-space:pre-wrap;color:#111827;">${escapeHtml(state.modalMessage)}</div>
        <div style="padding:12px 16px;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;">
          <button class="button-secondary" data-action="close-modal">OK</button>
        </div>
      </div>
    </div>
  `;
}

function renderTask(task, title) {
  return `
    <div class="result-stage">
      <h3>${escapeHtml(title)}</h3>
      <div class="info-grid">
        <div class="task-kv"><strong>Task ID</strong><span>${escapeHtml(task.task_id || "-")}</span></div>
        <div class="task-kv"><strong>CDK</strong><span>${escapeHtml(task.cdk || "-")}</span></div>
        <div class="task-kv"><strong>Status</strong><span>${escapeHtml(task.status || "-")}</span></div>
        <div class="task-kv"><strong>Progress</strong><span>${escapeHtml(String(clampProgress(task.progress)))}%</span></div>
        <div class="task-kv task-kv--wide"><strong>Message</strong><span>${escapeHtml(task.message || task.error || "-")}</span></div>
      </div>
    </div>
  `;
}

function renderBatchSummary() {
  const total = state.batchResults.length;
  const used = state.batchResults.filter((item) => item.status === "used").length;
  const unused = state.batchResults.filter((item) => item.status === "unused").length;
  if (!total) {
    return "";
  }
  return `
    <div class="info-grid">
      <div class="task-kv"><strong>Total</strong><span>${total}</span></div>
      <div class="task-kv"><strong>Used</strong><span>${used}</span></div>
      <div class="task-kv"><strong>Unused</strong><span>${unused}</span></div>
    </div>
  `;
}

function renderBatchTools() {
  if (!state.batchResults.length) {
    return "";
  }
  return `
    <div class="result-stage">
      <h3>Copy</h3>
      <div class="task-actions">
        <button class="button-secondary" data-action="copy-all">Copy All</button>
        <button class="button-secondary" data-action="copy-used">Copy Used</button>
        <button class="button-secondary" data-action="copy-unused">Copy Unused</button>
      </div>
      <div class="task-actions">
        <button class="button-secondary" data-action="set-batch-tab" data-tab="all" ${state.batchTab === "all" ? "disabled" : ""}>All</button>
        <button class="button-secondary" data-action="set-batch-tab" data-tab="used" ${state.batchTab === "used" ? "disabled" : ""}>Used</button>
        <button class="button-secondary" data-action="set-batch-tab" data-tab="unused" ${state.batchTab === "unused" ? "disabled" : ""}>Unused</button>
      </div>
    </div>
  `;
}

function renderBatchResults() {
  const list =
    state.batchTab === "used"
      ? state.batchResults.filter((item) => item.status === "used")
      : state.batchTab === "unused"
        ? state.batchResults.filter((item) => item.status === "unused")
        : state.batchResults;

  if (!list.length) {
    return "";
  }

  const items = list
    .map((item) => {
      const email = item.email || item.user || "";
      const showUser = Boolean(item.user && item.user !== email);
      return `
        <article class="usage-card">
          <div class="summary-head">
            <h3>${escapeHtml(item.code || "-")}</h3>
            <span class="status-badge">${escapeHtml(item.status || "invalid")}</span>
          </div>
          <div class="info-grid">
            <div class="task-kv"><strong>Email</strong><span>${escapeHtml(email || "-")}</span></div>
            ${showUser ? `<div class="task-kv"><strong>User</strong><span>${escapeHtml(item.user)}</span></div>` : ""}
            <div class="task-kv"><strong>App</strong><span>${escapeHtml(item.app_name || "-")}</span></div>
            <div class="task-kv"><strong>Product</strong><span>${escapeHtml(item.product_name || "-")}</span></div>
            <div class="task-kv"><strong>Redeem Time</strong><span>${escapeHtml(item.redeem_time || "-")}</span></div>
          </div>
        </article>
      `;
    })
    .join("");

  return `<div class="usage-list">${items}</div>`;
}

async function checkCdk() {
  const code = state.cdk.trim();
  if (!code) {
    setMessage("Enter CDK first.", "error");
    return;
  }

  state.checkingCdk = true;
  render();

  try {
    const result = await apiJson("/api/channel1/check-cdk", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (result?.used) {
      throw new Error("CDK already used.");
    }

    state.cdkChecked = true;
    setMessage(buildCdkCheckMessage(result, code), "success");
  } catch (error) {
    state.cdkChecked = false;
    setMessage(`CDK check failed\nCode: ${code}\nReason: ${normalizeError(error, "CDK invalid.")}`, "error");
  } finally {
    state.checkingCdk = false;
    render();
  }
}

async function checkAuth() {
  const cdk = state.cdk.trim();
  const auth = state.auth.trim();

  if (!cdk) {
    setMessage("Enter CDK first.", "error");
    return;
  }

  if (!auth) {
    setMessage("Enter AuthSession JSON first.", "error");
    return;
  }

  if (!state.cdkChecked) {
    await checkCdk();
    if (!state.cdkChecked) {
      return;
    }
  }

  state.checkingAuth = true;
  render();

  try {
    const result = await apiJson("/api/channel1/check-auth", {
      method: "POST",
      body: JSON.stringify({ user: auth, cdk }),
    });

    if (!result?.verified) {
      throw new Error("AuthSession invalid.");
    }

    state.authChecked = true;
    setMessage(buildAuthCheckMessage(result, cdk), "success");
  } catch (error) {
    state.authChecked = false;
    setMessage(
      `AuthSession check failed\nCDK: ${cdk}\nReason: ${normalizeError(error, "AuthSession invalid.")}`,
      "error"
    );
  } finally {
    state.checkingAuth = false;
    render();
  }
}

async function redeem() {
  if (!canRedeem()) {
    setMessage("Please check CDK and AuthSession before redeem.", "error");
    return;
  }

  state.redeeming = true;
  render();

  try {
    const taskId = await apiText("/api/channel1/redeem", {
      method: "POST",
      body: JSON.stringify({ cdk: state.cdk.trim(), user: state.auth.trim() }),
    });

    state.task = {
      task_id: taskId.trim(),
      cdk: state.cdk.trim(),
      status: "created",
      progress: 0,
      message: "Task created. Waiting for completion...",
      error: "",
    };

    setMessage(buildTaskMessage(state.task, "Redeem request sent"), "success");

    const finalTask = await waitForRedeemTask(state.task.task_id);
    state.task = finalTask;
    if (finalTask.success) {
      setMessage(buildTaskMessage(finalTask, "Redeem completed successfully"), "success");
    } else {
      setMessage(buildTaskMessage(finalTask, "Redeem failed"), "error");
    }
  } catch (error) {
    setMessage(
      `Redeem failed\nCDK: ${state.cdk.trim()}\nReason: ${normalizeError(error, "Redeem failed.")}`,
      "error"
    );
  } finally {
    state.redeeming = false;
    render();
  }
}

async function queryBatch() {
  const codes = parseCodes(state.batchInput);
  if (!codes.length) {
    setMessage("Enter at least one CDK.", "error");
    return;
  }

  state.batchLoading = true;
  render();

  try {
    const encoded = codes.map((code) => encodeURIComponent(code)).join(",");
    const result = await apiJson(`/api/channel1/check-usage/${encoded}`, { method: "GET" });
    const rows = Array.isArray(result) ? result : [result];
    state.batchResults = rows
      .filter(Boolean)
      .map((item, idx) => ({
        code: String(item.code || codes[idx] || "").trim(),
        status: item.used ? "used" : "unused",
        user: item.user || "",
        email: item.email || item.user || "",
        redeem_time: item.redeem_time || "",
        app_name: item.app_name || "",
        product_name: item.product_name || item.app_product_name || "",
      }));
    state.batchTab = "all";
    setMessage(buildBatchSummaryMessage(codes.length, state.batchResults), "success");
  } catch (error) {
    setMessage(`CDK query failed\nInput: ${codes.length} code(s)\nReason: ${normalizeError(error, "Query CDK failed.")}`, "error");
  } finally {
    state.batchLoading = false;
    render();
  }
}

async function copyBatch(mode) {
  const list =
    mode === "used"
      ? state.batchResults.filter((item) => item.status === "used")
      : mode === "unused"
        ? state.batchResults.filter((item) => item.status === "unused")
        : state.batchResults;
  const text = list.map((item) => item.code).filter(Boolean).join("\n");
  if (!text) {
    setMessage("No CDK to copy.", "error");
    return;
  }
  try {
    await copyText(text);
    setMessage(`Copied ${list.length} CDK(s).`, "success");
  } catch (error) {
    setMessage(`Copy failed\nReason: ${normalizeError(error, "Copy failed.")}`, "error");
  }
  render();
}

function clearRedeem() {
  state.cdk = "";
  state.auth = "";
  state.cdkChecked = false;
  state.authChecked = false;
  state.task = null;
  state.message = "";
  state.messageType = "info";
  render();
}

function parseCodes(input) {
  return String(input || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeTask(raw) {
  const status = String(raw?.status || "").toLowerCase();
  const pendingFromApi = typeof raw?.pending === "boolean" ? raw.pending : null;
  const successFromApi = typeof raw?.success === "boolean" ? raw.success : null;
  const pending = pendingFromApi ?? !["finish", "cancel", "failed", "success"].includes(status);
  const error = String(raw?.error || "").trim();
  const success = successFromApi ?? (status === "finish" && !error);
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

function clampProgress(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(num)));
}

function setMessage(message, type = "info") {
  state.message = String(message || "").trim();
  state.messageType = type;
  state.modalOpen = Boolean(state.message);
  state.modalTitle = type === "error" ? "Error" : type === "success" ? "Success" : "Notification";
  state.modalMessage = state.message;
  state.modalType = type;
}

function closeModal() {
  state.modalOpen = false;
  state.modalTitle = "";
  state.modalMessage = "";
  state.modalType = "info";
  render();
}

function buildCdkCheckMessage(result, code) {
  const lines = [
    "CDK valid",
    `Code: ${code}`,
    `Used: ${Boolean(result?.used) ? "yes" : "no"}`,
    `App: ${pickText(result, ["app_name", "app", "service"], "-")}`,
    `Product: ${pickText(result, ["app_product_name", "product_name", "product", "plan"], "-")}`,
    `Status: ${pickText(result, ["status"], "-")}`,
  ];
  return lines.join("\n");
}

async function waitForRedeemTask(taskId) {
  const maxAttempts = 25;
  const delayMs = 3000;
  let latest = state.task || { task_id: taskId, status: "created", progress: 0, pending: true, success: false, message: "" };

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await sleep(delayMs);
    try {
      const raw = await apiJson(`/api/channel1/task/${encodeURIComponent(taskId)}`, { method: "GET" });
      latest = normalizeTask(raw);
      state.task = latest;
      render();
      if (!latest.pending) {
        return latest;
      }
    } catch {
      // keep polling until timeout
    }
  }

  return {
    ...latest,
    pending: false,
    success: false,
    message: latest.message || "Timed out while waiting for redeem result.",
    error: latest.error || "timeout",
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildAuthCheckMessage(result, cdk) {
  const lines = [
    "AuthSession valid",
    `CDK: ${cdk}`,
    `Verified: ${Boolean(result?.verified) ? "yes" : "no"}`,
    `Email: ${pickText(result, ["email"], "-")}`,
    `User: ${pickText(result, ["user", "name"], "-")}`,
    `Has Sub: ${Boolean(result?.has_sub) ? "yes" : "no"}`,
  ];
  return lines.join("\n");
}

function buildTaskMessage(task, title) {
  const lines = [
    title,
    `Task ID: ${task?.task_id || "-"}`,
    `CDK: ${task?.cdk || "-"}`,
    `Status: ${task?.status || "-"}`,
    `Progress: ${clampProgress(task?.progress)}%`,
    `Message: ${task?.message || task?.error || "-"}`,
  ];
  return lines.join("\n");
}

function buildBatchSummaryMessage(inputCount, results) {
  const used = results.filter((item) => item.status === "used").length;
  const unused = results.filter((item) => item.status === "unused").length;
  const invalid = results.length - used - unused;
  const sample = results
    .slice(0, 8)
    .map((item) => `${item.code || "-"}: ${item.status || "invalid"}`)
    .join("\n");

  const lines = [
    "Batch query done",
    `Input: ${inputCount}`,
    `Found: ${results.length}`,
    `Used: ${used}`,
    `Unused: ${unused}`,
    `Invalid: ${invalid}`,
    "",
    "Sample:",
    sample || "-",
  ];

  return lines.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.focus();
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

function pickText(obj, keys, fallback = "-") {
  for (const key of keys) {
    const value = obj?.[key];
    if (value === 0) {
      return "0";
    }
    if (value) {
      return String(value);
    }
  }
  return fallback;
}

async function apiJson(url, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers,
  });

  const raw = await response.text();
  let data = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      if (!response.ok) {
        throw new Error(raw || `HTTP ${response.status}`);
      }
      throw new Error(`Invalid JSON response (HTTP ${response.status})`);
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || raw || `HTTP ${response.status}`);
  }

  return data;
}

async function apiText(url, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers,
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `HTTP ${response.status}`);
  }
  return text;
}

function normalizeError(error, fallback) {
  const msg = error instanceof Error ? String(error.message || "").trim() : "";
  return msg || fallback;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}
