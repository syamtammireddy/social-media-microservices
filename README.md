# 🧠 Backend Microservices - Team Guide

This is the **Backend System** for the Social Media Platform.

---

## 🚀 Architecture Overview

```
Frontend → API Gateway → Microservices → Databases
```

Each service is:

* Independent
* Dockerized
* Owns its own database

---

## ⚠️ STRICT RULES 

* ❌ Do NOT change ports

* ❌ Do NOT change API routes

* ❌ Do NOT change field names

* ❌ Do NOT directly access other DBs

* ✅ Each service must be independent

* ✅ Use API Gateway for all communication (external)

* ✅ Use service names inside Docker (internal)

---

## 🌐 FIXED PORTS (DO NOT CHANGE)

| Service              | Port |
| -------------------- | ---- |
| Controller Service   | 4000 |
| Auth Service         | 4001 |
| User Service         | 4002 |
| Post Service         | 4003 |
| Feed Service         | 4004 |
| Comment Service      | 4005 |
| Friend Service       | 4006 |
| Notification Service | 4007 |
| API Gateway          | 4008 |

---

## 🗄️ DATABASE PER SERVICE

| Service      | DB         |
| ------------ | ---------- |
| Auth         | auth-db    |
| User         | user-db    |
| Post         | post-db    |
| Friend       | friend-db  |
| Comment      | comment-db |
| Notification | notify-db  |

---

## 🔗 INTERNAL SERVICE URLS (DOCKER)

Use these INSIDE services:

```
http://auth-service:4001
http://user-service:4002
http://post-service:4003
http://feed-service:4004
http://comment-service:4005
http://friend-service:4006
http://notification-service:4007
```

---

## 📡 API ROUTES (FIXED CONTRACT)

### 🔐 Auth

```
POST /auth/register
POST /auth/login
```

### 👤 User

```
GET /user/:id
PUT /user/:id
```

### 🤝 Friend

```
POST /friend/follow
POST /friend/unfollow
GET /friend/following/:id
GET /friend/followers/:id
```

### 📝 Post

```
POST /post (multipart/form-data)
POST /post/like
POST /post/repost
GET /post/:id
```

### 📰 Feed

```
GET /feed/:userId
```

### 💬 Comment

```
POST /comment
GET /comment/:postId
```

### 🔔 Notification

```
POST /notify
GET /notify/:userId
```

### 🎛️ Controller

```
GET /services
POST /toggle
```

---

## 📦 COMMON RESPONSE FORMAT

All APIs must return:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

---

##  RULES

* Test your service individually first
* Use mock data if other services are not ready
* Do not wait for others to complete

---

## 🐳 RUN PROJECT

```bash
docker-compose up --build
```

---

## 🧠 TEAM WORKFLOW (IMPORTANT)

### 🔹 Step 1: Pull latest code

```bash
git pull origin main
```

---

### 🔹 Step 2: Create your own branch

Each member MUST work on a separate branch:

```bash
git checkout -b your-service-name
```

Examples:

```bash
git checkout -b auth-service
git checkout -b post-service
git checkout -b friend-service
```

---

### 🔹 Step 3: Work ONLY on your service

* Do not modify other service folders
* Follow API contract strictly

---

### 🔹 Step 4: Commit your changes

```bash
git add .
git commit -m "your service update"
```

---

### 🔹 Step 5: Push your branch

```bash
git push origin your-service-name
```

---

### 🔹 Step 6: Merge to main (after testing)

```bash
git checkout main
git pull origin main
git merge your-service-name
git push origin main
```

---

## ⚠️ IMPORTANT RULES FOR TEAM

* ❌ Never push directly to main

* ❌ Never change another service's code

* ❌ Never change ports or API structure

* ✅ Always pull before starting work

* ✅ Always use branches

* ✅ Test your service before merging

---

## 💬 FINAL NOTE

Follow API contracts strictly.

This project depends on consistency across services.
WORKFLOW

Step 1: Setup repo, folder structure, README, API contracts

Step 2: Create branches and start parallel development (each service separately)

Step 3: Implement and test each service locally (basic APIs working)

Step 4: Integrate all services using Docker Compose

Step 5: Test complete flow via API Gateway (login, post, feed, etc.)

Step 6: Fix bugs and stabilize system (ensure all services communicate properly)

Step 7: Build Docker images for each service

Step 8: Set up Kubernetes (Minikube)

Step 9: Create Kubernetes YAML files (Deployment + Service for each microservice)

Step 10: Deploy all services using kubectl apply

Step 11: Verify pods, services, and scaling in Kubernetes

Step 12: Build frontend (React) and connect to API Gateway

Step 13: Final testing + demo
