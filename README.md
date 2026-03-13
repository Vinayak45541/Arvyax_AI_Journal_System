# ArvyaX AI-Assisted Journal System

## Overview

The **AI-Assisted Journal System** is a full-stack application that allows users to write journal entries after experiencing immersive nature sessions. The system stores the entries, analyzes the emotional tone using a Large Language Model (LLM), and generates insights about the user’s emotional patterns over time.

This project was built as part of the **ArvyaX technical assignment** to demonstrate practical understanding of:

* REST API design
* LLM integration
* data modeling
* frontend integration
* system architecture thinking

The application is intentionally designed to be **simple, modular, and scalable** while remaining easy to run and deploy.

---

# Core Problem

ArvyaX provides immersive nature experiences such as **forest**, **ocean**, and **mountain** environments.

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

* user identifier
* nature ambience (forest / ocean / mountain)
* journal text
* AI generated emotion analysis

Example entry stored in database:

```
{
  "userId": "vinayak",
  "ambience": "forest",
  "text": "I felt calm today after listening to rain.",
  "emotion": "calm",
  "keywords": ["rain","nature","peace"],
  "summary": "User experienced relaxation while listening to rain."
}
```

Entries are stored in **MongoDB** and retrieved using the user identifier.

---

# Client-Side User Identification

The assignment did not require implementing a full authentication system.

Instead, the application uses a lightweight **client-side identification approach**.

When a user enters their name for the first time, the application stores it in the browser using **localStorage**.

```
localStorage.setItem("journalUserId", username)
```

When the application loads again, it automatically retrieves the stored identifier:

```
localStorage.getItem("journalUserId")
```

This allows the system to:

* associate journal entries with a user
* automatically reload previous entries
* support multiple users without authentication

A **Switch User** button clears localStorage and allows another user to start a new session.

---

# Emotion Analysis Using LLM

The system integrates with the **Groq API** to perform emotion analysis on journal text.

Groq was chosen because:

* it provides fast LLM inference
* it supports OpenAI-compatible APIs
* it has a free developer tier suitable for prototypes

The LLM extracts:

* primary emotion
* key emotional keywords
* a short summary of the journal

Example response:

```
{
  "emotion": "calm",
  "keywords": ["rain","nature","peace"],
  "summary": "User experienced relaxation while listening to rain."
}
```

---

# Handling LLM JSON Output

LLM responses sometimes return JSON inside markdown code blocks.

Example:

````
```json
{ ... }
````

```

To ensure reliable parsing, the backend cleans the response before calling `JSON.parse()`.

This prevents runtime errors and guarantees structured data storage.

---

# Insights Dashboard

The application provides a simple **insights dashboard** that summarizes the user's emotional history.

The insights include:

- Total number of journal entries
- Most frequent emotion
- Most used ambience
- Recently extracted keywords

Example response:

```

{
"totalEntries": 8,
"topEmotion": "calm",
"mostUsedAmbience": "forest",
"recentKeywords": ["focus","nature","rain"]
}

```

Insights are computed using **database aggregation logic** rather than the LLM to reduce cost and improve performance.

---

# Automatic UI Updates

The frontend automatically refreshes journal history and insights when a new entry is created.

Flow:

```

User saves journal entry
↓
Backend stores entry + analysis
↓
Frontend refresh state changes
↓
History reloads
↓
Insights recomputed

```

This creates a near real-time dashboard experience.

---

# Minimal UI Design

The assignment specifically mentioned that **UI quality is not important**.

Therefore the frontend intentionally uses:

- simple React components
- minimal styling
- no heavy UI frameworks

The goal is to focus on:

- backend architecture
- API integration
- system design

rather than visual complexity.

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Groq LLM API
- Axios

## Frontend

- React (Vite)
- Axios

## Deployment

- Render (Backend)
- Render Static Site (Frontend)

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

Create a `.env` file in the backend directory:

```

PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key

```

A `.env.example` file is included to show the required variables.

---

# Local Setup Instructions

## Clone the Repository

```

git clone https://github.com/yourusername/arvyax-ai-journal-system.git
cd arvyax-ai-journal-system

```

---

## Setup Backend

```

cd backend
npm install

```

Create `.env` using `.env.example`.

Run the server:

```

npm run dev

```

Backend runs at:

```

http://localhost:5000

```

---

## Setup Frontend

```

cd frontend
npm install
npm run dev

```

Frontend runs at:

```

http://localhost:5173

```

---

# API Endpoints

## Create Journal Entry

```

POST /api/journal

```

Stores the journal entry and performs LLM analysis.

---

## Get User Entries

```

GET /api/journal/:userId

```

Returns all journal entries for a specific user.

---

## Analyze Journal Text

```

POST /api/journal/analyze

```

Runs emotion analysis without storing the entry.

---

## Get Insights

```

GET /api/journal/insights/:userId

```

Returns aggregated emotional insights for the user.

---

# Deployment

The application is deployed using **Render**.

## Backend

Render Web Service hosting the Express API.

## Frontend

Render Static Site hosting the React frontend.

---

# Live Demo

Frontend URL

```

[Add deployed frontend link here]

```

Backend API

```

[Add deployed backend link here]

```

---

# Bonus Features Implemented

- Rate limiting to protect LLM endpoints
- environment variable configuration
- deployed demo
- structured backend architecture

---

# Future Improvements

Possible enhancements include:

- user authentication
- emotion trend visualization
- Redis caching for LLM results
- asynchronous job queues for analysis
- advanced analytics dashboard

---

# Author

Vinayak  
Information Science & Engineering Student
```
