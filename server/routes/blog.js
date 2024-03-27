import { Router } from "express"
import multer from "multer";
import { validateToken } from "../utils/auth.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/images");
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null, fileName);
    }
})
const upload = multer({ storage });

router.post("/upload", upload.single("photo"), (req, res) => {
    return res.json({
        message: "Uploded",
        success: true,
        filename: req.file.filename,
    })
})

router.post("/createBlog", async (req, res) => {
    const { title, description, coverImage, token } = req.body;

    const createdBy = validateToken(token)._id;
    const blog = await Blog.create(
        {
            title,
            description,
            coverImage,
            createdBy
        }
    )
    try {
        res.status(200).json({
            message: "Blog Successfully Created",
            success: true,
            data: blog,
        })
    } catch (error) {
        res.status(406).json({
            message: error,
            success: false,
        })
    }
})

router.get("/fetchAllBlog", async (req, res) => {
    const blog = await Blog.find({}, { _id: 1, title: 1, description: 1, coverImage: 1, createdBy: 1 });
    if (!blog) {
        return res.status(406).json({
            message: "Error",
            success: false,
        })
    }
    return res.status(200).json({
        message: "Successfully fetched all blogs",
        success: true,
        data: blog
    })
})

router.get("/fetchBlog/:id", async (req, res) => {
    const id = req.params.id;
    // const blog = await Blog.findOne({ _id: id }).populate("createdBy");
    const blog = await Blog.findOne({ _id: id });
    const comment = await Comment.find({ blogID: id }).populate("createdBy");
    return res.status(200).json({
        message: "successfully fetched the blog",
        success: true,
        data: blog,
        comment: comment,
    })
})

router.delete("/deleteBlog/:id", async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.deleteOne({ _id: id });
    if (blog) {
        return res.status(200).json({
            message: "Blog deleted successfully",
            success: true,
            data: blog,
        })
    } else {
        return res.json({
            message: "Not Found",
            success: false,
        })
    }
})

router.post("/creteComment", async (req, res) => {
    const { createdBy, blogID, content } = req.body;
    const comment = await Comment.create({
        content,
        createdBy,
        blogID
    })
    if (comment) {
        return res.status(200).json({
            message: "comment posted sussefully",
            success: true,
        })
    } else {
        return res.json({
            message: "error",
            success: false,
        })
    }
})
export default router; 