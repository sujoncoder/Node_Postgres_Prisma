import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";


// CREATE USER SERVICE
export const createUserService = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createdUser = await prisma.user.create({
        data: payload
    });
    return createdUser;
};


// GET ALL USER SERVICE
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
            updatedAt: true,
            Post: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
};


// GET SINGLE USER SERVICE
export const getSingleUserService = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            Post: true
        }
    })
    return result;
};


// USER UPDATE USER SERVICE
export const updateUserService = async (id: number, data: Prisma.UserUpdateInput) => {
    const result = await prisma.user.update({
        where: {
            id: id,
        },
        data: data,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            Post: true
        }
    });
    return result;
};


// DELETE USER SERVICE
export const deleteUserService = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            Post: true
        }
    })
    return result;
};