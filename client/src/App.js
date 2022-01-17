import React from "react";
import { Home, LeaderBoard, LoginRegister, QuizPage } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/LeaderBoard" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default App;