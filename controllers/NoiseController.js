import { noiseService } from "../services/CalmwaveService.js";
import { ObjectId } from "mongodb"

// Obter todos os ruídos
const getAllNoises = async (req, res) => {
  try {
    const noises = await noiseService.getAll()
    res.status(200).json(noises)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `Erro ao obter ruídos: ${error}` })
  }
}

// Criar um novo ruído
const createNoise = async (req, res) => {
  try {
    const noiseData = req.body 
    await noiseService.Create(noiseData)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar ruído: ${error}` })
  }
}

const deleteNoise = async (req, res) => {
  try{
    if (ObjectId.isValid(req.params.id)){
      const id = req.params.id
      noiseService.Delete(id)
      res.sendStatus(204)
    }else{
      res.sendStatus(400) // BAD REQUEST
    }
  }catch(error){
    res.status(500).json({ error: `Erro ao deletar ruído: ${error}` })
  }
}

const updateNoise = async (req, res) => {
  try{
    const id = req.params.id

    if(ObjectId.isValid(id)){
      const noiseUpdateData = req.body

      const updatedNoise = await noiseService.Update(id, noiseUpdateData)
      if(updatedNoise){
        res.status(200).json({updatedNoise}) // OK! 
      } else{
        res.status(404).json({error: 'Ruído não encontrado'})
      }
    }else{
      res.sendStatus(400)
    }
  } catch(error){
      res.status(500).json({error: `Erro ao atualizar: ${error}`})
  }
}

const getOneNoise = async (req, res) =>{
  try{
    const id = req.params.id
    if(ObjectId.isValid(id)){
      const noise = await noiseService.getOne(id)
      if(!noise){
        res.sendStatus(404).json({error: 'Ruído não encontrado'})
      } else{
        res.status(200).json({noise})
      }
    } else{
      res.sendStatus(400)
    }
  }catch(error){
    res.status(500).json({error: "Erro interno do servidor"})
  }
}

export default { getAllNoises, getOneNoise, createNoise, updateNoise, deleteNoise}



