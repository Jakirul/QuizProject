const express = require('express');
const gameController = require('../controllers/game.js')
const authController = require('../controllers/auth.js')
const usersController = require('../controllers/users.js')
const router = express.Router();
const {verifyToken} = require('../middleware/auth.js')
router.use(express.json());

router.get('/', gameController.home)
router.post('/:username/:score', gameController.scoreAdder)
router.post('/game/:categoryId/:difficulty/:range', gameController.setGame)
router.post('/:socketId/:gameId/answers', gameController.setAnswer)
router.get('/results/:id', gameController.getGameResults)
router.get('/exists/:id', gameController.lobbyExists)
router.get('/quizAnswers/:id', gameController.getGameId)
router.get('/all/leaderboard', gameController.showLeaderboard)
router.patch('/:username/:score', verifyToken, gameController.logScore)

router.post('/login', authController.login)
router.post('/register', authController.register)

router.get('/user/all', usersController.all)
router.get('/user/:username', usersController.findByUsername)

module.exports = router;