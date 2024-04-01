class TaskListByIdService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute({id}) {
        const taskById = await this.taskRepository.listTaskById({id})
        return taskById
    }
}

module.exports = TaskListByIdService