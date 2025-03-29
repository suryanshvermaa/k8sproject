import express,{NextFunction, Request,Response} from 'express';
import 'dotenv/config';
import cors from "cors";
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import { AppError } from './middlewares/error';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"localhost:3000"}))
app.use('/',router);

//health route
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).send('healthy');
})

//error route
app.get('/error',(req:Request,res:Response,next:NextFunction)=>{
    try {
        throw new AppError("route error",400);
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server is running on port',port);
})