import React from "react";
import "./home.css";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <div id="welcome">Welcome to inQUIZitive!</div>
      <main className="button-stack">
        <Link to="/QuizPage">
          <button className="button">New Quiz</button>
        </Link>
        <Link to="/join">
          <button className="button">Join Game</button>
        </Link>
        <Link to="LeaderBoard">
          <button className="button">LeaderBoard</button>
        </Link>
      </main>
    </div>
  );
}

export default Home;
