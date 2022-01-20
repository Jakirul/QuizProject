import React, { useState, useEffect } from "react";
import { userAnswer } from "../../redux/actions/action.js";
import { useSelector, useDispatch } from "react-redux";
import "./QuizGameQuestions.css";
// import { Timer } from '../index.js';

function QuizGameQuestions({ options, disabled, setDisabled, timer, reset }) {
  const socketConnection = useSelector(
    (state) => state.player.socketConnection
  );

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    socketConnection.socketConnect.emit(
      "isReady",
      socketConnection.socketConnect.id
    );
    setDisabled(true);
    dispatch(userAnswer(selectedOption));
    setSelectedOption(null);
    reset();
  };

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
    }
  }, [timer]);

  const questionList = options.map((question, index) => {
    return (
      <button
        key={index}
        className={selectedOption === question ? "selected-option" : null}
        onClick={() => setSelectedOption(question)}
      >
        <span dangerouslySetInnerHTML={{ __html: question }}></span>
      </button>
    );
  });
  return (
    <div role="QuizGameQuestions">
      {/* <Timer handleSubmit={handleSubmit} /> */}
      {questionList}
      <div>
        {selectedOption && (
          <button onClick={handleSubmit} role="btn" disabled={disabled}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizGameQuestions;
