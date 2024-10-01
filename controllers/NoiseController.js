import { noiseService, userService } from "../services/CalmwaveService.js";
import { ObjectId } from "mongodb"

// Obter todos os ruídos
exports.getAllNoises = async (req, res) => {
  try {
    const noises = await noiseService.getAll()
    res.status(200).json(noises)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao obter ruídos' });
  }
};

// Criar um novo ruído
exports.createNoise = async (req, res) => {
  try {
    const newNoise = new Noise(req.body);
    await newNoise.save();
    res.json(newNoise);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ruído' });
  }
};
