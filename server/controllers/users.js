const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const User = require('../models/User');

// route to fetch all the users and their information (likely admin feature)
async function all (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err){
        res.status(500).json({err})
    }
}

async function findByUsername (req, res) {
    try {
        const user = await User.findByUsername(req.params.username)
        if(!user){
            res.status(200).json({status: true})
        } else {
            res.status(200).json({status: false})
        }
        
    } catch(err){
        res.status(500).json({err})
    }
}

module.exports = {all, findByUsername}