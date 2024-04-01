
class UpdateTaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute({title, description, task_id}) {
        const updateTask = await this.taskRepository.updateTask({title, description, task_id})
        return updateTask
    }
}

module.exports = UpdateTaskService