import { Request, Response, NextFunction } from 'express'

const adminValidationMiddleWare = async(req: Request, res: Response, next: NextFunction) => {

    if(!req.user.isAdm){
        return res.status(403).json({
            message: 'User is not admin'
        })
    }             

    next()

}


export default adminValidationMiddleWare