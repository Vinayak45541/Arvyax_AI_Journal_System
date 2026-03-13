export default function UsernameInput({ setUser }) {

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.username.value;

    localStorage.setItem("journalUserId", name);
    setUser(name);
  };

  return (
    <div className="container">

      <h1>AI Journal</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Enter your name"
          required
        />

        <button type="submit">
          Start Journaling
        </button>

      </form>

    </div>
  );
}