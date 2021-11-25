import { Router } from "express";
import { UserInterface } from "./userInterface";
import { Users } from "../../sequelize/models/";

const userRouter = Router();

userRouter.get("/",async(req,res):Promise<UserInterface[] | any>=>{
    const data = Users.findAll()
    return res.json(data);
})

export default userRouter;