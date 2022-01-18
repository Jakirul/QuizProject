import React, { useState, useEffect } from "react";
import "./QuizSelect.css";
import { NavBar } from "./";

function QuizSelect() {
  const [categorySpace, setCategorySpace] = useState({});

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

    alert("here")
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
      if (gameId.err) {
        throw Error(gameId.err);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="QuizSelection">
      <h1>Select New Quiz</h1>

      <form onSubmit={setGame}>
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
        <input name="range" type="range" min="0" max="20" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default QuizSelect;
