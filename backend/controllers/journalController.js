import Journal from "../models/Journal.js";
import { analyzeEmotion } from "../services/llmService.js";

export const createJournal = async (req, res) => {
  try {
    const { userId, ambience, text } = req.body;

    const analysis = await analyzeEmotion(text);

    const entry = await Journal.create({
      userId,
      ambience,
      text,
      emotion: analysis.emotion,
      keywords: analysis.keywords,
      summary: analysis.summary
    });

    res.status(201).json(entry);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserEntries = async (req, res) => {
  try {
    const entries = await Journal.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(entries);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInsights = async (req, res) => {
  try {

    const userId = req.params.userId;

    const entries = await Journal.find({ userId });

    if (!entries.length) {
      return res.json({
        totalEntries: 0,
        topEmotion: null,
        mostUsedAmbience: null,
        recentKeywords: []
      });
    }

    const totalEntries = entries.length;

    const emotionCount = {};
    entries.forEach(e => {
      if (e.emotion) {
        emotionCount[e.emotion] =
          (emotionCount[e.emotion] || 0) + 1;
      }
    });

    const topEmotion = Object.keys(emotionCount).reduce((a, b) =>
      emotionCount[a] > emotionCount[b] ? a : b
    );

    const ambienceCount = {};
    entries.forEach(e => {
      ambienceCount[e.ambience] =
        (ambienceCount[e.ambience] || 0) + 1;
    });

    const mostUsedAmbience = Object.keys(ambienceCount).reduce((a, b) =>
      ambienceCount[a] > ambienceCount[b] ? a : b
    );

    const recentKeywords = entries
      .slice(-5)
      .flatMap(e => e.keywords || []);

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const analyzeJournal = async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const analysis = await analyzeEmotion(text);

    res.json(analysis);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};