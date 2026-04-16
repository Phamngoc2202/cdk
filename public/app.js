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
  taskLookupId: "",
  taskLookupLoading: false,
  taskLookupResult: null,
  batchInput: "",
  batchLoading: false,
  batchResults: [],
  message: "",
  messageType: "info",
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

  if (el.matches("[data-model='task-id']")) {
    state.taskLookupId = el.value;
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
    case "query-task":
      await queryTask();
      break;
    case "query-batch":
      await queryBatch();
      break;
    case "clear-redeem":
      clearRedeem();
      break;
    case "clear-task":
      state.taskLookupId = "";
      state.taskLookupResult = null;
      render();
      break;
    case "clear-batch":
      state.batchInput = "";
      state.batchResults = [];
      render();
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
            <h2>Task Lookup</h2>
            <div class="field-stack">
              <input class="input-field" data-model="task-id" value="${escapeAttr(state.taskLookupId)}" placeholder="task_id" ${state.taskLookupLoading ? "disabled" : ""} />
              <div class="task-actions">
                <button class="button-secondary" data-action="query-task" ${state.taskLookupLoading ? "disabled" : ""}>${state.taskLookupLoading ? "Querying..." : "Query Task"}</button>
                <button class="button-secondary" data-action="clear-task" ${state.taskLookupLoading ? "disabled" : ""}>Clear</button>
              </div>
              ${state.taskLookupResult ? renderTask(state.taskLookupResult, "Task Result") : ""}
            </div>
          </article>

          <article class="card">
            <h2>Batch CDK Lookup (Channel 1)</h2>
            <div class="field-stack">
              <textarea class="input-field token-field" data-model="batch" placeholder="One CDK per line" ${state.batchLoading ? "disabled" : ""}>${escapeHtml(state.batchInput)}</textarea>
              <div class="task-actions">
                <button class="button-secondary" data-action="query-batch" ${state.batchLoading || parseCodes(state.batchInput).length === 0 ? "disabled" : ""}>${state.batchLoading ? "Querying..." : "Query"}</button>
                <button class="button-secondary" data-action="clear-batch" ${state.batchLoading ? "disabled" : ""}>Clear</button>
              </div>
              ${renderBatchResults()}
            </div>
          </article>
        </section>
      </div>
    </div>
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

function renderBatchResults() {
  if (!state.batchResults.length) {
    return "";
  }

  const items = state.batchResults
    .map((item) => {
      return `
        <article class="usage-card">
          <div class="summary-head">
            <h3>${escapeHtml(item.code || "-")}</h3>
            <span class="status-badge">${escapeHtml(item.status || "invalid")}</span>
          </div>
          <div class="info-grid">
            <div class="task-kv"><strong>User</strong><span>${escapeHtml(item.user || "-")}</span></div>
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
    setMessage("CDK valid.", "success");
  } catch (error) {
    state.cdkChecked = false;
    setMessage(normalizeError(error, "CDK invalid."), "error");
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
    setMessage("AuthSession valid.", "success");
  } catch (error) {
    state.authChecked = false;
    setMessage(normalizeError(error, "AuthSession invalid."), "error");
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
      message: "Task created.",
      error: "",
    };

    setMessage(`Redeem started. Task ID: ${state.task.task_id}`, "success");
  } catch (error) {
    setMessage(normalizeError(error, "Redeem failed."), "error");
  } finally {
    state.redeeming = false;
    render();
  }
}

async function queryTask() {
  const taskId = state.taskLookupId.trim();
  if (!taskId) {
    setMessage("Enter task id first.", "error");
    return;
  }

  state.taskLookupLoading = true;
  render();

  try {
    const raw = await apiJson(`/api/channel1/task/${encodeURIComponent(taskId)}`, { method: "GET" });
    state.taskLookupResult = normalizeTask(raw);
    setMessage("Task queried.", "success");
  } catch (error) {
    setMessage(normalizeError(error, "Query task failed."), "error");
  } finally {
    state.taskLookupLoading = false;
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
    const result = await apiJson("/api/channel1/batch-query", {
      method: "POST",
      body: JSON.stringify({ codes }),
    });

    state.batchResults = Array.isArray(result)
      ? result.map((item) => ({
          code: item.code,
          status: item.used ? "used" : "unused",
          user: item.user,
          redeem_time: item.redeem_time,
          app_name: item.app_name,
          product_name: item.product_name,
        }))
      : [];

    setMessage("Batch query done.", "success");
  } catch (error) {
    setMessage(normalizeError(error, "Batch query failed."), "error");
  } finally {
    state.batchLoading = false;
    render();
  }
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
  const pending = !["finish", "cancel", "failed", "success"].includes(status);
  const error = String(raw?.error || "").trim();
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
  const data = raw ? JSON.parse(raw) : {};

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
