import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import createLoginService from '../services/login.service'

export const createLoginController = async (req:Request, res: Response) =>{

    try {
        const data: IUserLogin = req.body
        const token = await createLoginService(data)

        return res.json({token})
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(403).json({
                message: error.message
            })
        }
    }

}