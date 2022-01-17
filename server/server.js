const express = require('express')
const app = express();
const gameRoute = require('./routes/index.js')
const cors = require('cors');
app.use(cors())

app.use('/', gameRoute)

// If a route is incorrect, redirect to /
// app.get("*", (req, res) => {
//     res.redirect("/")
// })

module.exports = app;