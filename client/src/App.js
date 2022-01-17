import React from "react";
import { Home, LeaderBoard, LoginRegister, QuizPage } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LoginRegister" element={<LoginRegister />} />
        <Route exact path="/QuizPage" element={<QuizPage />} />
        <Route exact path="/LeaderBoard" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default App;