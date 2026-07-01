# Auth Testing Playbook

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify bcrypt hash starts with `$2b$`; indexes on users.email (unique), login_attempts.identifier, password_reset_tokens.expires_at (TTL).

## Step 2: API Testing (Bearer token flow)
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
TOKEN=$(curl -s -X POST "$API/api/auth/login" -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
curl -s "$API/api/auth/me" -H "Authorization: Bearer $TOKEN"
```
Login returns `{ user, access_token }`. `/auth/me` returns same user with the Bearer token.
