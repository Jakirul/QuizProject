require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


async function register(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    await User.create({ ...req.body, password: hashed });
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ err });
  }

}

async function login(req, res) {
  try {
    const user = await User.findByUsername(req.body.username);
    if (!user.length) {
      throw new Error("No user with this username");
    }
    const authed = await bcrypt.compare(req.body.password, user[0].password_digest);
    
    if (!!authed) {
      const payload = { id: user[0].id, username: user[0].username };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }

        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      };
      jwt.sign(payload, process.env.SECRET, { expiresIn: 300000 }, sendToken);
    } else {
      throw new Error("User could not be authenticated");

    }
  } catch (err) {
    res.status(401).json({ err });
  }
}

module.exports = { login, register };
