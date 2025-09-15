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
export const getAllPostService = async ({
    page = 1,
    limit = 2,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean
    tags?: string[]
}) => {

    const skip = (page - 1) * limit;
    console.log(tags)
    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } }
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.post.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    };
};


// GET SINGLE POST SERVICE
export const getSinglePostService = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: { views: { increment: 1 } }
        });
        return await tx.post.findUnique({ where: { id }, include: { author: true } })
    })
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


// STATE
export const getBlogStatService = async () => {
    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true }
        })

        const featuredCount = await tx.post.count({
            where: { isFeatured: true }
        });

        const topFeatured = await tx.post.findFirst({
            where: { isFeatured: true },
            orderBy: { views: "desc" }
        });

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastPastWeekPost = await tx.post.count({
            where: { createdAt: { gte: lastWeek } }
        });

        return {
            stats: {
                totalPosts: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0,
            },
            featured: {
                count: featuredCount,
                topPost: topFeatured
            },
            lastPastWeekPost
        }
    })
};