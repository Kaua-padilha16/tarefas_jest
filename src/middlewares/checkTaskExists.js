const knex  = require("../database/knex");

async function checkTaskExists(req, res, next) {
    const {task_id} = req.params
    const task = await knex("tasks").where({task_id})
    
     if(task.length === 0) {
        return res.status(400).json("Tarefa não encontrada!!")
    } 
    next()
}

module.exports = checkTaskExists