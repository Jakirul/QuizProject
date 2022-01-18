import { useState, useEffect } from 'react'
import { NavBar } from "../../components";
import './Leaderboard.css'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/all/leaderboard")
      .then(res => res.json())
      .then(data => setLeaderboard(data))
  }, [])

  const sorting = (e) => {
    const value = e.target.textContent;
    const sorted = [...leaderboard].sort((a, b) => {
      if (value === "Sort by Ascending") {
        return a.score - b.score;
      }
      else if (value === "Sort by Descending") {
        return b.score - a.score;
      }
      return a.score;
    });
    setLeaderboard(sorted);
  };

  const allLeaderboard = leaderboard.map(leaderboard => {

    return (
      <div className="leaderboard-score" key={leaderboard._id}>
        <p>Name: {leaderboard.name}</p>
        <p>Score: {leaderboard.score}</p>
      </div>
    )
  })

  return (
    <div className="Leaderboard">
      <NavBar />
      <h1>Leaderboard</h1>
      <div className="sorting-btns">
        <button onClick={sorting}>Sort by Ascending</button>
        <button onClick={sorting}>Sort by Descending</button>
      </div>
      {allLeaderboard}

    </div>
  )
}

export default Leaderboard
