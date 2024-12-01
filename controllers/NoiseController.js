import noiseService from "../services/NoiseService.js";
import { ObjectId } from "mongodb"

// Obter todos os ruídos
const getAllNoises = async (req, res) => {
  try {
    const { role, id: userId} = req.loggedUser
    if(role === 'admin'){
      const noises = await noiseService.getAll()
      res.status(200).json({noises})
    }else{
      const noises = await noiseService.getAllPerUser(userId)
      if(!noises) return res.status(403).json({ error: "Não existe nenhum ruído nessa conta!" })
      return res.status(200).json({noises})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `Erro ao obter ruídos: ${error.message}` })
  }
}

// Criar um novo ruído
const createNoise = async (req, res) => {
  try {
    const userId = req.loggedUser.id

    const noiseData = {
      ...req.body,
      userId
    } 
    await noiseService.Create(noiseData)
    res.status(201).json({ message: "Ruído adicionado com sucesso!"}) 
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar ruído: ${error.message}` })
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
    const { role, id: userId } = req.loggedUser

    if(ObjectId.isValid(id)){
      if(role === 'admin'){
        const noise = await noiseService.getOne(id)
        if(!noise) return res.sendStatus(404).json({error: 'Ruído não encontrado'})
        return res.status(200).json({noise})
      } else{
        const noise = await noiseService.getOnePerUser(id, userId)
        if(!noise) return res.status(403).json({ error: "Não existe nenhum ruído com esse ID em sua conta!" })
        return res.status(200).json({noise})
      }
    }
  }catch(error){
    res.status(500).json({error: `Erro interno do servidor ${error.message}`})
  }



}

export default { getAllNoises, getOneNoise, createNoise, updateNoise, deleteNoise}



