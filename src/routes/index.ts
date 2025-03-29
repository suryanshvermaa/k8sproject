import {Router} from 'express';
import userRouter from './user.routes';
import vmRouter from './vm.routes';
const router=Router();

router
.use('/api/v1',userRouter)
.use('/vm',vmRouter)

export default router;