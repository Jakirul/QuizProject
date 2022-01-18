const request = require("supertest");
const { MongoClient, ObjectId } = require("mongodb");
const app = require("../../server.js");

const connectionUrl = "mongodb://user:pass@db:27017";
const dbName = "quiz_dbtest";

const init = async () => {
    let client = await MongoClient.connect(connectionUrl);
    return client.db(dbName);
};

const resetTestDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await init();
            await db.collection("games").deleteMany({})
            await db.collection("games").insertMany([
                {
                  _id: ObjectId("61e300f328361bfd19522f71"),
                  questions: {
                    response_code: 0,
                    results: [
                      {
                        category: 'General Knowledge',
                        type: 'multiple',
                        difficulty: 'easy',
                        question: 'What is the name of the Jewish New Year?',
                        correct_answer: 'Rosh Hashanah',
                        incorrect_answers: [ 'Elul', 'New Year', 'Succoss' ]
                      },
                      {
                        category: 'General Knowledge',
                        type: 'boolean',
                        difficulty: 'easy',
                        question: 'On average, at least 1 person is killed by a drunk driver in the United States every hour.',
                        correct_answer: 'True',
                        incorrect_answers: [ 'False' ]
                      },
                      {
                        category: 'General Knowledge',
                        type: 'multiple',
                        difficulty: 'easy',
                        question: 'What is Cynophobia the fear of?',
                        correct_answer: 'Dogs',
                        incorrect_answers: [ 'Birds', 'Flying', 'Germs' ]
                      }
                    ]
                  }
                }
              ])
            await db.collection("highscore").deleteMany({})
            await db.collection("highscore").insertMany([
                {
                  _id: ObjectId("61e2f70293cf63f1241cdd12"),
                  name: 'Jakirul',
                  score: 34
                },
                {
                  _id: ObjectId("61e2f70293cf63f1241cdd13"),
                  name: '496Jakirul496',
                  score: 250
                },
                {
                  _id: ObjectId("61e2f70293cf63f1241cdd15"),
                  name: 'LxelBPdcBLoFHkGQAAAK',
                  score: 20
                }
              ]);
            resolve("Test DB reset");
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        }
    });
};

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;