
class TaskListService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }
    async execute() {
        const taskList = await this.taskRepository.listTask()
        return taskList
    }
}

module.exports = TaskListService