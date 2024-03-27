import { Schema, model } from "mongoose";


const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    },
    blogID: {
        type: Schema.Types.ObjectId,
        ref: 'blog',

    }
}, {
    timestamps: true,
})

const Comment = model("comment", CommentSchema);

export default Comment;