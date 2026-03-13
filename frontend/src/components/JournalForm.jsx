import { createJournal } from "../services/api";

export default function JournalForm({ user, refresh }) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const ambience = e.target.ambience.value;

    await createJournal({
      userId: user,
      ambience,
      text
    });

    e.target.reset();

    if (refresh) refresh();
  };

  return (
    <form onSubmit={handleSubmit}>

      <select name="ambience" required>
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
        <option value="mountain">Mountain</option>
      </select>

      <textarea
        name="text"
        placeholder="Write journal..."
        required
      />

      <button type="submit">Save Entry</button>

    </form>
  );
}