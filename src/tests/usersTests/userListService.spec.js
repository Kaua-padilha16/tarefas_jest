const UserRepositoryInMemory = require("../../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../../services/UserServices/UserCreateService")
const UserListService = require("../../services/UserServices/UserListService")

describe("UserListService", () => {
    let userRepository = null
    let userCreateService = null
    let userListService = null
    
    it("should be possible list users", async () => {
        const user1 = {
            name: "user test1",
            email: "user1@test.com",
            password: "357"
        }
        const user2 = {
            name: "user test2",
            email: "user2@test.com",
            password: "123"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userListService = new UserListService(userRepository)

        await userCreateService.execute(user1)
        await userCreateService.execute(user2)

        const listUsers = await userListService.execute()
        
        expect(listUsers).toEqual(expect.arrayContaining(listUsers))
    })
})