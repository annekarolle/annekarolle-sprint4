import { hash } from "bcrypt"
import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"
import { IUserUpdate } from "../interfaces/users"


const updateUserService = async (body: IUserUpdate, id: string, userIdRequest: string, isAdm: boolean): Promise<User | Array<string | number>> =>{

    const userRepo = AppDataSource.getRepository(User)    

    const findUser = await userRepo.findOneBy({
        id: id
    })

    if(!findUser){
        return ['User not Found', 404]
    }   
       
    if(body.id){
        return ['nao pode mudar id', 400]
    }

    if(body.isActive){
        return ['nao pode mudar atividade', 400]
    }

    if(body.isAdm){
        return ['nao pode mudar adm', 400]
    }

 
    if(isAdm === true || findUser.id === userIdRequest){        
        await userRepo.update(
            id,
            {
                name: body.name ? body.name : findUser.name,
                email: body.email ? body.email : findUser.email,
                password: body.password ? await hash(body.password, 10) : findUser.password,
                isAdm: findUser.isAdm,
                isActive: findUser.isActive,
                id: findUser.id
            }
        )  
    }

    if(isAdm === false){
        return ['User not Found', 401]
    }
        
    const user = await userRepo.findOneBy({
        id
    })

    return user! 
   
   

}
 export default updateUserService