//importando arquivo de conexão com o banco de dados 
const knex = require("../database/knex");
const UserRepository = require("../repositories/userRepository/userRepository");
const UserCreateService = require("../services/UserServices/UserCreateService");
const UserListService = require("../services/UserServices/UserListService");
const UserListByIdService = require("../services/UserServices/UserListByIdService");
const UpdateUserService = require("../services/UserServices/UpdateUserService");
const UserDeleteService = require("../services/UserServices/UserDeleteService");

const userRepository = new UserRepository()

const userCreateService = new UserCreateService(userRepository)
const userListService = new UserListService(userRepository)
const userListByIdService = new UserListByIdService(userRepository)
const updateUserService = new UpdateUserService(userRepository)
const deleteUserService = new UserDeleteService(userRepository)

//nome da classe
class UserController {
// async significa assincrona, algo que acontece depois
//criar usuarios
    async createUser(req, res) {
        const {name, email, password} = req.body;
        
        await userCreateService.execute({name, email, password})

        return res.status(201).json("Usuário cadastrado com sucesso!!");
    }
//listar usuarios
    async listUser(req, res) {
        
        const users = await userListService.execute()

        return res.status(200).json(users)
    }
//selecionar um usuario especifico pelo id
    async listUserById(req, res) {
        const {user_id} = req.params
        
        const user = await userListByIdService.execute({user_id})

        return res.status(200).json(user)
    }
//atualizar os dados do usuario
    async updateUser(req, res) {
        const {user_id} = req.params
        const {name, email} = req.body

        await updateUserService.execute({name, email, user_id})

        return res.status(200).json("Usuário atualizado com sucesso!")
    }
    //atualizar admin do usuario
    async updateUserAdmin(req, res) {
        const {user_id} = req.params

        await knex("users").where({id: user_id}).update({isAdmin: true})
        return res.status(200).json("Alterado com sucesso!!");
    }
    //delentando usuario
    async deleteUser(req, res) {
        const {user_id} = req.params

        await deleteUserService.execute({user_id})

        return res.status(200).json("Registro deletado com sucesso! Até mais!!")
    }
}
module.exports = UserController