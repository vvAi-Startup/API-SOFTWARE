const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definindo o schema para User
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.']
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Função para hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar a senha
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Definindo o schema para Music
const MusicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia ao modelo User
    required: true
  },
  musicUrl: {
    type: String,  // URL ou caminho do arquivo da música
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Definindo o schema para Noise
const NoiseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia ao modelo User
    required: true
  },
  noiseType: {
    type: String,
    required: true,
    enum: ['white', 'brown', 'pink', 'custom'] // Tipos de ruído
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exportando os modelos
const User = mongoose.model('User', UserSchema);
const Music = mongoose.model('Music', MusicSchema);
const Noise = mongoose.model('Noise', NoiseSchema);

module.exports = { User, Music, Noise };
