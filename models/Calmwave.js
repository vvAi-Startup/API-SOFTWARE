import mongoose from 'mongoose'

const parentSchema = new mongoose.Schema({
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      cellphone_number: String
})

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
    required: true,
    minlength: 6
  },
  parents_control: [parentSchema],
  cellphone_number: {
    type: String,
    required: true
  }
}, {timestamps: true})

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
  },
  description:{
    type: String,
    required: true
  },
  url: String
})

// Exportando os modelos
const User = mongoose.model('User', UserSchema)
const Noise = mongoose.model('Noise', NoiseSchema)

export default { User, Noise }
