import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizJoin.css";
import { NavBar } from "../../components";

const JoinQuiz = () => {
  const history = useNavigate();
  const [result, setResult] = useState();

  const joinRoom = async (e) => {
    e.preventDefault();


    const findLobby = await fetch(
      `http://localhost:3001/exists/${e.target.room.value}`
    );
    const data = await findLobby.json();
    if (!data.length || data === "Error, cannot find a lobby") {
      setResult(`Cannot find a lobby with the name: ${e.target.room.value}`);
    } else {
      window.location.href = `http://localhost:3000/room/${e.target.room.value}`;
    }

  };
  return (
    <div className="join" role="join">
      <NavBar />
      {/* <button className="back" onClick={() => history(-1)}>
        Go back
      </button> */}
      <div className="inner-joinquiz">
        <h1>Join Existing Lobby</h1>

        <form role="joinForm" className="joinForm" onSubmit={joinRoom}>
          <input name="room" required placeholder="Enter lobby name here" />
          <input type="submit" value="Go!" role="go" />
        </form>

        <b>{result}</b>
      </div>
    </div>
  );
};

export default JoinQuiz;
