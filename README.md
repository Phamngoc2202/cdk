# CDK ChatGPT Redeem

Single-page redeem UI + serverless API proxy for Channel 1.

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
## Quick Health Check

```bash
curl -i "https://<your-domain>/api/channel1/task/<TASK_ID>"
```

Expected:

- `200` with JSON task payload when task exists
- `404` when route or task is not found
