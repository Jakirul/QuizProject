import React from "react";
import {
  Home,
  LeaderBoard,
  LoginRegister,
  QuizPage,
  QuizWaiting,
} from "./pages";

import {
  QuizGame,
  QuizSelect,
  QuizResults
} from './components'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LoginRegister" element={<LoginRegister />} />
        <Route exact path="/QuizPage" element={<QuizSelect />} />
        <Route exact path="/results/:id" element={<QuizResults />} />
        <Route exact path="/quiz/:id" element={<QuizGame />} />
        <Route exact path="/LeaderBoard" element={<LeaderBoard />} />
        <Route exact path="/room/:id" element={<QuizWaiting />} />
      </Routes>
    </div>
  );
}

export default App;
