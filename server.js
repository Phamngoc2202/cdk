const express = require("express");
const path = require("path");
const http = require("http");
const https = require("https");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");
const indexFile = path.join(publicDir, "index.html");
const CHANNEL1_BASE = "https://receipt-api.nitro.xin";
const PRODUCT_ID = "chatgpt";

app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

function createLegacyFetchResponse(res, bodyBuffer) {
  return {
    status: res.statusCode || 500,
    headers: {
      get(name) {
        const value = res.headers[String(name).toLowerCase()];
        if (Array.isArray(value)) {
          return value.join(", ");
        }
        return value || null;
      },
    },
    async text() {
      return bodyBuffer.toString("utf8");
    },
  };
}

async function fetchCompat(url, options = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const client = target.protocol === "http:" ? http : https;

    const req = client.request(
      target,
      {
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          resolve(createLegacyFetchResponse(res, Buffer.concat(chunks)));
        });
      }
    );

    req.on("error", reject);

    if (options.body != null) {
      req.write(options.body);
    }

    req.end();
  });
}

function setProxyResult(res, response, text) {
  const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";
  res.status(response.status);
  res.set("content-type", contentType);
  res.send(text);
}

function setCacheHeaders(res, pathname, isIndex = false) {
  if (isIndex) {
    res.set("Cache-Control", "no-store, max-age=0");
    return;
  }

  if (pathname.startsWith("/assets/")) {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    return;
  }

  res.set("Cache-Control", "public, max-age=300");
}

function isStaticFileRequest(pathname) {
  return pathname.startsWith("/assets/") || /\.[a-z0-9]+$/i.test(pathname);
}

async function proxyResponse(res, url, options = {}) {
  try {
    const response = await fetchCompat(url, options);
    const text = await response.text();
    setProxyResult(res, response, text);
  } catch (error) {
    res.status(502).json({
      code: 0,
      message: error instanceof Error ? error.message : "Channel 1 proxy error",
      data: null,
    });
  }
}

async function proxyJson(res, url, payload, headers = {}) {
  await proxyResponse(res, url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

async function proxyText(res, url, body, headers = {}) {
  await proxyResponse(res, url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...headers,
    },
    body,
  });
}

app.get("/", (_req, res) => {
  res.redirect("/redeem/chatgpt");
});

app.post("/api/channel1/check-cdk", async (req, res) => {
  const { code } = req.body || {};
  await proxyJson(res, `${CHANNEL1_BASE}/cdks/public/check`, { code }, { "X-Product-ID": PRODUCT_ID });
});

app.post("/api/channel1/check-auth", async (req, res) => {
  const { user, cdk } = req.body || {};
  await proxyJson(res, `${CHANNEL1_BASE}/external/public/check-user`, { user, cdk }, { "X-Product-ID": PRODUCT_ID });
});

app.post("/api/channel1/redeem", async (req, res) => {
  const { cdk, user } = req.body || {};
  const endpoint = typeof cdk === "string" && cdk.startsWith("R_") ? "/aftersale/public/redeem" : "/stocks/public/outstock";
  await proxyJson(res, `${CHANNEL1_BASE}${endpoint}`, { cdk, user }, { "X-Device-Id": "web" });
});

app.get("/api/channel1/task/:taskId", async (req, res) => {
  await proxyResponse(res, `${CHANNEL1_BASE}/stocks/public/outstock/${encodeURIComponent(req.params.taskId || "")}`, {
    method: "GET",
  });
});

app.get("/api/channel1/check-usage/:codes", async (req, res) => {
  const rawCodes = String(req.params.codes || "");
  await proxyResponse(res, `${CHANNEL1_BASE}/public/check-usage/${rawCodes}`, {
    method: "GET",
  });
});

app.post("/api/channel1/batch-query", async (req, res) => {
  const codes = Array.isArray(req.body?.codes) ? req.body.codes : [];
  await proxyText(res, `${CHANNEL1_BASE}/cdks/public/check-usage2`, codes.map((code) => encodeURIComponent(String(code))).join("\n"));
});

app.use("/api", (_req, res) => {
  res.status(404).json({
    code: "not_found",
    message: "API route not found",
  });
});

app.use((req, res, next) => {
  setCacheHeaders(res, req.path || "/", false);
  next();
});

app.use(express.static(publicDir, {
  fallthrough: true,
}));

app.use((req, res, next) => {
  if (isStaticFileRequest(req.path || "/")) {
    res.status(404).send("Not Found");
    return;
  }
  next();
});

app.use((_req, res) => {
  setCacheHeaders(res, "/", true);
  res.sendFile(indexFile);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Receipt clone listening on http://localhost:${port}`);
  });
}

module.exports = app;
