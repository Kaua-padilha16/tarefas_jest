//importando arquivo de conexão com o banco de dados 
const knex = require("../database/knex");
//nome da classe
class TaskController {
// async significa assincrona, algo que acontece depois
//criar tarefas
    async createTask(req, res) {
        const {user_id} = req.params;
        const {title, description} = req.body;

    const task = {
        title,
        description,
        isCompleted: false,
        user_id
    }
//
        await knex("tasks").insert({title: task.title, description: task.description, isCompleted: task.isCompleted, user_id: task.user_id});

        return res.status(201).json("Tarefa criada com sucesso!!");
    }
//listar tarefas
    async listTask(req, res) {
        //await significa aguarde, pool é o arquivo passado anteriormente e query significa consulta.
        const tasks = await knex("tasks");
        return res.status(200).json(tasks)
    }
//selecionar uma terefa especifica pelo id
    async listTaskById(req, res) {
        const {id} = req.params
        
        const [task] = await knex("tasks").where({id});
        return res.status(200).json(task)
    }
//atualizar o titulo e a descrição de uma tarefa
    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body

        await knex ("tasks").where({id}).update({title, description})
        return res.status(200).json("registro atualizado com sucesso!")
    }
    //atualizar status de uma tarefa
    async updateTaskStatus(req, res) {
        const {id} = req.params

        await knex ("tasks").where({id}).update({isCompleted: true})
        return res.status(200).json("Tarefa concluída!! Bom trabalho!");
    }
    //delentando tarefa
    async deleteTask(req, res) {
        const {id} = req.params

        await knex("tasks").where({id}).delete()
        return res.status(200).json("Tarefa deletada com sucesso! Até!!")
    }

}
//
module.exports = TaskController