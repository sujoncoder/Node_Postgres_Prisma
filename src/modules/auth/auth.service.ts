import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


// LOGIN SERVICE
export const loginService = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found!")
    };

    if (password === user.password) {
        return user
    } else {
        throw new Error("Password is incorrect!")
    }
};


// GOOGLE LOGIN SERVICE
export const googleLoginService = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (!user) {
        user = await prisma.user.create({
            data
        })
    };

    return user;
};