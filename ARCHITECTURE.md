# System Architecture

## Overview

The AI-Assisted Journal System follows a **modular client–server architecture** designed to support scalable emotional analysis for journal entries.

The system separates user interaction, backend processing, and data storage into independent layers to ensure maintainability, scalability, and clear separation of responsibilities.

The architecture consists of three primary components:

1. Frontend client (React)
2. Backend API service (Node.js + Express)
3. Data storage and AI analysis services (MongoDB + Groq LLM)

---

# High-Level Architecture

```
React Frontend
      │
      │ REST API
      ▼
Express Backend
      │
      ├── Journal Entry Service
      ├── LLM Analysis Service
      └── Insights Aggregation Service
      │
      ▼
MongoDB Database
      │
      ▼
Groq LLM API
```

---

# Component Responsibilities

## Frontend Layer

The frontend is built using **React (Vite)** and serves as the user interface for interacting with the journaling system.

Responsibilities:

* collect journal entries from users
* display previously saved entries
* request emotional analysis from the backend
* show emotional insights derived from historical entries

The frontend communicates with the backend through REST APIs.

User identity is maintained using **localStorage**, which stores a lightweight user identifier in the browser.

This approach allows the system to associate journal entries with a user without requiring a full authentication system.

---

## Backend Layer

The backend is implemented using **Node.js with Express**.

Responsibilities include:

* validating incoming API requests
* storing journal entries in the database
* invoking the LLM analysis service
* computing insights from stored entries

The backend exposes REST endpoints such as:

```
POST /api/journal
GET /api/journal/:userId
POST /api/journal/analyze
GET /api/journal/insights/:userId
```

The backend also includes **rate limiting middleware** to protect LLM endpoints from excessive requests.

---

## LLM Integration

The system integrates with the **Groq API** to perform emotion analysis on journal text.

The LLM processes the journal text and returns structured emotional information including:

* primary emotion
* keywords describing emotional context
* a short summary of the user's experience

Because LLM responses may include markdown formatting, the backend sanitizes the response before parsing it into JSON.

This ensures reliable data extraction before storing the analysis results.

---

# Database Design

The system uses **MongoDB** to store journal entries.

Each document contains both the original journal entry and the AI-generated analysis.

Example schema:

```
Journal
{
  userId: String,
  ambience: String,
  text: String,
  emotion: String,
  keywords: [String],
  summary: String,
  createdAt: Date
}
```

This structure enables efficient queries for historical insights and user-specific analysis.

---

# How to Scale This System to 100K Users

To support a large user base, several architectural improvements can be implemented.

## Horizontal Backend Scaling

The backend API can be replicated across multiple servers behind a load balancer.

Example architecture:

```
Load Balancer
     │
 ┌─────────┬─────────┬─────────┐
API Node 1 API Node 2 API Node 3
```

This distributes incoming requests across multiple instances, improving reliability and throughput.

---

## Asynchronous LLM Processing

Currently, LLM analysis occurs synchronously when a journal entry is created.

For large-scale systems, analysis could be moved to a background job system using tools such as:

* Redis Queue
* RabbitMQ
* Kafka

This would allow journal entries to be stored immediately while analysis is processed asynchronously.

---

## Database Scaling

MongoDB can scale through:

* **replication** for high availability
* **sharding** for distributing large datasets across multiple servers

These strategies allow the system to handle large numbers of journal entries and concurrent users.

---

# How to Reduce LLM Cost

LLM calls are the most expensive operation in the system.

Several strategies can reduce cost.

## On-Demand Analysis

The system performs analysis only when a journal entry is created or when the analyze endpoint is triggered.

Insights are computed using database queries rather than additional LLM calls.

---

## Smaller Models

For production deployments, smaller or specialized emotion classification models could replace large general-purpose models.

---

## Batch Processing

Multiple journal entries could be processed together in batch requests to reduce the number of API calls.

---

# How to Cache Repeated Analysis

Users may submit similar or identical journal entries multiple times.

To avoid repeated LLM calls, the system can implement caching.

### Proposed Approach

1. Hash the journal text
2. Store the hash as a key in Redis
3. Store the LLM response as the cached value

Example flow:

```
Journal Text
     │
     ▼
Text Hash
     │
     ▼
Check Redis Cache
     │
     ├── Cache Hit → return stored result
     └── Cache Miss → call LLM → store result
```

This approach significantly reduces redundant LLM calls.

---

# Protecting Sensitive Journal Data

Journal entries may contain personal emotional reflections, so protecting user data is critical.

Several security measures can be implemented.

## HTTPS Encryption

All communication between the frontend and backend should use HTTPS to prevent interception.

---

## Secure Environment Variables

Database credentials and API keys are stored in environment variables rather than source code.

---

## Access Control

In a production system, user authentication should be implemented so that users can only access their own journal entries.

---

## Data Encryption

Sensitive data can be encrypted at rest using database encryption mechanisms.

---

# Conclusion

The AI-Assisted Journal System demonstrates a scalable architecture capable of supporting AI-driven emotional journaling.

By separating the frontend, backend, and AI analysis components, the system remains modular and maintainable.

Future improvements such as authentication, distributed processing, caching, and advanced analytics could further enhance scalability and performance.
