const express = require('express');
const router = express.Router();
const { register, login, getProfile, authMiddleware } = require('../controllers/authController');

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);

// Rota protegida para pegar o perfil do usuário
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
