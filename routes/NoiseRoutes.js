import express from 'express'
const noiseRoutes = express.Router()
import NoiseController from '../controllers/NoiseController.js'
import Auth from '../middleware/Auth.js'

// Rotas para ruídos
routerNoise.get('/noises', NoiseController.getAllNoises)
routerNoise.get('/noise/:id', NoiseController.getOneNoise)

routerNoise.post('/noise', Auth.Authorization, NoiseController.createNoise)
routerNoise.put('/noise/:id', Auth.Authorization, NoiseController.updateNoise)
routerNoise.delete('/noise/:id', Auth.Authorization, NoiseController.deleteNoise)

export default noiseRoutes
