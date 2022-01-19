import React, { useState, useEffect } from "react";
import "./QuizSelect.css";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../../components";
import QuizGame from "../QuizGame";

function QuizSelect() {
  const [categorySpace, setCategorySpace] = useState({});
  const [currVal, setCurrVal] = useState(10);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    data.trivia_categories.forEach((data) => {
      setCategorySpace((prevState) => ({ ...prevState, [data.id]: data.name }));
    });
  };

  const fullCategory = Object.keys(categorySpace).map((cat) => {
    return (
      <option key={cat} value={cat}>
        {categorySpace[cat]}
      </option>
    );
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const setGame = async (e) => {
    e.preventDefault();

    const form = e.target;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const r = await fetch(
        `http://localhost:3001/game/${form.categoryId.value}/${form.difficulty.value}/${form.range.value}`,
        options
      );
      const gameId = await r.json();

      console.log(gameId);
      navigate(`/room/${gameId}`);

      if (gameId.err) {
        throw Error(gameId.err);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div role="outerDiv" className="QuizSelection">
      <NavBar />
      <h1>Select New Quiz</h1>

      <form className="form" onSubmit={setGame}>
        <div>Category</div>
        <select className="categoryId" name="categoryId">
          {fullCategory}
        </select>

        <div>Difficulty Level</div>
        <select className="difficulty" name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div>Number of Questions (1-20)</div>

        <input
          type="range"
          name="range"
          value={currVal}
          min="1"
          max="20"
          onInput={(e) => setCurrVal(e.target.value)}
        />

        <label htmlFor="range">{currVal}</label>

        <input type="submit" />
      </form>
      {/* <QuizGame maxQVal={currVal} /> */}
    </div>
  );
}

export default QuizSelect;
