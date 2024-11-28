import express from 'express'
const noiseRoutes = express.Router()
import NoiseController from '../controllers/NoiseController.js'
import Auth from '../middleware/Auth.js'
import CheckAdmin from '../middleware/CheckAdmin.js'

// Rotas para ruídos

//Rota para ver todos os ruídos
noiseRoutes.get('/noises', Auth.Authorization, NoiseController.getAllNoises)
noiseRoutes.get('/noise/:id', Auth.Authorization, NoiseController.getOneNoise) 
noiseRoutes.post('/noise', Auth.Authorization, NoiseController.createNoise)
noiseRoutes.put('/noise/:id', Auth.Authorization, NoiseController.updateNoise)
noiseRoutes.delete('/noise/:id', Auth.Authorization, NoiseController.deleteNoise)

//Rotas privadas

// Rota para listar todos os ruídos no sistema (somente para administradores)
noiseRoutes.get('/admin/noises', Auth.Authorization, CheckAdmin.checkAdminRole, NoiseController.getAllNoises);

// Rota para exibir um ruído específico de qualquer usuário (somente para administradores)
noiseRoutes.get('/admin/noise/:id', Auth.Authorization, CheckAdmin.checkAdminRole, NoiseController.getOneNoise);

// Rota para editar um ruído de qualquer usuário (somente para administradores)
noiseRoutes.put('/admin/noise/:id', Auth.Authorization, CheckAdmin.checkAdminRole, NoiseController.updateNoise);

// Rota para excluir um ruído de qualquer usuário (somente para administradores)
noiseRoutes.delete('/admin/noise/:id', Auth.Authorization, CheckAdmin.checkAdminRole, NoiseController.deleteNoise);

export default noiseRoutes
