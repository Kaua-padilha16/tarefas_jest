
class UserListByIdService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async execute({user_id}) {
        const userById = await this.userRepository.listUserById({user_id})
        return userById
    }
}

module.exports = UserListByIdService
