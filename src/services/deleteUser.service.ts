import { DataSource } from "typeorm"
import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"



export const deleteUserService = async (id: string): Promise<User | Array<string | number>> => {

    const userRepo = AppDataSource.getRepository(User)

    const findUser = await userRepo.findOneBy({
        id
    })

    if (!findUser) {
        return ['User not Found', 404]
    }
    
    if(findUser.isActive === false){
        return ['User not Found', 400]
    }
          
    
    
    await userRepo.update(
            id,
            {
                isActive: false
            }
        )
    

    const user = await userRepo.findOneBy({
        id
    })

    return user!
}