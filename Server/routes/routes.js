const express = require('express');
const router = express.Router();
const UsersModel= require('../models/Admin');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', (req, res) => {
    UsersModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err }));
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
