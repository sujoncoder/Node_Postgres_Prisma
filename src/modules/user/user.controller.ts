import { Request, Response } from "express";
import { createUserService, getAllUserService } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await createUserService(req.body);
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await getAllUserService();
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};