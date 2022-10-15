import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { IUserUpdate } from '../interfaces/users'
import { deleteUserService } from '../services/deleteUser.service'
import listUserService from '../services/listUser.service'
import updateUserService from '../services/updateUser.service'
import userCreateService from '../services/userCreate.services'



export const userCreateController = async (req: Request, res: Response) => {


    try {
        const {name, email, password, isAdm} = req.body

        const newUser =  await userCreateService({name, email, password, isAdm})

        const resposta = {
            email: newUser.email,
            name: newUser.name,
            isAdm: newUser.isAdm,
            isActive: newUser.isActive,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            id: newUser.id
        }
        
        return res.status(201).send(resposta)

    } catch (err) {

        if (err instanceof Error) {

            return res.status(400).send({        
                "message": err.message
            })
        }
    }
}



export const listUsersController = async (req: Request, res: Response) =>{

     const users = await listUserService()
    return res.json(users)
}


export const updateUserController =async (req: Request, res: Response) => {
    try {
        
        const body: IUserUpdate = req.body
        const userIdRequest = req.user.id
        const isAdm = req.user.isAdm       
        const id: string = req.params.id

         const updateUser = await updateUserService(body, id, userIdRequest, isAdm)

        
         if(body.id?.toString() || body.isActive?.toString() || body.isAdm?.toString()){        

            return res.status(401).json({
                message: 'Não pode!'
            })
        }

        if(updateUser instanceof User){
        
            
            return res.json(updateUser)
        }
        return res.status(updateUser[1] as number).json({
            message: updateUser[0]
        })
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                message: error.message
            })
        }
    }


}

export const deleteUserController = async (req: Request, res: Response) => {
    
        try {
            const {id} = req.params

            const deleteUser = await deleteUserService(id)

            if(deleteUser instanceof User){
                return res.status(204).json({message: 'User delete with sucess'})
            } 

             return res.status(deleteUser[1] as number).json({
            message: deleteUser[0]
             })
            
            
        } catch (error) {
            if(error instanceof Error){
                return res.status(404).json({
                    message: error.message
                })
            }
            
        }
}

