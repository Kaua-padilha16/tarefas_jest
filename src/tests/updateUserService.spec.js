const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UpdateUserService = require("../services/UserServices/UpdateUserService")

describe("updateUserService", () => {
    let userRepository = null
    let userCreateService = null
    let updateUserService = null
    
    it("should be possible to update an user", async () => {
        const user = {
            name: "user test",
            email: "user@test.com",
            password: "357"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        updateUserService = new UpdateUserService(userRepository)

        const userCreated = await userCreateService.execute(user)

        userCreated.name = "User updated",
        userCreated.email = "update@gmail.com"

        const updatedUser = await updateUserService.execute({userCreated})
       
        expect(updatedUser).toHaveProperty("email", updatedUser.email)
    })
})