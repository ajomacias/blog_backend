import express from "express";
import cors from "cors";          
import { config } from "dotenv";

config();   

const app = express();    

app.use(express.json());   
app.use(cors());
app.set('port',process.env.PORT || 4000 );

export default app;