import { Prisma, Post } from "@prisma/client";
import { prisma } from "../../config/db";


// CREATE POST SERVICE
export const createPostService = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const createdPost = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    return createdPost;
};


// GET ALL POST SERVICE
export const getAllPostService = async () => {
    const allPost = await prisma.post.findMany();
    return allPost;
};


// GET SINGLE POST SERVICE
export const getSinglePostService = async (id: number) => {
    const post = await prisma.post.findUnique({ where: { id } })
    return post;
};


// UPDATE SINGLE POST SERVICE
export const updateSinglePostService = async (id: number, payload: Prisma.PostUpdateInput) => {
    const updatePost = await prisma.post.update({
        where: { id },
        data: payload
    })
    return updatePost;
};


// DELETE SINGLE POST SERVICE
export const deleteSinglePostService = async (id: number) => {
    const deletePost = await prisma.post.delete({ where: { id } })
    return deletePost;
};