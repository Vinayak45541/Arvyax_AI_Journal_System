import axios from "axios";

export const analyzeEmotion = async (text) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Analyze the journal entry and return ONLY raw JSON without markdown. Format: { emotion: string, keywords: string[], summary: string }"
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    // remove markdown formatting if LLM returns ```json
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return parsed;

  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    throw error;
  }
};