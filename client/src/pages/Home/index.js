import React from "react";
import "./home.css";
import { NavBar } from "../../components";

function Home() {
  return (
    <div>
      <NavBar />
      <main>
        <button>New Quiz</button>
        <button>Join Game</button>
        <button>LeaderBoard</button>
      </main>
    </div>
  );
}

export default Home;
