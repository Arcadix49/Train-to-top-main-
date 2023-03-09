import express from 'express';
import { createTeam , deleteTeam, updateTeam, getTeam} from '../controllers/coachController.js';
import {auth} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/coach'); //add controller backoffice 
router.post('/teams',[auth.verifyToken], createTeam)
router.delete('/teams/:id',[auth.verifyToken], deleteTeam);
router.put('/teams/:id', [auth.verifyToken],updateTeam);
router.get('/teams/:id', [auth.verifyToken],getTeam);

export default router