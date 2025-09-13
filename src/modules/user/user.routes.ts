import { Router } from "express";
import { createUser, getAllUser } from "./user.controller";

export const UserRouter = Router()
    .get("/", getAllUser)
    .post("/", createUser)