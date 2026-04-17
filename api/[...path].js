const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const INDEX_FILE = path.join(PUBLIC_DIR, "index.html");

const CHANNEL1_BASE = "https://receipt-api.nitro.xin";
const PRODUCT_ID = "chatgpt";
const BODY_LIMIT_BYTES = 2 * 1024 * 1024;

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

function setCacheHeaders(res, pathname, isIndex = false) {
  if (isIndex) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return;
  }

  if (pathname.startsWith("/assets/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=300");
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

      const usageMatch = matchRoute(pathname, /^\/api\/channel1\/check-usage\/([^/]+)$/);
      if (usageMatch) {
        const codes = usageMatch[1];
        await proxyChannel1Get(res, `/public/check-usage/${codes}`);
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
  const html = fs.readFileSync(INDEX_FILE, "utf8");
  setCacheHeaders(res, "/", true);
  sendText(res, 200, html, "text/html; charset=utf-8");
}

function isStaticFileRequest(pathname) {
  return pathname.startsWith("/assets/") || /\.[a-z0-9]+$/i.test(pathname);
}

function serveStaticOrIndex(res, pathname) {
  if (pathname === "/" || pathname === "/redeem/chatgpt" || pathname === "/redeem/chatgpt/") {
    serveIndex(res);
    return;
  }

  const filePath = safePublicPath(pathname);
  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    setCacheHeaders(res, pathname, false);
    sendBuffer(res, 200, content, getContentType(filePath));
    return;
  }

  if (isStaticFileRequest(pathname)) {
    sendText(res, 404, "Not Found");
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
