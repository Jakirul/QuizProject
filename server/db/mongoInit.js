const { MongoClient } = require("mongodb");

const init = async () => {
  const uri = `mongodb://user:pass@db:27017`;
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let dbName = process.env.NODE_ENV == "test" ? "quiz_dbtest" : "quiz_db";
  try {
    let client = await mongoClient.connect();
    return client.db(dbName);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { init };

// const { MongoClient } = require('mongodb')
// const connectionUrl = process.env.DB_CONNECTION;

// const dbName = process.env.DB_NAME

// const init = async () => {
//   let client = await MongoClient.connect(connectionUrl)
//   console.log('connected to database!', dbName)
//   return client.db(dbName)
// }

// module.exports = { init };
