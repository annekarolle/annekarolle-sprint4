import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { IDecoded } from '../interfaces/users'



const tokenAuthValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
        if(error){
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }

        if (decoded) {
            req.user = {
                id: decoded.sub as string,
                isAdm: (<IDecoded>decoded).isAdm as boolean
            }  
        }
        

    return next()
    })

    
}

export default tokenAuthValidationMiddleware