import { JwtPayload } from "jsonwebtoken"

export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUser {
    id: string
    name: string
    email: string
    isAdm: boolean   
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    id?: string
    isAdm?: boolean 
    isActive?: boolean
    
}

export interface IDecoded extends JwtPayload{
    id: string,
    isAdmin: boolean
}