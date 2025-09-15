import { Request, Response } from "express";
import { googleLoginService, loginService } from "./auth.service";


// LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const result = await loginService(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(201).send(error)
    }
};


// GOOGLE LOGIN
export const googleLogin = async (req: Request, res: Response) => {
    try {
        const result = await googleLoginService(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(201).send(error)
    }
};