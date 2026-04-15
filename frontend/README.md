# 🌐 Frontend Service (React)

This is the **Frontend Microservice** of the Social Media Platform.

---

## 🚀 Tech Stack (LATEST STABLE)

* **React 18+ (with Vite)**
* **Node.js 18+ (recommended 20+)**
* **Axios (API calls)**

---

## 🎯 Role in Architecture

```
Frontend → API Gateway → Microservices → Databases
```

* Acts as **client layer**
* Communicates ONLY via **API Gateway**
* No direct calls to backend services

---

## ⚠️ STRICT RULES

* ❌ Do NOT change framework (use React + Vite only)

* ❌ Do NOT change API base URL

* ❌ Do NOT add random libraries

* ❌ Do NOT directly call backend services

* ✅ Use API Gateway ONLY

* ✅ Follow same folder structure

* ✅ Keep UI simple initially

---

## 📦 Setup (WHEN BACKEND IS READY)

```bash
cd frontend
npm create vite@latest .
npm install
npm install axios
```

---

## 🌐 API BASE URL

Always use:

```
http://localhost:4008
```

---

## 📁 Expected Structure

```
frontend/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Feed.jsx
```

---

## 🎯 Initial Pages

1. Login Page
2. Feed Page
3. Create Post

---

## 💬 Notes

* Backend must be running first
* Use axios for API calls
* Keep UI minimal (functionality first)

---


