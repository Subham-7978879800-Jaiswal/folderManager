import { useEffect } from "react";
import useApp from "./Hooks/useApp";
import Home from "./components/Home";
import FolderManager from "./components/FolderManager";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { getAllAppsServiceCall } = useApp();

  useEffect(() => {
    getAllAppsServiceCall();
  }, []);

  return (
    <Router className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route exact path="/:appId" element={<FolderManager />} />
      </Routes>
    </Router>
  );
}

export default App;
