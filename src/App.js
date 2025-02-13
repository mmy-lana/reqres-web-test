// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
