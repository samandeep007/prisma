import { prisma } from '../prisma/index.js';

//Create a post
const createPost = async (req, res) => {
    try {
        const authorId = req.user.id;
        const { title, body, slug } = req.body;
        if ([title, body, slug].some(field => !field || field === "")) {
            return res.status(400).json({ success: false, message: "Please provide all the details" })
        }

        const newPost = await prisma.post.create({
            data: {
                title: title,
                body: body,
                slug: slug,
                author: { connect: { id: authorId } }
            }
        })

        return res.status(200).json({ success: true, message: "Post created successfully", data: newPost })

    } catch (error) {
        console.error("post.controller :: createPost :: something went wrong ::", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!post) {
            return res.status(400).json({ success: false, message: "The post doesn't exist" });
        }

        return res.status(200).json({ success: true, message: "Post retrieved successfully!", data: post });


    } catch (error) {
        console.error("post.controller :: getPost :: Something went wrong ::", error);
        return res.status(500).json({ success: false, message: "Something went wrong while deleting the post" }); 0
    }
}

const getAllPosts = async (req, res) => {
    try {
        const authorId = req.user.id;
        const posts = await prisma.post.findMany({
            where: {
                authorId: authorId
            }
        });

        if (!posts || posts.length === 0) {
            return res.status(200).json({ success: true, message: "User doesn't have posts currently" });
        }

        return res.status(200).json({ success: false, message: "Posts retrieved successfully!", data: posts });
    } catch (error) {
        console.error("post.controller :: getAllPosts :: Something went wrong ::", error);
        return res.status(200).json({ success: false, message: "Something went wrong while retrieving the posts" })
    }
}
const updatePost = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const updatedPost = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                body: body
            }
        })

        return res.status(200).json({ success: true, message: "Post updated successfully", data: updatedPost })


    } catch (error) {
        console.error("post.controller :: updatePost :: something went wrong ::", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json({ success: true, message: "Post deleted successfully" })

    } catch (error) {
        console.error("post.controller :: deletePost :: something went wrong ::", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export { createPost, getPost, updatePost, deletePost, getAllPosts }