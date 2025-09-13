import { Router } from "express";
import { createPost, deleteSinglePost, getAllPost, getPost, updateSinglePost } from "./post.controller";



// POST ROUTER
export const PostRouter = Router()
    .get("/", getAllPost)
    .post("/", createPost)
    .get("/:id", getPost)
    .patch("/:id", updateSinglePost)
    .delete("/:id", deleteSinglePost)
