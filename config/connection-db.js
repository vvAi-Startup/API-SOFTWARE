import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/calmwave', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado...');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB', error);
    process.exit(1); // Sair da aplicação se falhar
  }
};

module.exports = connectDB;
