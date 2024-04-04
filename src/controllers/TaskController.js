//importando arquivo de conexão com o banco de dados 
const knex = require("../database/knex");
const TaskRepository = require("../repositories/taskRepository/taskRepository")
const TaskCreateService = require("../services/TaskServices/taskCreateService")
const TaskListService = require("../services/TaskServices/taskListService")
const TaskListByIdService = require("../services/TaskServices/taskListById")
const UpdateTaskService = require("../services/TaskServices/updateTaskService")

const taskRepository = new TaskRepository()

const taskCreateService = new TaskCreateService(taskRepository)
const taskListService = new TaskListService(taskRepository)
const taskListByIdService = new TaskListByIdService(taskRepository)
const updateTaskService = new UpdateTaskService(taskRepository)

//nome da classe
class TaskController {
// async significa assincrona, algo que acontece depois
//criar tarefas
    async createTask(req, res) {
        const {user_id} = req.params;
        const {title, description} = req.body;

        await taskCreateService.execute({title, description, user_id})

        return res.status(201).json("Tarefa criada com sucesso!!");
    }
//listar tarefas
    async listTask(req, res) {
        //await significa aguarde, pool é o arquivo passado anteriormente e query significa consulta.
        
        const tasks = await taskListService.execute()

        return res.status(200).json(tasks)
    }
//selecionar uma terefa especifica pelo id
    async listTaskById(req, res) {
        const {id} = req.params
        
        const task = await taskListByIdService.execute({id})

        return res.status(200).json(task)
    }
//atualizar o titulo e a descrição de uma tarefa
    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body

        await updateTaskService.execute({title, description, id})

        return res.status(200).json("registro atualizado com sucesso!")
    }
    //atualizar status de uma tarefa
    async updateTaskStatus(req, res) {
        const {task_id} = req.params

        await knex ("tasks").where({task_id}).update({isCompleted: true})
        return res.status(200).json("Tarefa concluída!! Bom trabalho!");
    }
    //delentando tarefa
    async deleteTask(req, res) {
        const {task_id} = req.params

        await knex("tasks").where({id}).delete()
        return res.status(200).json("Tarefa deletada com sucesso! Até!!")
    }

}
//
module.exports = TaskController