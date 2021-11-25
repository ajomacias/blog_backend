import express from "express";
import cors from "cors";          
import { config } from "dotenv";
import userRouter from "./user/userController";
import morgan from "morgan"

config();   

const app = express();    

app.set('port',process.env.PORT || 4000 );

app.use(express.json());   
app.use(cors());
app.use("/user", userRouter);
app.use(morgan("tiny"));

export default app;