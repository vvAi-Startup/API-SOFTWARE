import express from 'express'
const userRoutes = express.Router()
import UserController from "../controllers/UserController.js"
import Auth from '../middleware/Auth.js'

// Rota de registro
userRoutes.post('/register', UserController.registerUser)

// Rota de login
userRoutes.post('/login', UserController.loginUser)

userRoutes.post('/logout', Auth.Authorization, UserController.logoutUser)

userRoutes.delete('/delete-user/:id', Auth.Authorization, UserController.deleteUser)

userRoutes.put('/update-user', Auth.Authorization, UserController.updateUser)

//Por enquantio não é necessário visualizar dados dos usuários
// userRoutes.get('/users', UserController.getAllUsers)

userRoutes.get('/user/:id', Auth.Authorization, UserController.getOneUser)

export default userRoutes
