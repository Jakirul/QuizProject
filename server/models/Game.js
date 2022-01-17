const { init } = require('../db/mongoInit.js');
const axios = require('axios')
const { ObjectId } = require('mongodb')

class Game {
    constructor(data) {
        this.game_id = data.game_id,
            this.username = data.username,
            this.score = data.score
    }

    static get allHighscore() {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await init();
                let results = await db.collection("highscore").find({}).toArray();
                resolve(results);

            } catch (err) {
                reject("Cannot retreive any games, please try again")
            }
        })
    }

    static scoreAdder(username, userScore) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await init();
                let results = await db.collection("highscore").find({ name: username }).toArray();

                // If the user already exists in the database, it will update the user's score
                // If the user does not exist, it will create a new user and add their score
                if (results.length) {
                    // This finds a user and then increments the score using $inc
                    let results = await db.collection("highscore").updateOne({ name: username }, { $inc: { score: parseInt(userScore) } })
                    resolve(results)
                } else {
                    let addPlayer = await db.collection("highscore").insertOne({ name: username, score: parseInt(userScore) });
                    resolve(addPlayer)
                }

            } catch (err) {
                reject(`Error creating game: ${err.message}`);
            }
        });
    }

    static setAnswer(socketId, gameId, body) {
        return new Promise(async (resolve, reject) => {
            try {

                const db = await init();
                const answers = await db.collection("games").findOne({ _id: ObjectId(gameId) });
                const answersResults = answers.questions.results;

                const resultMap = answersResults.map((result, index) => ({
                    question: result.question,
                    corrAns: result.correct_answer,
                    allOptions: result.incorrect_answers.concat([result.correct_answer]),
                    playerCorrAns: body.answers[index] === result.correct_answer,
                    playerAns: body.answers[index]
                }));

                const scoreKeeper = (resultMap.filter((result) => result.playerCorrAns === true).length) * 10;

                // If a score is more than 0, then it will append it to the leaderboard
                // if (scoreKeeper > 0) {
                //     Game.scoreAdder(body.username, scoreKeeper)
                // }

                await db.collection("scoreList").insertOne({ gameId: answers._id, scoreKeeper, socketId, username: body.username, answers: resultMap });

                resolve("Successfully appended score")
            } catch (err) {
                reject(`Can't get any answers from this list: ${err.message}`);
            }
        });
    }

    static logScore(username, score) {
        return new Promise(async (resolve, reject) => {
            try {
                if (score > 0) {
                    Game.scoreAdder(username, score)
                }
                resolve("score added")
            } catch (err) {
                reject(`Cannot log the score: ${err.message}`)
            }
        })
    }

    static getGameResults(gameid) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const results = await db.collection("scoreList").find({ gameId: ObjectId(gameid) }).toArray();
                resolve(results)

            } catch (err) {
                reject("Cannot get results for this game id", err.message)
            }
        })
    }

    static getGameId(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection("games");
                const game = await collection.findOne({ _id: ObjectId(id) });
                resolve(game);
            } catch (err) {
                reject(`Error retrieving game: ${err.message}`);
            }
        });
    }

    static lobbyExists(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection("games").find({ _id: ObjectId(id) }).toArray();
                resolve(collection)
            } catch (err) {
                reject("Error, cannot find a lobby", err.message)
            }
        })
    }

    static setGame(categoryId, difficulty, range) {
        return new Promise(async (resolve, reject) => {
            try {
                const questions = await axios.get(`https://opentdb.com/api.php?amount=${range}&category=${categoryId}&difficulty=${difficulty}`)
                const questionList = await questions.data;
                const resCode = await questions.data.response_code

                // The response code is 0 if there are questions in a list. 1 indicates an error such as no questions
                if (resCode > 0) {
                    throw new Error("Questions in this search query has not been found :(");
                }
                let db = await init();
                const newGame = await db.collection("games").insertOne({ questions: questionList })
                resolve(newGame.insertedId);

            } catch (err) {
                reject(`Cannot set a game: ${err.message}`)
            }
        })

    }

    static showLeaderboard() {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await init();
                let leaderboard = await db.collection("highscore").find({}).toArray();
                resolve(leaderboard)

            } catch (err) {
                reject("Cannot retreive a leaderboard!", err)
            }
        })
    }
}

class AllQuestions {
    constructor(data) {
        this.id = data._id
        this.questions = data.questions.results.map((list) => ({
            category: list.category,
            question: list.question,
            allAnswers: list.incorrect_answers.concat([list.correct_answer]),
            correctAns: list.correct_answer,
            difficulty: list.difficulty,

        }))
    }
}
module.exports = { Game, AllQuestions };