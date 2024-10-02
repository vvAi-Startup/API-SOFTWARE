import express from 'express'
const userRoutes = express.Router()
import {registerUser, loginUser, logoutUser, deleteUser, updateUser, getAllUsers, getOneUser} from "../controllers/UserController.js"

// Rota de registro
userRoutes.post('/register', registerUser)

// Rota de login
userRoutes.post('/login', loginUser)

userRoutes.post('/logout', logoutUser)

userRoutes.delete('/delete-user', deleteUser)

userRoutes.put('/update-user', updateUser)

userRoutes.get('/users', getAllUsers)

userRoutes.get('/:email', getOneUser)

export default userRoutes
