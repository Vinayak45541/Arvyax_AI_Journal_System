import { useEffect, useState } from "react";
import { getEntries } from "../services/api";

export default function JournalList({ user, refresh }) {

  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    const res = await getEntries(user);
    setEntries(res.data);
  };

  useEffect(() => {
    loadEntries();
  }, [user, refresh]);

  return (
    <div>

      <h3>Previous Entries</h3>

      {entries.length === 0 && <p>No entries yet.</p>}

      {entries.map((e) => (
        <div key={e._id} className="entry">

          <p><strong>Journal:</strong> {e.text}</p>
          <p><strong>Emotion:</strong> {e.emotion}</p>
          <p><strong>Ambience:</strong> {e.ambience}</p>

        </div>
      ))}

    </div>
  );
}