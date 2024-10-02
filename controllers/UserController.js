
const bcrypt = require('bcrypt')
import { User } from "../models/Calmwave.js"
import { userService } from '../services/CalmwaveService.js'
import jwt from 'jsonwebtoken'

// Chave secreta para o JWT
const JWT_SECRET = 'weuth943h6935hye90sjgf93'

// Registro de usuário
exports.registerUser = async (req, res) => {
  
  try {

    const userData = req.body

    if (!userData){
      return res.status(400).json({message: 'Todos os dados precisam estar preenchidos'})
    }

    const existingUser = await User.findOne({ email })

    await userService.Create(userData)
    if (userData) {
      res.status(400).json({ message: 'Email já registrado.' })
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ token })
  } catch (error) {
    console.error(error); // Log do erro
    res.status(500).json({ message: 'Erro no servidor.', error: error.message })
  }
}

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }) // Use User aqui
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' })
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ token })
  } catch (error) {
    console.error(error) // Log do erro
    res.status(500).json({ message: 'Erro no servidor.', error: error.message })
  }
}

// Perfil do usuário
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user) // Use User aqui
    res.json(user)
  } catch (error) {
    console.error(error); // Log do erro
    res.status(500).json({ message: 'Erro no servidor.', error: error.message })
  }
}

// Middleware para proteger rotas
exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária.' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET)
    req.user = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' })
  }
}
