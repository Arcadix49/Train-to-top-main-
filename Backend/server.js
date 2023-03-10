import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import coachRouter from './routes/coachRouter.js'; 
import {auth} from './middleware/authMiddleware.js';
import userRouter from './routes/publicRouter.js';

const app = express();

// APP USE

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// BDD

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://romsmoxx:xQPFlvLGUCVWjYs4@traintotop.yg0gere.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de données établie");
    app.use('/auth', authRouter);
    app.use('/article', publicRouter);
    app.use('/coach', [auth.verifyToken], coachRouter)
    app.use('/team', [auth.verifyToken], teamRouter)


})

app.listen(9576,function(){
    console.log(`http://localhost:9576`);
});