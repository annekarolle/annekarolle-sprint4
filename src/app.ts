import "reflect-metadata"
import express from "express"
import userRoutes from "./router/user.routes"
import loginRoutes from "./router/login.routes"



const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login',loginRoutes)



export default app