const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/signup', async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
