const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const INDEX_FILE = path.join(PUBLIC_DIR, "index.html");

const CHANNEL1_BASE = "https://receipt-api.nitro.xin";
const CHANNEL2_PRIMARY_BASE = "https://activatecdk.me/shop/api/activate/chatgpt";
const CHANNEL2_SECONDARY_BASE = "";
const PRODUCT_ID = "chatgpt";
const BODY_LIMIT_BYTES = 2 * 1024 * 1024;
const FALLBACK_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function normalizeBaseUrl(base) {
  const raw = String(base || "").trim();
  if (!raw) {
    return "";
  }
  return raw.replace(/\/+$/, "");
}

function getChannel2Bases() {
  const envPrimary = normalizeBaseUrl(process.env.CHANNEL2_BASE);
  const envFallback = normalizeBaseUrl(process.env.CHANNEL2_FALLBACK_BASE);
  const defaults = [CHANNEL2_PRIMARY_BASE, CHANNEL2_SECONDARY_BASE];
  const list = [envPrimary, envFallback, ...defaults].filter(Boolean);
  return [...new Set(list)];
}

function isCloudflareChallenge(status, bodyText) {
  if (status !== 403) {
    return false;
  }
  const lowered = String(bodyText || "").toLowerCase();
  return lowered.includes("just a moment") || lowered.includes("__cf_chl_") || lowered.includes("challenge-platform");
}

function getContentType(filepath) {
  return CONTENT_TYPES[path.extname(filepath).toLowerCase()] || "application/octet-stream";
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(body);
}

function sendText(res, status, text, contentType = "text/plain; charset=utf-8") {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.end(text);
}

function sendBuffer(res, status, buffer, contentType) {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.end(buffer);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT_BYTES) {
        reject(new Error("body_too_large"));
        req.destroy();
        return;
      }
      chunks.push(Buffer.from(chunk));
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", reject);
  });
}

async function parseJsonBody(req) {
  const raw = await parseBody(req);
  if (!raw.trim()) {
    return {};
  }
  return JSON.parse(raw);
}

function requestUpstream(url, options = {}) {
  return new Promise((resolve, reject) => {
    let target;
    try {
      target = new URL(url);
    } catch (error) {
      reject(error);
      return;
    }

    const client = target.protocol === "http:" ? http : https;
    const request = client.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || undefined,
        path: `${target.pathname}${target.search}`,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        response.on("end", () => {
          resolve({
            status: response.statusCode || 500,
            headers: response.headers || {},
            bodyText: Buffer.concat(chunks).toString("utf8"),
          });
        });
      }
    );

    request.setTimeout(20000, () => {
      request.destroy(new Error("upstream_timeout"));
    });

    request.on("error", reject);

    if (options.body != null) {
      request.write(options.body);
    }

    request.end();
  });
}

function sendUpstream(res, upstream) {
  const contentType = upstream.headers["content-type"] || "application/json; charset=utf-8";
  sendText(res, upstream.status, upstream.bodyText, contentType);
}

function getChannel2Headers(req, base, extraHeaders = {}) {
  let origin = "https://activatecdk.me";
  try {
    origin = new URL(base).origin;
  } catch (_error) {
    origin = "https://activatecdk.me";
  }

  return {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": req.headers["accept-language"] || "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent": req.headers["user-agent"] || FALLBACK_USER_AGENT,
    Referer: `${origin}/`,
    Origin: origin,
    ...extraHeaders,
  };
}

async function proxyChannel1Json(res, upstreamPath, payload, headers = {}) {
  const upstream = await requestUpstream(`${CHANNEL1_BASE}${upstreamPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload || {}),
  });
  sendUpstream(res, upstream);
}

async function proxyChannel1Text(res, upstreamPath, body, headers = {}) {
  const upstream = await requestUpstream(`${CHANNEL1_BASE}${upstreamPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...headers,
    },
    body: body || "",
  });
  sendUpstream(res, upstream);
}

async function proxyChannel1Get(res, upstreamPath) {
  const upstream = await requestUpstream(`${CHANNEL1_BASE}${upstreamPath}`, {
    method: "GET",
  });
  sendUpstream(res, upstream);
}

