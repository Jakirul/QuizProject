import React from "react";
import { NavBar, QuizSelect } from "../../components";
import QuizWaiting from "../QuizWaiting/index.js";
import QuizResults from "../../components/QuizResults";

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
