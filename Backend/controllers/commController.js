import Comment from "../models/commentModel.js";

export const addComment = async(req,res) => {

    const { title, content} = req.body;

    const newComment = new Comment({
        title,
        content,
        user: req.userID
    });

    try {
        await newComment.save();
    
        res.status(201).json(newComment);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

export const deleteComment = (req, res) => {
    Comment.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    
}