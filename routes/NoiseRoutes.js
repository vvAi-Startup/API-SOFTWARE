const express = require('express');
const router = express.Router();
const NoiseController = require('../controllers/NoiseController');

// Rotas para ruídos
router.get('/noises', NoiseController.getNoises);
router.post('/noises', NoiseController.createNoise);

module.exports = router;
