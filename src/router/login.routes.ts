import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";

const loginRoutes = Router()

loginRoutes.post("", createLoginController)

export default loginRoutes