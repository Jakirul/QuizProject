import React, { useEffect } from "react";
import {
  Home,
  LeaderBoard,
  LoginRegister,
  QuizWaiting,
  QuizJoin
} from "./pages";

import {
  QuizGame,
  QuizSelect,
  QuizResults
} from './components'
import { Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'

import './style.css'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser.username)
  console.log(isLoggedIn, currentUser)
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.clear()
    }
  }, [])
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/LoginRegister" element={<LoginRegister />} />
        <Route exact path="/join" element={<QuizJoin />} />
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
