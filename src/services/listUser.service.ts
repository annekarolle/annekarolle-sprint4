import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"
import { IUser } from "../interfaces/users"

const listUserService = async (): Promise<IUser[]> =>{

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    return users

}

export default listUserService