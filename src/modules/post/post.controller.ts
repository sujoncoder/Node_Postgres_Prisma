import { Request, Response } from "express";
import { createPostService, deleteSinglePostService, getAllPostService, getSinglePostService, updateSinglePostService } from "./post.service";


// CREATE POST
export const createPost = async (req: Request, res: Response) => {
    try {
        const result = await createPostService(req.body);
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// GETT ALL POST
export const getAllPost = async (req: Request, res: Response) => {
    try {
        const result = await getAllPostService();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// GET SINGLE POST
export const getPost = async (req: Request, res: Response) => {
    try {
        const result = await getSinglePostService(Number(req.params.id));
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// UPDATE SINGLE POST
export const updateSinglePost = async (req: Request, res: Response) => {
    try {
        const result = await updateSinglePostService(Number(req.params.id), req.body);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


// DELETE SINGLE POST
export const deleteSinglePost = async (req: Request, res: Response) => {
    try {
        const result = await deleteSinglePostService(Number(req.params.id));
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};