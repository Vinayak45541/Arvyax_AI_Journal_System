# ArvyaX AI-Assisted Journal System

## Overview

The **AI-Assisted Journal System** is a full-stack application that allows users to write journal entries after immersive nature sessions. The system stores each entry, analyzes emotional tone using a **Large Language Model (LLM)**, and generates insights about the user’s emotional patterns over time.

This project was developed as part of the **ArvyaX technical assignment** to demonstrate practical understanding of:

* REST API design
* LLM integration
* Data modeling
* Frontend-backend integration
* System architecture thinking

The application is intentionally designed to be **simple, modular, and scalable** while remaining easy to run locally and deploy.

---

# Core Problem

ArvyaX provides immersive nature experiences such as:

* 🌲 Forest
* 🌊 Ocean
* ⛰ Mountain

After completing a session, users write a journal entry describing how they felt.

The system must:

1. Store the journal entry
2. Analyze emotional tone using an LLM
3. Track emotional insights over time

---

# Key Features

## Journal Entry System

Users can create journal entries describing their emotional experience after a nature session.

Each entry contains:

* `userId` – user identifier
* `ambience` – session environment (forest / ocean / mountain)
* `text` – journal content
* `emotion` – AI detected emotional tone
* `keywords` – important emotional keywords
* `summary` – short summary of the entry

### Example Entry Stored in Database

```json
{
  "userId": "vinayak",
  "ambience": "forest",
  "text": "I felt calm today after listening to rain.",
  "emotion": "calm",
  "keywords": ["rain","nature","peace"],
  "summary": "User experienced relaxation while listening to rain."
}
```

The **LLM analysis result is stored together with the journal entry in MongoDB**.
This allows emotional insights to be generated later without calling the LLM again.

---

# Client-Side User Identification

The assignment did not require authentication, so the application uses a **lightweight client-side identification mechanism**.

When a user enters their name, it is stored in the browser using **localStorage**.

```javascript
localStorage.setItem("journalUserId", username)
```

When the application loads again, it retrieves the stored identifier:

```javascript
localStorage.getItem("journalUserId")
```

This allows the system to:

* associate journal entries with a specific user
* automatically reload previous entries
* support multiple users without authentication

A **Switch User** button clears localStorage and allows another user to start a new journaling session.

---

# Emotion Analysis Using LLM

The system integrates with the **Groq API** to perform emotion analysis on journal text.

The model used:

```
llama-3.3-70b-versatile
```

Groq was chosen because:

* extremely fast LLM inference
* OpenAI-compatible API format
* free developer tier suitable for prototypes

The LLM extracts:

* primary emotion
* emotional keywords
* summary of the journal entry

### Example LLM Response

```json
{
  "emotion": "calm",
  "keywords": ["rain","nature","peace"],
  "summary": "User experienced relaxation while listening to rain."
}
```

---

# Handling LLM JSON Output

LLM responses may sometimes return JSON inside markdown code blocks.

Example:

```json
{
  "emotion": "calm"
}
```

To ensure reliable parsing, the backend sanitizes the response before calling:

```javascript
JSON.parse()
```

This prevents runtime parsing errors and ensures structured data is stored correctly in MongoDB.

---

# Insights Dashboard

The application provides a simple **Insights Dashboard** that summarizes emotional trends.

The dashboard displays:

* Total number of journal entries
* Most frequent emotion
* Most used ambience
* Recent emotional keywords

### Example Insights Response

```json
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus","nature","rain"]
}
```

Insights are calculated using **database aggregation logic**, not additional LLM calls.
This reduces API cost and improves performance.

---

# Automatic UI Updates

The frontend automatically refreshes journal history and insights when a new entry is created.

Flow:

```
User saves journal entry
        ↓
Backend stores entry + LLM analysis
        ↓
Frontend refresh state updates
        ↓
Journal history reloads
        ↓
Insights recomputed
```

This creates a **near-real-time insights dashboard**.

---

# Minimal UI Design

The assignment specifically states that **UI quality is not important**, so the frontend intentionally uses:

* simple React components
* minimal styling
* no heavy UI frameworks

The primary focus of this project is:

* backend API design
* LLM integration
* data modeling
* system architecture

rather than visual complexity.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Groq LLM API
* Axios
* Express Rate Limiter

## Frontend

* React (Vite)
* Axios

## Deployment

* Render (Backend Service)
* Render Static Site (Frontend)

---

# Project Structure

```
arvyax-ai-journal-system
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── models
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   └── src
│       ├── components
│       ├── services
│       └── App.jsx
│
├── README.md
└── ARCHITECTURE.md
```

---

# Environment Variables

## Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

A `.env.example` file is included in the repository.

---

## Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

# Local Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Vinayak45541/Arvyax_AI_Journal_System.git
cd Arvyax_AI_Journal_System
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` using `.env.example`.

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Endpoints

## Create Journal Entry

```
POST /api/journal
```

Stores the journal entry and performs LLM emotion analysis.

Example request:

```json
{
  "userId": "vinayak",
  "ambience": "forest",
  "text": "I felt calm today after listening to rain."
}
```

---

## Get User Entries

```
GET /api/journal/:userId
```

Returns all journal entries belonging to the user.

---

## Analyze Journal Text

```
POST /api/journal/analyze
```

Runs LLM analysis without storing the entry.

---

## Get Insights

```
GET /api/journal/insights/:userId
```

Returns aggregated emotional insights.

---

# Deployment

The project is deployed using **Render**.

## Backend

Render **Web Service** hosting the Express API.

## Frontend

Render **Static Site** hosting the React application.

---

# Live Demo

Frontend

```
[Add deployed frontend link here]
```

Backend API

```
[Add deployed backend link here]
```

---

# Bonus Features Implemented

* Rate limiting to protect LLM endpoints
* Environment variable management
* Deployed full-stack demo
* Clean modular backend architecture

---

# Future Improvements

Possible improvements include:

* user authentication system
* emotion trend visualization charts
* Redis caching for LLM results
* background job queues for analysis
* advanced analytics dashboard

---

# Author

**Vinayak**
Information Science & Engineering Student
