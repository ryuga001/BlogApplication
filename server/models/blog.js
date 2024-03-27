import { Schema, model } from "mongoose";


const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    coverImage: {
        type: String,

    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    }
}, {
    timestamps: true,
})

const Blog = model("blog", BlogSchema);

export default Blog;