async function proxyChannel2WithFallback(req, res, requestPath, options = {}) {
  const bases = getChannel2Bases();
  let lastError = null;
  let blockedByChallenge = false;

  for (const base of bases) {
    const targetUrl = `${base}${requestPath}`;
    const headers = getChannel2Headers(req, base, options.headers || {});

    try {
      const upstream = await requestUpstream(targetUrl, {
        method: options.method || "GET",
        headers,
        body: options.body,
      });

      if (isCloudflareChallenge(upstream.status, upstream.bodyText)) {
        blockedByChallenge = true;
        continue;
      }

      sendUpstream(res, upstream);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  if (blockedByChallenge) {
    sendJson(res, 503, {
      code: "channel2_upstream_blocked",
      error: "channel2_upstream_blocked",
      message: "Channel 2 upstream blocked by Cloudflare challenge",
      data: null,
    });
    return;
  }

  sendJson(res, 502, {
    code: "channel2_proxy_failed",
    error: "channel2_proxy_failed",
    message: lastError instanceof Error ? lastError.message : "Channel 2 proxy failed",
    data: null,
  });
}

function matchRoute(pathname, pattern) {
  const match = pathname.match(pattern);
  if (!match) {
    return null;
  }
  return match;
}

async function handleApi(req, res, pathname) {
  try {
    if (req.method === "POST" && pathname === "/api/channel1/check-cdk") {
      const body = await parseJsonBody(req);
      await proxyChannel1Json(res, "/cdks/public/check", { code: body.code }, { "X-Product-ID": PRODUCT_ID });
      return;
    }

    if (req.method === "POST" && pathname === "/api/channel1/check-auth") {
      const body = await parseJsonBody(req);
      await proxyChannel1Json(
        res,
        "/external/public/check-user",
        { user: body.user, cdk: body.cdk },
        { "X-Product-ID": PRODUCT_ID }
      );
      return;
    }

    if (req.method === "POST" && pathname === "/api/channel1/redeem") {
      const body = await parseJsonBody(req);
      const endpoint =
        typeof body.cdk === "string" && body.cdk.startsWith("R_") ? "/aftersale/public/redeem" : "/stocks/public/outstock";
      await proxyChannel1Json(res, endpoint, { cdk: body.cdk, user: body.user }, { "X-Device-Id": "web" });
      return;
    }

    if (req.method === "GET") {
      const taskMatch = matchRoute(pathname, /^\/api\/channel1\/task\/([^/]+)$/);
      if (taskMatch) {
        await proxyChannel1Get(res, `/stocks/public/outstock/${encodeURIComponent(decodeURIComponent(taskMatch[1]))}`);
        return;
      }
    }

    if (req.method === "POST" && pathname === "/api/channel1/batch-query") {
      const body = await parseJsonBody(req);
      const codes = Array.isArray(body.codes) ? body.codes : [];
      const payload = codes.map((code) => encodeURIComponent(String(code))).join("\n");
      await proxyChannel1Text(res, "/cdks/public/check-usage2", payload);
      return;
    }

    if (req.method === "GET") {
      const checkMatch = matchRoute(pathname, /^\/api\/channel2\/check-cdk\/([^/]+)$/);
      if (checkMatch) {
        const code = encodeURIComponent(decodeURIComponent(checkMatch[1]));
        await proxyChannel2WithFallback(req, res, `/keys/${code}`, { method: "GET" });
        return;
      }
    }

    if (req.method === "POST" && pathname === "/api/channel2/redeem") {
      const body = await parseJsonBody(req);
      await proxyChannel2WithFallback(req, res, "/keys/activate-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: body.code,
          session: body.session,
        }),
      });
      return;
    }

    if (req.method === "GET") {
      const activationMatch = matchRoute(pathname, /^\/api\/channel2\/activation\/([^/]+)$/);
      if (activationMatch) {
        const code = encodeURIComponent(decodeURIComponent(activationMatch[1]));
        await proxyChannel2WithFallback(req, res, `/keys/${code}/activation`, { method: "GET" });
        return;
      }
    }

    if (req.method === "POST" && pathname === "/api/channel2/bulk-status") {
      const body = await parseJsonBody(req);
      const codes = Array.isArray(body.codes) ? body.codes : [];
      await proxyChannel2WithFallback(req, res, "/keys/bulk-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codes }),
      });
      return;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "api_error";
    sendText(res, 500, message);
    return;
  }

  sendJson(res, 404, {
    code: "not_found",
    message: "API route not found",
  });
}

function safePublicPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, "");
  const target = path.resolve(PUBLIC_DIR, relative);
  if (!target.startsWith(PUBLIC_DIR)) {
    return null;
  }
  return target;
}

function serveIndex(res) {
  const html = fs.readFileSync(INDEX_FILE);
  sendBuffer(res, 200, html, "text/html; charset=utf-8");
}

function serveStaticOrIndex(res, pathname) {
  if (pathname === "/" || pathname === "/redeem/chatgpt" || pathname === "/redeem/chatgpt/") {
    serveIndex(res);
    return;
  }

  const filePath = safePublicPath(pathname);
  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    sendBuffer(res, 200, content, getContentType(filePath));
    return;
  }

  serveIndex(res);
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url || "/", "http://localhost");
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    await handleApi(req, res, pathname);
    return;
  }

  serveStaticOrIndex(res, pathname);
};
