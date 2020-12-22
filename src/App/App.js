import "./App.css";

//Page
import Homepage from "../Pages/Homepage/homepage";

function App({ user, setUser }) {
  return <Homepage user={user} setUser={setUser} />;
}

export default App;
