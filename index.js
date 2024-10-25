const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Importar as rotas
//
// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Middleware para processar JSON
app.use(express.json())

// Conectar ao MongoDB (usando 127.0.0.1 para evitar problemas com ::1/IPv6)
// mongoose.connect('mongodb://127.0.0.1:27017/calmwave')
//   .then(() => console.log('MongoDB conectado com sucesso.'))
//   .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));


// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
