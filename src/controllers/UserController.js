//importando arquivo de conexão com o banco de dados 
const knex = require("../database/knex");
//const checkTaskExists = require("../middlewares/checkTaskExists");

//nome da classe
class UserController {
// async significa assincrona, algo que acontece depois
//criar usuarios
    async createUser(req, res) {
        const {name, email, password} = req.body;
        
        const isAdmin = false;

        await knex("users").insert({name, email, password, isAdmin});
        
        return res.status(201).json("Usuário cadastrado com sucesso!!");
    }
//listar usuarios
    async listUser(req, res) {
        //await significa aguarde, pool é o arquivo passado anteriormente e query significa consulta.
        const users = await knex("users")
        return res.status(200).json(users)
    }
//selecionar um usuario especifico pelo id
    async listUserById(req, res) {
        const {user_id} = req.params
        const [user] = await knex("users").where({id: user_id})

        return res.status(200).json(user)
    }
//atualizar os dados do usuario
    async updateUser(req, res) {
        const {user_id} = req.params
        const {name, email} = req.body

        await knex("users").where({id: user_id}).update({name, email})
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

        await knex("users").where({id: user_id}).delete()
        return res.status(200).json("Registro deletado com sucesso! Até mais!!")
    }
}
module.exports = UserController