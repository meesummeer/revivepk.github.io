# Form submission API

Sends consultation and careers form data to **meesumdameer@gmail.com** via [Resend](https://resend.com).

## Setup

1. **Install dependencies**
   ```bash
   cd server && npm install
   ```

2. **Configure email**
   - Sign up at [resend.com](https://resend.com) and get an API key.
   - Copy `server/.env.example` to `server/.env`.
   - Set `RESEND_API_KEY=re_xxxxx` (and optionally `TO_EMAIL`, `FROM_EMAIL`).

3. **Run the API**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3001`.

## Running the full app

- **Terminal 1:** `npm run dev` (Vite frontend on port 8080; proxies `/api` to the server).
- **Terminal 2:** `cd server && npm run dev` (API on port 3001).

Submissions from the consultation and careers forms are emailed to `TO_EMAIL` (default: meesumdameer@gmail.com). Careers applications include the CV as an attachment when provided.
