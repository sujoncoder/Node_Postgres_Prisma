import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

export const createUserService = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createdUser = await prisma.user.create({
        data: payload
    });
    return createdUser;
};

export const getAllUserService = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
};