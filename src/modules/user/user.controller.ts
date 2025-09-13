import { Request, Response } from "express";
import { createUserService, deleteUserService, getAllUserService, getSingleUserService, updateUserService } from "./user.service";


// CREATE USER
export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await createUserService(req.body);
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// GET ALL USER
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await getAllUserService();
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// GET SINGLE USER
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await getSingleUserService(Number(req.params.id));
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// GET SINGLE USER
export const updateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await updateUserService(Number(req.params.id), data);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await deleteUserService(Number(req.params.id));
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};