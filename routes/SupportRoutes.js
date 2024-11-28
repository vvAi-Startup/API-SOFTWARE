import express from 'express'
const supportRoutes = express.Router()
import SupportController from '../controllers/SupportController.js'
import Auth from '../middleware/Auth.js'
import CheckAdmin from '../middleware/CheckAdmin.js'

// Rotas para o Suporte
supportRoutes.get('/support/:id', Auth.Authorization, SupportController.getOneRequest)
supportRoutes.get('/supports', Auth.Authorization, CheckAdmin.checkAdminRole, SupportController.getAllRequests)
supportRoutes.post('/support', Auth.Authorization, SupportController.createRequest)
supportRoutes.put('/support/:id', Auth.Authorization, SupportController.updateRequest)
supportRoutes.delete('/support/:id', Auth.Authorization, CheckAdmin.checkAdminRole, SupportController.deleteRequest)

export default supportRoutes
