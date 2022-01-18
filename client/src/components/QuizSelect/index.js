import React, { useState } from "react";
import "./QuizSelect.css";
import { NavBar } from "./";

// fetch api trivia in here
function QuizSelect() {
  return (
    <div className="QuizSelection">
      <h1>Select New Quiz</h1>
      <form>
        <div>Category</div>
        <select>
          <option>Volvo</option>
          <option>new</option>
        </select>

        <div>Difficulty Level</div>

        <div>Number of Questions (1-20)</div>
        <input type="range" min="0" max="20" />
        <div></div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default QuizSelect;
