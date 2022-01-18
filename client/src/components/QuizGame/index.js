import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { retrieveQuizAnswer, unreadyPlayers } from '../../redux/actions/action.js'
import GameQuizQuestions from '../QuizGameQuestions'
import './QuizGame.css'

function QuizGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lobbyPlayers = useSelector(state => state.player.playerList);
  const questions = useSelector(state => state.player.questions)
  const socketConnection = useSelector(state => state.player.socketConnection)
  const answers = useSelector(state => state.player.answerList)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [disableQuestion, setDisableQuestion] = useState(false);
  

  useEffect(() => {
    dispatch(retrieveQuizAnswer(id))
  }, [])

  useEffect(() => {
    console.log('rerender')
    if (lobbyPlayers.length > 0) {
      if (lobbyPlayers.every(player => player.userReady === true)) {
        if (currentQuestion < questions.length - 1) {

          // Set timeout so there's a small period of time which tells the user if they are incorrect or not
          setTimeout(() => {
            setDisableQuestion(false)
            setCurrentQuestion(currentQuestion + 1)
            socketConnection.socketConnect.emit('reset')
            socketConnection.socketConnect.emit('timer')
          }, 1000)

          // Currently, a user is set to ready=true once they click 'ready' in a lobby and when they answer one question.
          // However, keeping it at 'true' wont take the user to another question.
          // this dispatch sets the user ready status to false so the program can proceed to the next.
          dispatch(unreadyPlayers())

        } else {
          const player = lobbyPlayers.find(p => p.player.id === socketConnection.socketConnect.id);


          const data = {
            answers,
            username: player.player.username
          }

          let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" }
          }

          fetch(`http://localhost:3001/${socketConnection.socketConnect.id}/${id}/answers`, options)

          setTimeout(() => navigate(`/results/${id}`), 2000)
        }
      }
    }
  }, [lobbyPlayers])

  let players = lobbyPlayers.map((p, i) => {

    // If the user answered the question, it changes this variable
    return (
      <div key={i}>
        {p.userReady === true ? <p className="ready-player">{p.player.username}</p> : <p className="unready-player">{p.player.username}</p>}
      </div>
    )
  });

  return (
    <div>
      {/* <p>timer = {timer}</p> */}
      {questions 
        ?
          <div>
            <h3>Question Number: {currentQuestion + 1}</h3>
            <h1 dangerouslySetInnerHTML={{ __html: (questions[currentQuestion].question) }}></h1>
            <GameQuizQuestions options={questions[currentQuestion].allAnswers} disabled={disableQuestion} setDisabled={setDisableQuestion} />
            {players}
            {disableQuestion === true ? questions[currentQuestion].correctAns === answers[currentQuestion] ? <p>Correct!</p> : <p>Incorrect!</p> : null}
          </div>
        :
          null
      }
    </div>
  );
}

export default QuizGame;
