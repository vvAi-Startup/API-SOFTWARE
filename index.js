import express from 'express'

const app = express()
import dotenv from 'dotenv'
dotenv.config()

import mongoose from './config/connection-db.js'
import User from './models/Calmwave.js'
import Noise from './models/Calmwave.js'

// Middleware para processar JSON
app.use(express.json())

app.use(express.urlencoded({extended: false}))

// Importar as rotas

// Rotas de autenticação
import noiseRoutes from './routes/NoiseRoutes.js'
app.use('/api', noiseRoutes)
import userRoutes from './routes/UserRoutes.js'
app.use('/', userRoutes)

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if(error){
    console.log(error)
  }
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
