
class UpdateUserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async execute({name, email, user_id}) {
        const updateUser = await this.userRepository.updateUser({name, email, user_id})
        return updateUser
    }
}

module.exports = UpdateUserService
