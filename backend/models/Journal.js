import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    ambience: {
      type: String,
      enum: ["forest", "ocean", "mountain"],
      required: true
    },

    text: {
      type: String,
      required: true
    },

    emotion: {
      type: String
    },

    keywords: {
      type: [String]
    },

    summary: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Journal", journalSchema);