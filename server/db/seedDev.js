const db = connect("mongodb://localhost:27017/quiz_db");

db.highscore.drop();

db.highscore.insertMany([
    {name: 'Jakirul', score: 100},
    {name: 'Bob', score: 20},
    {name: 'Alan', score: 150},
    {name: "Joe", score: 540}
]);