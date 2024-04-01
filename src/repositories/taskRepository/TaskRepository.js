const knex = require("../../database/knex")

class TaskRepository {
    async createTask({title, description, user_id}) {
        const isCompleted = false
        const taskId = await knex("tasks").insert({title, description, isCompleted, user_id});
        return taskId
    }
    async listTask() {
        const tasks = await knex("tasks");
        return tasks
    }
    async listTaskById({id}) {
        const task = await knex("tasks").where({id})
        return task
    }
    async updateTask(title, description, task_id) {
        const task = await knex("tasks").where({id: task_id})

        task.title = title ?? task.title
        task.description = description ?? task.description

        await knex("tasks").where({id: task_id}).update({title: task.title, description: task.description})
        return task
    }
}
module.exports = TaskRepository