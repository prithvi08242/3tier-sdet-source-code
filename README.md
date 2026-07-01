# PracticeGround — Test Automation & DevOps Practice Ground

A **3-tier full-stack app** built for **SDET** and **DevOps** engineers to practice UI automation, API testing, and CI/CD against one realistic target.

- **Frontend:** React (dark IDE theme)
- **Backend:** FastAPI (Python) — JWT auth + a documented, testable REST API
- **Database:** MongoDB
- **Extras:** Docker + docker-compose, GitHub Actions CI, sample pytest / Playwright / Jest suites

> Automate it with **Selenium, Playwright, Cypress, or RestAssured**. Every interactive element exposes a stable `data-testid`.

---

## ✨ Features

- **Practice** — 30 UI-automation sections, each on its own page (`/practice/<slug>`): forms, dropdowns, waits, tables, iframe, shadow DOM, drag & drop, alerts, modals, tabs, sliders, date picker, and more.
- **API Playground** (`/rest-playground`) — documented REST endpoints (CRUD, pagination, status codes, delay, flaky, echo) for API-testing practice.
- **Shop** — full e-commerce flow: catalog → product detail → cart → **dynamic checkout** (cascading country→state dropdowns, async ZIP auto-populate, shipping-method selection) → **order confirmation** → order history.
- **Auth** — JWT login/register/logout, bcrypt hashing, brute-force lockout. All app pages are login-gated.

---

## 🔐 Default Accounts (seeded on startup)

| Role  | Email                          | Password           |
|-------|--------------------------------|--------------------|
| Admin | `admin@example.com`            | `admin123`         |
| User  | `tester@practiceground.dev`    | `Test@Ground2026`  |

Change these via `ADMIN_*` / `DEFAULT_USER_*` in `backend/.env` (the seeder updates the password on restart).

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+** and **Yarn**
- **Python 3.11+**
- **MongoDB** (local install, or run via Docker: `docker run -d -p 27017:27017 mongo:7.0`)

### 1) Clone
```bash
git clone <your-repo-url>
cd <repo>
```

### 2) Configure environment
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
Edit `backend/.env` and set a real `JWT_SECRET` (e.g. `openssl rand -hex 32`).

### 3) Run the backend
```bash
cd backend
pip install -r requirements.txt      # or: pip install fastapi "uvicorn[standard]" motor pymongo pyjwt bcrypt email-validator python-dotenv "pydantic>=2"
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```
Backend is at **http://localhost:8001** (interactive docs at **http://localhost:8001/docs**).

### 4) Run the frontend
```bash
cd frontend
yarn install
yarn start                            # opens http://localhost:3000
```

Open **http://localhost:3000** and log in with a seeded account above.

---

## 🐳 Run with Docker (one command)

```bash
docker-compose up --build
```
| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:8080  |
| Backend  | http://localhost:8001  |
| MongoDB  | localhost:27017        |

---

## 📡 API Reference

Base: `{BACKEND_URL}/api`

### Auth (`/auth`)
`POST /register` · `POST /login` (returns `access_token` + httpOnly cookie) · `GET /me` · `POST /logout` · `POST /refresh`

### Playground (`/playground`)
| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/health` | no | health check |
| GET | `/todos?page=&limit=&completed=&search=` | no | paginated list |
| POST | `/todos` | yes | create |
| GET/PUT/DELETE | `/todos/{id}` | mixed | fetch / update / delete |
| GET | `/status/{code}` | no | echo any HTTP status |
| GET | `/delay/{seconds}` | no | delayed response |
| GET | `/flaky` | no | ~50/50 success / 500 |
| POST | `/echo` | no | echo JSON body |

### Shop (`/shop`)
| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/products?category=&search=` | yes | list + filters |
| GET | `/products/{id}` | yes | product detail |
| POST | `/orders` | yes | place order (server computes subtotal + shipping) |
| GET | `/orders` | yes | my orders |
| GET | `/orders/{id}` | yes | single order (confirmation page) |

---

## 🧪 Testing

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

### Unit tests (Jest)
```bash
cd frontend && yarn test --watchAll=false
```

### RestAssured (Java) — quick example
```java
given().baseUri("http://localhost:8001/api")
  .contentType("application/json")
  .body("{\"email\":\"admin@example.com\",\"password\":\"admin123\"}")
.when().post("/auth/login")
.then().statusCode(200).body("access_token", notNullValue());
```

---

## 🔁 CI

`.github/workflows/ci.yml` runs three jobs on push/PR:
1. **backend-test** — spins up MongoDB, starts the API, runs pytest against it.
2. **frontend-unit** — Jest unit tests.
3. **e2e** — Playwright (extend with your own specs under `tests/e2e`).

---

## 📁 Project Structure
```
├── backend/
│   ├── server.py            # FastAPI app: auth + playground + shop
│   ├── requirements.txt
│   ├── .env.example
│   └── tests/               # pytest suites
├── frontend/
│   ├── src/
│   │   ├── pages/           # Landing, Login, Register, Practice, ApiPlayground, shop/*
│   │   ├── sections/        # 30 UI practice section components
│   │   ├── context/         # AuthContext, CartContext
│   │   ├── hooks/           # useCheckoutForm, ...
│   │   ├── data/            # sections, locations
│   │   └── components/      # Layout, ProtectedRoute, ui/
│   └── .env.example
├── tests/
│   ├── api/                 # pytest API specs
│   └── e2e/                 # Playwright specs
├── Dockerfile.backend
├── Dockerfile.frontend
├── docker-compose.yml
└── .github/workflows/ci.yml
```

---

## 📝 Notes
- Frontend must call the backend via `REACT_APP_BACKEND_URL`; backend must use `MONGO_URL` / `DB_NAME` from env.
- `access_token` is stored in `localStorage` (so you can grab it for API-testing practice) **and** set as an httpOnly cookie by the backend.
- This is a learning/practice app — for production, set `secure=True` cookies over HTTPS and rotate `JWT_SECRET`.
