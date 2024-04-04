const TaskRepositoryInMemory = require("../../repositories/taskRepository/TaskRepositoryInMemory")
const UserRepositoryInMemory = require("../../repositories/userRepository/UserRepositoryInMemory")

const TaskCreateService = require("../../services/TaskServices/taskCreateService")
const TaskDeleteService = require("../../services/TaskServices/taskDeleteService")
const TaskListService = require("../../services/TaskServices/taskListService")
const UpdateTaskService = require("../../services/TaskServices/updateTaskService")
const UserCreateService = require("../../services/UserServices/UserCreateService")

describe("TaskServices", () => {
    let userRepository = null
    let userCreateService = null

    let taskRepository = null
    let taskCreateService = null
    let taskListService = null
    let updateTaskService = null
    let taskDeleteService = null

beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepository)
    
    taskRepository = new TaskRepositoryInMemory()
    taskCreateService = new TaskCreateService(taskRepository)
    taskListService = new TaskListService(taskRepository)
    updateTaskService = new UpdateTaskService(taskRepository)
    taskDeleteService = new TaskDeleteService(taskRepository)
})

//criar tarefa
it("should be able to create a new task", async () => {

    const user = {
        name: "user test",
        email: "user@test.com",
        password: "123"
    }
    const userCreated = await userCreateService.execute(user);

    const task = {
        title: "o monte",
        description: "do anciao",
        user_id: userCreated.user_id
    }

    const taskCreated = await taskCreateService.execute(task)

    expect(taskCreated).toHaveProperty("user_id", userCreated.user_id)
})
//listar tarefa
it("should be possible list tasks", async () => {
    const user1 = {
        name: "user1 test",
        email: "user1@test.com",
        password: "1123"
    }
    
    const user2 = {
        name: "user2 test",
        email: "user2@test.com",
        password: "1223"
    }
    const userCreated = await userCreateService.execute(user1, user2);

    const task1 = {
        title: "user test1",
        description: "user1@test.com",
        user_id: userCreated.user_id
    }
    const task2 = {
        title: "user test2",
        description: "user2@test.com",
        user_id: userCreated.user_id
    }

    await taskCreateService.execute(task1)
    await taskCreateService.execute(task2)


    const listTasks = await taskListService.execute()
    expect(listTasks).toEqual(expect.arrayContaining(listTasks))
})
//atualizar tarefa
it("should be possible to update an task", async () => {
    const user3 = {
        name: "user3 test",
        email: "user3@test.com",
        password: "1133"
    }
    const userCreated = await userCreateService.execute(user3)

    const task = {
        title: "jane",
        description: "0023",
        user_id: userCreated.user_id
    }
    const taskCreated = await taskCreateService.execute(task)

    taskCreated.title = "kaua",
    taskCreated.description = "1111"

    const updatedTask = await updateTaskService.execute(taskCreated)
   
    expect(updatedTask).toHaveProperty("title", "kaua")
    console.log(updatedTask)
})
//deletar tarefa
it("should be able to delete a task", async () => {
    const user = {
        name: "user test",
        email: "user@test.com",
        password: "123"
    }
    const userCreated = await userCreateService.execute(user);

    const task = {
        title: "o monte",
        description: "do anciao",
        user_id: userCreated.user_id
    }
    await taskCreateService.execute(task)

    await taskDeleteService.execute(task)

    const list = await taskListService.execute()

    expect(list).not.toHaveProperty("title", "o monte")
    })
})