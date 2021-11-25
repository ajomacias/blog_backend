import { Router } from "express";
import { UserInterface } from "./userInterface";
import { Users } from "../../sequelize/models/";
import { Op } from "sequelize"; "sequelize";
import bcrypt from "bcrypt"

const userRouter = Router();

userRouter.get("/", async (req, res): Promise<UserInterface[] | object> => {
    const data = await Users.findAll()
    return res.status(200).json(data);
})
userRouter.post("/", async (req, res): Promise<UserInterface | object> => {

    const user = req.body.user;
    const email = req.body.email;
    let password = req.body.pass;
    password = await bcrypt.hash(password, 8);

    console.log(password);

    if (!user || !email || !password) {
        return res.status(401).json({
            err: "A ocurrido un error al registrarse"
        })
    }

    const compDate = await Users.findOne({
        where:{[Op.and]:[
            {alias_user:password},
            {email_user:email}
        ]
        }
    })

    if(compDate){
        return res.status(401).json({
            err:"Este usuario ya existe"
        })
    }

    const userCreate = await Users.create({
        alias_user: user,
        email_user: email,
        password_user: password
    })

    if(!userCreate){
        return res.status(401).json({
            err:"A ocurrido un error al registrarse"
        })
    }

    return res.status(200).json({
        date: userCreate,
        msj: "Se a registrado correctamente"
    });
})

export default userRouter;