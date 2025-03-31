import {Router} from 'express';
import { authMiddleware } from '../middlewares/authorisation';
import { launchVM } from '../controllers/vm.controller';
const vmRouter=Router();

vmRouter
.post('/createVM',authMiddleware,launchVM)

export default vmRouter;