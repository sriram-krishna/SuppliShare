const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/change-password', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body);
        console.log(hashedPassword); 
        userModel.changeUserPassword(username, password);
        res.status(200).json({message:`Your new password is ${password}`});
        //need to upload new password to database here
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;