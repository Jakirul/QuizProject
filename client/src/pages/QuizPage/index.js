import React from "react";
import { NavBar, QuizSelect } from "../../components";
import QuizWaiting from "../QuizWaiting/index.js";

function QuizPage() {
  return (
    <div>
      <NavBar />
      <main>
        <QuizSelect />
      </main>
    </div>
  );
}

export default QuizPage;
