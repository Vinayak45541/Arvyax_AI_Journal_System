import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const createJournal = (data) =>
  API.post("/journal", data);

export const getEntries = (userId) =>
  API.get(`/journal/${userId}`);

export const analyzeText = (text) =>
  API.post("/journal/analyze", { text });

export const getInsights = (userId) =>
  API.get(`/journal/insights/${userId}`);