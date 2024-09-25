const Noise = require('../models/NoiseModel');

// Obter todos os ruídos
exports.getNoises = async (req, res) => {
  try {
    const noises = await Noise.find();
    res.json(noises);
  } catch (error) {
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
