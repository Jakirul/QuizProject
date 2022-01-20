import { useState, useEffect } from "react";
import { NavBar } from "../../components";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/all/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data));
  }, []);

  const sorting = (e) => {
    const value = e.target.textContent;
    const sorted = [...leaderboard].sort((a, b) => {
      if (value === "Sort by Ascending") {
        return a.score - b.score;
      } else if (value === "Sort by Descending") {
        return b.score - a.score;
      }
      return a.score;
    });
    setLeaderboard(sorted);
  };

  const allLeaderboard = leaderboard.map((leaderboard) => {
    return (
      <div
        className="leaderboard-score"
        role="leaderboard-score"
        key={leaderboard._id}
      >
        <p>Name: {leaderboard.name}</p>
        <p>Score: {leaderboard.score}</p>
      </div>
    );
  });

  return (
    <div className="Leaderboard" role="leaderboard">
      <NavBar />
      <h1 role="header">Leaderboard</h1>
      <div className="overall-board">
        <div className="sorting-btns">
          <button onClick={sorting} role="Ascending">
            Sort by Ascending
          </button>
          <button onClick={sorting} role="Descending">
            Sort by Descending
          </button>
        </div>
        {allLeaderboard}
      </div>
    </div>
  );
};

export default Leaderboard;
