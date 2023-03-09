import mongoose from "mongoose";

const articleModel = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,  
    },
    images: [{
        type: String,
    }],
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject:{
        type: String,
    }
    }, {
        timestamps: true,
    }
);

export default mongoose.model('Article', articleModel);
