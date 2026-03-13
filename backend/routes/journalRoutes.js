import express from "express";
import {
  createJournal,
  getUserEntries,
  getInsights,
  analyzeJournal
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/journal", createJournal);
router.post("/journal/analyze", analyzeJournal);
router.get("/journal/insights/:userId", getInsights);
router.get("/journal/:userId", getUserEntries);

export default router;