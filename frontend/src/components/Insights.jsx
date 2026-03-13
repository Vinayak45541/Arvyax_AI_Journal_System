import { useEffect, useState } from "react";
import { getInsights } from "../services/api";

export default function Insights({ user, refresh }) {

  const [data, setData] = useState(null);

  const loadInsights = async () => {
    const res = await getInsights(user);
    setData(res.data);
  };

  useEffect(() => {
    loadInsights();
  }, [user, refresh]);

  if (!data) return null;

  return (
  <div className="insights-box">

    <h3>Insights</h3>

    <p>Total Entries: {data.totalEntries}</p>
    <p>Top Emotion: {data.topEmotion}</p>
    <p>Most Used Ambience: {data.mostUsedAmbience}</p>

    <p>
      Keywords: {data.recentKeywords?.join(", ")}
    </p>

  </div>
);
}