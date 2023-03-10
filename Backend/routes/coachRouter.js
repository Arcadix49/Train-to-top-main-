import express from 'express';
import { createTeam , deleteTeam, updateTeam, getTeam} from '../controllers/coachController.js';
import {auth} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/coach-back'); //add controller backoffice 

//Team crud
router.post('/teams',[auth.verifyToken], createTeam)
router.delete('/teams/:id',[auth.verifyToken], deleteTeam);
router.put('/teams/:id', [auth.verifyToken],updateTeam);
router.get('/teams/:id', [auth.verifyToken],getTeam);

//Article (training) crud
router.post('/articles',[auth.verifyToken])
router.delete('/articles/:id',[auth.verifyToken]);
router.put('/articles/:id', [auth.verifyToken]);
router.get('/articles/:id', [auth.verifyToken]);

export default router