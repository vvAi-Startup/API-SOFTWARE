import Support from "../models/Calmwave.js"

class supportService {
    async getAll() {
        try {
            const request = await Support.find()
            return request
        } catch(error){
            console.log(error)
        }
    }
    
    async Create(requestData){
        try{
            const newRequest = new Support(requestData)
            await newRequest.save()
        } catch(error){
            console.log(error)
        }
    }

    async Delete(id){
        try{
            await Support.findByIdAndDelete(id)
            console.log(`Requisição com id: ${id} foi excluído de sua base de dados!`)
        } catch(error){
            console.log(error)
        }
    }

    async Update(id, requestData) {
        try {
            // O segundo parâmetro usa { new: true } para retornar o documento atualizado
            const updatedRequest = await Support.findByIdAndUpdate(id, requestData, { new: true })
            console.log(`Dados da requisição com id: ${id} alterado com sucesso.`)
            return updatedRequest // Retorne a requisição atualizada, se necessário
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id){
        try{
            const request = await Support.findOne({_id: id})
            return request
        }catch(error){
            console.log(error)
        }
    }
}

export default new supportService()