import React from "react";
import {
  Home,
  LeaderBoard,
  LoginRegister,
  QuizPage,
  QuizWaiting,
} from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LoginRegister" element={<LoginRegister />} />
        <Route exact path="/QuizPage" element={<QuizPage />} />
        <Route exact path="/LeaderBoard" element={<LeaderBoard />} />
        <Route exact path="/QuizWaiting" element={<QuizWaiting />} />
      </Routes>
    </div>
  );
}

export default App;
