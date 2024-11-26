import supportService from "../services/SupportService.js";
import { ObjectId } from "mongodb"

const getAllRequests = async (req, res) => {
  try {
    const requests = await supportService.getAll()
    res.status(200).json(requests)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `Erro ao obter requisições: ${error}` })
  }
}

const createRequest = async (req, res) => {
  try {
    const requestData = req.body 
    await supportService.Create(requestData)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar requisição: ${error}` })
  }
}

const deleteRequest = async (req, res) => {
  try{
    if (ObjectId.isValid(req.params.id)){
      const id = req.params.id
      supportService.Delete(id)
      res.sendStatus(204)
    }else{
      res.sendStatus(400) // BAD REQUEST
    }
  }catch(error){
    res.status(500).json({ error: `Erro ao deletar requisição: ${error}` })
  }
}

const updateRequest = async (req, res) => {
  try{
    const id = req.params.id

    if(ObjectId.isValid(id)){
      const requestUpdateData = req.body

      const updatedRequest = await supportService.Update(id, requestUpdateData)
      if(updatedRequest){
        res.status(200).json({updatedRequest}) // OK! 
      } else{
        res.status(404).json({error: 'Requisição não encontrada'})
      }
    }else{
      res.sendStatus(400)
    }
  } catch(error){
      res.status(500).json({error: `Erro ao atualizar: ${error}`})
  }
}

const getOneRequest = async (req, res) =>{
  try{
    const id = req.params.id
    if(ObjectId.isValid(id)){
      const request = await supportService.getOne(id)
      if(!request){
        res.sendStatus(404).json({error: 'Requisição não encontrado'})
      } else{
        res.status(200).json({request})
      }
    } else{
      res.sendStatus(400)
    }
  }catch(error){
    res.status(500).json({error: "Erro interno do servidor"})
  }
}

export default { getAllRequests, getOneRequest, createRequest, updateRequest, deleteRequest}



