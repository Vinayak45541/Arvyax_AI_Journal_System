import { useState } from "react";
import UsernameInput from "./components/UsernameInput";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import Insights from "./components/Insights";

import "./App.css";

function App() {

  const [user, setUser] = useState(
    localStorage.getItem("journalUserId")
  );

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  const switchUser = () => {
    localStorage.removeItem("journalUserId");
    setUser(null);
  };

  if (!user) {
    return <UsernameInput setUser={setUser} />;
  }

  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>AI Journal</h1>

        <button onClick={switchUser}>
          Switch User
        </button>
      </div>

      <JournalForm
        user={user}
        refresh={triggerRefresh}
      />

      <JournalList
        user={user}
        refresh={refresh}
      />

      <Insights
        user={user}
        refresh={refresh}
      />

    </div>
  );
}

export default App;