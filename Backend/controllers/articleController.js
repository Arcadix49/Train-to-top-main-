import Article from "../models/articleModel.js";


export const getArticles = (req, res) => {
    Article.find({})
        .then(Article => {
            res.status(200).json({ Article });
        })
        .catch(error => res.status(500).json({ error }));
}