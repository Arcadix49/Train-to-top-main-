import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,  
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    }, {
        timestamps: true,
    }
);

export default mongoose.model('Comment', commentModel);
