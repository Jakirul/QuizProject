import React from "react";
import "./home.css";
import { NavBar } from "../../components";

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <button>New Quiz</button>
        <button>Join Game</button>
        <button>LeaderBoard</button>
      </main>
    </>
  );
}

export default Home;
