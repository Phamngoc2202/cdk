const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "public");
const indexFile = path.join(publicDir, "index.html");

app.disable("x-powered-by");

app.get("/", (_req, res) => {
  res.redirect("/redeem/chatgpt");
});

app.use(express.static(publicDir));

app.use((_req, res) => {
  res.sendFile(indexFile);
});

app.listen(port, () => {
  console.log(`Receipt clone listening on http://localhost:${port}`);
});
