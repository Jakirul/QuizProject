const { MongoClient } = require('mongodb');
const { Game } = require('../../../models/Game')
jest.setTimeout("100000")


describe('insert', () => {
  let connection;
  let db;
  let gameinsert;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://user:pass@db:27017")
    db = await connection.db("quiz_dbtest");

    const questions = {
      "response_code": 0,
      "results": [
        {
          "category": "Entertainment: Books",
          "type": "multiple",
          "difficulty": "easy",
          "question": "Who wrote &quot;Harry Potter&quot;?",
          "correct_answer": "J.K. Rowling",
          "incorrect_answers": [
            "J.R.R. Tolkien",
            "Terry Pratchett",
            "Daniel Radcliffe"
          ]
        },
        {
          "category": "Entertainment: Books",
          "type": "multiple",
          "difficulty": "easy",
          "question": "George Orwell wrote this book, which is often considered a statement on government oversight.",
          "correct_answer": "1984",
          "incorrect_answers": [
            "The Old Man and the Sea",
            "Catcher and the Rye",
            "To Kill a Mockingbird"
          ]
        },
        
      ]
    }

    gameinsert = await db.collection("games").insertOne({ questions: questions })
    
  });

  afterAll(async () => {
    await connection.close();
  });

  

  it('all highscore', async () => {
    const highscore = await Game.allHighscore;

    expect(highscore).toBeDefined()
  });

  it("scoreAdder - username already exists", async () => {
    await Game.scoreAdder("Jakirul", "34")
    const scoreAdder = await Game.scoreAdder("Jakirul", "25")
    expect(scoreAdder).toBeDefined()
  })

  it("scoreAdder - username doesn't exist", async () => {
    // ensures a random username
    const randomNumber = Math.floor(Math.random() * 1000)
    const scoreAdder = await Game.scoreAdder(`${randomNumber}Jakirul${randomNumber}`, "250")
    expect(scoreAdder).toBeDefined()
  })

  it("setAnswer", async () => {
    
    const list = {
      answers: [
        'J.K. Rowling',
        '1984'
      ],
      username: 'LxelBPdcBLoFHkGQAAAK'
    }
    const setAnswer = await Game.setAnswer("LxelBPdcBLoFHkGQAAAK", gameinsert.insertedId.toHexString(), list)
    expect(setAnswer).toBeDefined()
  })

  it("getGameResults", async () => {
    const getGameResults = await Game.getGameResults("61e2ddb49b7d5d4bf1048fac");
    expect(getGameResults).toBeDefined()
  })


  it("getGameId", async () => {
    const getGameId = await Game.getGameId("61e2ddb49b7d5d4bf1048fac")
    expect(getGameId).toBeDefined()
  })

  it("lobbyExists", async () => {
    const lobbyExists = await Game.lobbyExists("61e2ddb49b7d5d4bf1048fac")
    expect(lobbyExists).toBeDefined()
  })

  it("setGame", async () => {
    const setGame = await Game.setGame("10", "easy", "10")
    expect(setGame).toBeDefined()
  })

  it("setGame - cannot find a game", async () => {

    await expect(async () => {
      await Game.setGame("500", "easy", "10")
    })
    .rejects.toEqual("Cannot set a game: Questions in this search query has not been found :(")
    
  })

  it("showLeaderboard", async () => {
    const showLeaderboard = await Game.showLeaderboard()
    expect(showLeaderboard).toBeDefined()
  })




});