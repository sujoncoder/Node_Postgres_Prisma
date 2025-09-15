import { Router } from "express";
import { googleLogin, login } from "./auth.controller";


export const AuthRouter = Router()
    .post("/login", login)
    .post("/google", googleLogin)