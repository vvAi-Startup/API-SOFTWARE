import express from 'express'
const noiseRoutes = express.Router()
import NoiseController from '../controllers/NoiseController.js'
import Auth from '../middleware/Auth.js'

// Rotas para ruídos
noiseRoutes.get('/noises', NoiseController.getAllNoises)
noiseRoutes.get('/noise/:id', NoiseController.getOneNoise)

noiseRoutes.post('/noise', Auth.Authorization, NoiseController.createNoise)
noiseRoutes.put('/noise/:id', Auth.Authorization, NoiseController.updateNoise)
noiseRoutes.delete('/noise/:id', Auth.Authorization, NoiseController.deleteNoise)

export default noiseRoutes
