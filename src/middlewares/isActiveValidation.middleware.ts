import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'

const isActiveValidationMiddleWare = async(req: Request, res: Response, next: NextFunction) => {
    
    const usuarioIsActive = req.user.id
    
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: usuarioIsActive
    })
    
    
    if(!user?.isActive){           
          return res.status(400).json({
            message: 'User not active'
       })
    } 

    next()

}


export default isActiveValidationMiddleWare