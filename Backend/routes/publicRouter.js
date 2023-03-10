import express from 'express';
import {addComment, deleteComment} from '../controllers/commController.js';
import {getArticles} from '../controllers/articleController.js';
import {auth} from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/article/:id', getArticles)// controller affichage article 
router.post('/article/comment',[auth.verifyToken], addComment);// controller comment
router.delete('/article/comment/:id/',[auth.verifyToken], deleteComment)//controller comment delete

export default router