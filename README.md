# Test Automation & DevOps Practice Ground

A **3-tier full-stack app** built for **SDET** and **DevOps** engineers to practice UI automation, API testing, and CI/CD deployment against one realistic target.

- **Frontend:** React (dark IDE theme) — 30 UI automation practice sections
- **Backend:** FastAPI (Python) — JWT auth + a documented, testable REST API
- **Database:** MongoDB
- **Extras:** JS utilities for Jest/Vitest, Docker + docker-compose, GitHub Actions CI, sample pytest & Playwright suites

---

## Why this exists

Instead of many small demo apps, you get **one deployable target** you can automate with **Selenium, Playwright, Cypress and RestAssured**, plus API-level tests and unit tests. Every interactive element exposes a stable `data-testid`.

---

## Features

### UI Practice (30 sections, each on its own page → map to a Page Object)
Basic Form • Button Interactions • Checkboxes & Radio • Dropdowns • Locator Practice • Dynamic Content • Waits & Sync • Table Automation • Alerts • Modal Dialog • iFrame • Shadow DOM • Drag & Drop • Hover Menu • Tooltip • File Upload • Download • Hidden Elements • Scroll Testing • Multiple Windows • Auth Simulation • Stale Element • Dynamic List • Network Delay • Flaky Element • Keyboard Actions • Slider • Date Picker • Tab Components • Complex DOM

### REST API Playground (`/api/playground/*`)
| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/health` | no | health check |
| GET | `/todos?page=&limit=&completed=&search=` | no | paginated list |
| POST | `/todos` | yes | create |
| GET | `/todos/{id}` | no | fetch one (404 practice) |
| PUT | `/todos/{id}` | yes | update |
| DELETE | `/todos/{id}` | yes | delete |
| GET | `/status/{code}` | no | echo any HTTP status |
| GET | `/delay/{seconds}` | no | delayed response |
| GET | `/flaky` | no | ~50/50 success / 500 |
| POST | `/echo` | no | echo JSON body |
| GET | `/users` | no | static list for filtering |

### Auth (`/api/auth/*`)
`register`, `login` (returns `access_token` + httpOnly cookie), `me`, `logout`, `refresh`. Brute-force lockout after 5 failed attempts.

**Seeded admin:** `admin@example.com` / `admin123`

---

## Run locally (dev)

Backend and frontend are managed by supervisor in this environment. Locally:

```bash
# backend
cd backend && pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001

# frontend
cd frontend && yarn install && yarn start
```

## Run with Docker

```bash
docker-compose up --build
# frontend → http://localhost:8080
# backend  → http://localhost:8001
# mongo    → localhost:27017
```

---

## Testing

### API tests (pytest + requests)
```bash
pip install requests pytest
BASE_URL=http://localhost:8001 pytest tests/api -q
```

### E2E tests (Playwright)
```bash
npm i -D @playwright/test && npx playwright install --with-deps
BASE_URL=http://localhost:3000 npx playwright test
```

### Selenium / Cypress
Point your framework at the frontend URL. Every element has a `data-testid`; the grid cards use `practice-card-<slug>` and each section page lives at `/practice/<slug>`.

### RestAssured (Java) — API example
```java
given().baseUri("http://localhost:8001/api")
  .contentType("application/json")
  .body("{\"email\":\"admin@example.com\",\"password\":\"admin123\"}")
.when().post("/auth/login")
.then().statusCode(200).body("access_token", notNullValue());
```

### Unit tests (Jest / Vitest)
```bash
cd frontend && yarn test           # Jest via react-scripts
# or Vitest: yarn add -D vitest && npx vitest
```
See `frontend/src/lib/jsUtils.js` and `jsUtils.test.js`.

---

## CI

`.github/workflows/ci.yml` runs three jobs: backend pytest (with a MongoDB service), frontend unit tests, and Playwright e2e — a ready template to extend.
