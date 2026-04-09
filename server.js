const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");
const indexFile = path.join(publicDir, "index.html");

app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

async function proxyJson(res, url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";

    res.status(response.status);
    res.set("content-type", contentType);
    res.send(text);
  } catch (error) {
    res.status(502).json({
      code: 0,
      message: error instanceof Error ? error.message : "Channel 2 proxy error",
      data: null,
    });
  }
}

app.get("/", (_req, res) => {
  res.redirect("/redeem/chatgpt");
});

app.post("/api/channel2/check", async (req, res) => {
  const { cdk, sign, timestamp } = req.body || {};
  await proxyJson(res, "https://chong.databrain.sbs/api/vip/c", { cdk, sign, timestamp });
});

app.post("/api/channel2/redeem", async (req, res) => {
  const { cdk, account, type, sign, timestamp } = req.body || {};
  await proxyJson(res, "https://chong.databrain.sbs/api/vip/r", { cdk, account, type, sign, timestamp });
});

app.post("/api/channel2/cdks", async (req, res) => {
  await proxyJson(res, "https://chong.databrain.sbs/api/vip/cdks", req.body || []);
});

app.use(express.static(publicDir));

app.use((_req, res) => {
  res.sendFile(indexFile);
});

app.listen(port, () => {
  console.log(`Receipt clone listening on http://localhost:${port}`);
});
