# CDK ChatGPT Redeem

Single-page redeem UI + serverless API proxy for Channel 1 and Channel 2.

## Run Local

```bash
npm install
npm run dev
```

Open: `http://localhost:3000/redeem/chatgpt`

## Deploy Notes (Vercel)

- API entrypoint is `api/[...path].js` (standalone Node handler, no Express required in serverless runtime).
- Keep `vercel.json` route:
  - `/(.*)` -> `/api/[...path].js`
- Channel 2 upstreams are tried in order:
  1. `https://doremon.me/shop/api/activate/chatgpt`
  2. `http://zenterra.io.vn/api/new`

Optional env overrides:

- `CHANNEL2_BASE`
- `CHANNEL2_FALLBACK_BASE`

## Quick Health Check

```bash
curl -i "https://<your-domain>/api/channel2/check-cdk/<CDK>"
```

Expected:

- `200` with JSON when code exists
- `404` when code not found
- `503 channel2_upstream_blocked` only when upstream challenge blocks requests
