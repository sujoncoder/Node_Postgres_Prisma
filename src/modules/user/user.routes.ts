import { Router } from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "./user.controller";


// USER ROUTER
export const UserRouter = Router()
    .get("/", getAllUser)
    .post("/", createUser)
    .get("/:id", getSingleUser)
    .put("/:id", updateUser)
    .delete("/:id", deleteUser)