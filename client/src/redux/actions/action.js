import jwt_decode from "jwt-decode";

export const readyPlayers = (readyPlayer) => ({
  type: "READY_PLAYERS",
  payload: readyPlayer,
});

export const unreadyPlayers = () => ({
  type: "UNREADY_PLAYERS",
});

export const retrieveQuizAnswer = (quizId) => {
  return async (dispatch) => {
    try {
      const quizData = await fetch(
        `http://localhost:3001/quizAnswers/${quizId}`
      );
      const questions = await quizData.json();

      dispatch({
        type: "RETRIEVE_QUES",
        payload: questions.questions.map((ques) => ques),
      });
    } catch (e) {
      dispatch({
        type: "FETCH_ERROR",
        payload: e,
      });
    }
  };
};

export const socketConnections = (socketConnection) => ({
  type: "NEW_SOCKET",
  payload: socketConnection,
});

export const userAnswer = (quizAnswer) => ({
  type: "ADD_USER_ANSWER",
  payload: quizAnswer,
});

export const incrementPlayer = (incrementPlayer) => ({
  type: "INCREMENT_PLAYER",
  payload: incrementPlayer,
});

export const login = (token) => {
  return async (dispatch) => {
    try {
      const user = await jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch({
        type: "LOG_IN",
        payload: user,
      });
    } catch (err) {
      console.warn(`${err}`);
      dispatch({
        type: "ERROR",
        payload: err,
      });
    }
  };
};

export const requestLogin = (userData) => {
  return async (dispatch) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
      const r = await fetch(`http://localhost:3001/login`, options);
      const data = await r.json();

      if (!data.success) {
        dispatch({
          type: "ERROR",
          payload: "Login not authorised",
        });
      } else {
        dispatch(login(data.token));
      }
    } catch (err) {
      console.warn(`${err}`);
      dispatch({
        type: "ERROR",
        payload: err,
      });
    }
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: "LOG_OUT",
  };
};

export const resetError = () => {
  return{
    type: "RESET_ERROR"
  }
}
