const { init } = require("../db/mongoInit.js");
const { ObjectId } = require("mongodb");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.passwordDigest = data.password_digest;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let db = await init();
        let result = await db.collection("users").find({}).toArray();
        let users = result.map((r) => new User(r));
        res(users);
      } catch (err) {
        rej(`Error retrieving users: ${err}`);
      }
    });
  }

  static create({ username, password }) {
    return new Promise(async (res, rej) => {
      try {
        let db = await init();
        let result = await db
          .collection("users")
          .insertOne({ username: username, password_digest: password });
        let newUser = new User(result);
        res(newUser);
      } catch (err) {
        rej(`Error creating user: ${err}`);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const result = await db
          .collection("users")
          .find({ username })
          .toArray();
        const user = new User(result[0]);
        res(user);
      } catch (err) {
        rej(`Error retrieving user: ${err}`);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const result = await db
          .collection("users")
          .find({ _id: ObjectId(id) })
          .toArray();
        const user = new User(result[0]);
        res(user);
      } catch (err) {
        rej(`Error retrieving user: ${err}`);
      }
    });
  }
}

module.exports = User;
