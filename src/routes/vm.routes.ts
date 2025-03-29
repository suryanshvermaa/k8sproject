import {Router} from 'express';
import { createVM } from '../controllers/vm.controller';
import { authMiddleware } from '../middlewares/authorisation';
const vmRouter=Router();

vmRouter
.post('/createVM',authMiddleware,createVM)

export default vmRouter;