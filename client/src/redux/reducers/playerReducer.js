const initState = { playerList: [], answerList: [] };

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "READY_PLAYERS":
      // finds the player
      const toggle = state.playerList.find(
        (p) => p.player.id === action.payload
      );

      // for self reference, this is how you update a specific index of a array in redux:
      // https://stackoverflow.com/a/56484856
      const player = [
        ...state.playerList.slice(0, state.playerList.indexOf(toggle)),
        // When the user clicks 'ready', it will change their state from ready to not ready (and vice versa)
        { ...toggle, userReady: !toggle.userReady },
        ...state.playerList.slice(state.playerList.indexOf(toggle) + 1),
      ];

      return { ...state, playerList: player };

    case "UNREADY_PLAYERS":
      // Displays all the users and places them in the player list array
      const playerUnready = [
        ...state.playerList.map((player) => ({
          player: player.player,
          userReady: false,
        })),
      ];

      return { ...state, playerList: playerUnready };

    case "RETRIEVE_QUES":
      // If fetching questions is successful, it will append it to a questions array
      return { ...state, questions: [...action.payload] };

    case "NEW_SOCKET":
      return { ...state, socketConnection: action.payload };

    case "ADD_USER_ANSWER":
      // Appends a new answer to the answerList state array with the payload answer without mutation
      return { ...state, answerList: [...state.answerList, action.payload] };

    case "INCREMENT_PLAYER":
      // Loops over all the players and adds it to the playerList
      return {
        ...state,
        playerList: action.payload.map((player) => ({
          player: player,
          userReady: false,
        })),
      };

    // In the case of the game not being able to fetch questions from the server, it will show this error message
    case "FETCH_ERROR":
      return "Error trying to fetch answers, please try again later";

    default:
      return state;
  }
};

export default playerReducer;
