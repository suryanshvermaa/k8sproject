import {Router} from 'express';
import { login, signup } from '../controllers/user.controller';
const userRouter=Router();

userRouter
.post('/signup',signup)
.post('/login',login)

export default userRouter;