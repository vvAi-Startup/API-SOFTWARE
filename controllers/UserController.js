import userService from '../services/UserService.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

// Chave secreta para o JWT
const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {  
  try {
    const { name, email, password, cellphone_number, role} = req.body

    if (!name || !email || !password || !cellphone_number){
      return res.status(400).json({message: 'Todos os dados precisam estar preenchidos'})
    }

    const emailUser = await userService.getOne(email)
    if(emailUser){
      return res.status(400).json({ message: 'Email já registrado.' })
    }

    const userRole = role || 'user';


    await userService.Create({ name, email, password, cellphone_number, role: userRole})

    res.status(201).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    console.error(error); // Log do erro
    res.status(500).json({ message: 'Erro no servidor.', error: error.message })
  }
}

// Login de usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email != undefined || email != null){
      const user = await userService.getOne(email)
      if (user != undefined) {
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
          jwt.sign(
            {id: user._id, email: user.email},
            JWT_SECRET,
            { expiresIn: "48h"},
            (error, token) => {
              if (error){
                res.status(400)
                res.json({ error: "Falha interna"})
              }else{
                res.status(200)
                res.json({token: token})
              }
            }
          )
        } else {
          res.status(401)
          res.json({error: "Credenciais inválidas!"})
        }
      } else{
        res.status(404) 
        res.json({error: "O e-mail enviado não foi encontrado."})
      }
    } else{
      res.status(400) 
      res.json({error: "O e-mail enviado é inválido."})
    }
  } catch (error) {
    console.error(error) 
    res.status(500).json({ message: 'Erro no servidor.', error: error.message })
  }
}

const logoutUser = async (req, res) => {
  try {
    // O cliente deve ser instruído a remover o token do armazenamento local
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `Erro ao obter usuários: ${error}` })
  }
}

const deleteUser = async (req, res) => {
  try{
    const token = req.headers.authorization?.split(" ")[1]
    if (!token){
      return res.status(401).json({ message: "Token não fornecido." })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const userId = decoded.id

    const userDeleted = await userService.Delete(userId)
    if(userDeleted){
      return res.sendStatus(204)
    }else{
      return res.status(404).json({message: "Usuário não encontrado!"})
    }
  }catch(error){
    res.status(500).json({ error: `Erro ao deletar usuário: ${error}` })
  }
}


const updateUser = async (req, res) => {
  try{
    const token = req.headers.authorization?.split(" ")[1]
    if (!token){
      return res.status(401).json({ message: "Token não fornecido." })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const userId = decoded.id
    
    const userData = req.body
    const updatedUser = await userService.Update(userId, userData)

    if(updatedUser){
      return res.status(200).json({ message: "Usuário atualizado com sucesso.", user: updatedUser });
      } else{
        return res.status(404).json({message: "Usuário não encontrado."})
      }
    } catch(error){
      res.status(500).json({error: `Erro ao atualizar: ${error}`})
  }
}

const getOneUser = async (req, res) =>{
  try{
    const email = req.params.email
    const user = await userService.getOne(email)
    if (user) {
      res.status(200).json({user})
    }else{
      res.status(404).json({ error: "Usuário não encontrado." })
    }
  }catch(error){
    res.status(500).json({error: "Erro interno do servidor"})
  }
}

export default { getOneUser, getAllUsers, updateUser, deleteUser, logoutUser, registerUser, loginUser}