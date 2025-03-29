import express,{Request,Response} from 'express';
import 'dotenv/config';
import cors from "cors";
import router from './routes';
import errorHandler from './middlewares/errorHandler';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"localhost:3000"}))
app.use('/',router);

//health route
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).send('healthy');
})

app.use(errorHandler);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server is running on port',port);
})