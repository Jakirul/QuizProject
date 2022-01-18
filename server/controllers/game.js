const { Game, AllQuestions } = require("../models/Game.js");

async function home(req, res) {
  try {
    const games = await Game.allHighscore;
    res.status(200).json(games);
  } catch (e) {
    res.status(500).send({ e: "Cannot load the highscores" });
  }
}

async function scoreAdder(req, res) {
  try {
    const game = await Game.scoreAdder(req.params.username, req.params.score);
    res.status(200).json(game);
  } catch (e) {
    res.status(500).send({ e: "Cannot append score" });
  }
}

async function setGame(req, res) {
  try {
    const { categoryId, difficulty, range } = req.params;
    const newgame = await Game.setGame(categoryId, difficulty, range);

    res.status(200).json(newgame);
  } catch (e) {
    res.status(500).send({ e: "Cannot start the game!" });
  }
}

async function setAnswer(req, res) {
  try {
    const { socketId, gameId } = req.params;
    const score = await Game.setAnswer(socketId, gameId, req.body);
    res.status(200).json(score);
  } catch (e) {
    res.status(500).send({ e: "Cannot set the answers!" });
  }
}

async function getGameResults(req, res) {
  try {
    const { id } = req.params;
    const results = await Game.getGameResults(id);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).send({ e: "Cannot load results for this game!" });
  }
}

async function lobbyExists(req, res) {
  try {
    const { id } = req.params;
    const exists = await Game.lobbyExists(id);
    res.status(200).json(exists);
  } catch (e) {
    res.status(500).send({ e: "Cannot check if this lobby already exists!" });
  }
}

async function getGameId(req, res) {
  try {
    const id = req.params.id;
    const game = await Game.getGameId(id);
    res.status(200).json(new AllQuestions(game));
  } catch (e) {
    res.status(500).send({ e: "Cannot get a game by this id" });
  }
}

async function showLeaderboard(req, res) {
  try {
    const leaderboard = await Game.showLeaderboard();
    res.status(200).json(leaderboard);
  } catch (e) {
    res.status(500).send({ e: "Cannot get the leaderboard!" });
  }
}

async function logScore(req, res) {
  try {
    const { username, score } = req.params;
    const result = await Game.logScore(username, score);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ e: "Cannot log the score!" });
  }
}

module.exports = {
  home,
  scoreAdder,
  setGame,
  setAnswer,
  getGameResults,
  lobbyExists,
  getGameId,
  showLeaderboard,
  logScore,
};
