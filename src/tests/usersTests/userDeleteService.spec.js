const UserRepositoryInMemory = require("../../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../../services/UserServices/UserCreateService")
const UserDeleteService = require("../../services/UserServices/UserDeleteService")
const UserListService = require("../../services/UserServices/UserListService")

describe("UserDeleteService", () => {
    let userRepository = null
    let userCreateService = null
    let userDeleteService = null
    let userListService = null
    
    it("should be possible delete an user", async () => {
        const user = {
            name: "user test1",
            email: "user@test.com",
            password: "357"
        }
        
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userDeleteService = new UserDeleteService(userRepository)
        userListService = new UserListService(userRepository)

        await userCreateService.execute(user)

        await userDeleteService.execute(user)

        const users = await userDeleteService.execute(user)
        
        expect(users).toHaveLength(0)
    })
    
    it("user shoul be possible delete an specific user", async () => {

        const user1 = {
            name: "user test 1",
            email: "user1@test.com",
            password: "400"
        }
        const user2 = {
            name: "user test 2",
            email: "user2@test.com",
            password: "300"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userDeleteService = new UserCreateService(userRepository)
        userListService = new UserListService(userRepository)

        const firstUser = await userCreateService.execute(user1)
        const secondUser = await userCreateService.execute(user2)

        const list = await userListService.execute()

        await userDeleteService.execute(firstUser)

        expect(list).not.toHaveProperty("name", "user test 1")
    })
})