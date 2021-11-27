import { Router } from "express";
import { UserInterface } from "./userInterface";
import { Users } from "../../sequelize/models/";
import { Op } from "sequelize"; "sequelize";
import bcrypt from "bcrypt"

const userRouter = Router();

userRouter.get("/:user", async (req, res): Promise<UserInterface[] | object> => {

    const user = req.params.user;
    if (!user) {
        return res.status(500).json({ err: "noTFound" })
    }

    const data = await Users.findOne({
        attributes: ["alias_user", "email_user"],
        where: {
            [Op.or]: [{ alias_user: user }, { email_user: user }]
        }
    })

    if (!data) {
        return res.status(401).json({ err: "hubo un error al buscar el usuario" })
    }
    return res.status(200).json({
        msj: "usuario encontrado :)",
        data: data
    })
})

userRouter.post("/", async (req, res): Promise<UserInterface | object> => {

    let body = req.body;

    if (!body.user || !body.email || !body.pass) {
        return res.status(401).json({ err: "Faltan datos" })
    }

    const compDate = await Users.findOne({
        where: {
            [Op.and]: [{ alias_user: body.pass }, { email_user: body.email }]
        }
    })

    if (compDate) {
        return res.status(401).json({ err: "Este usuario ya existe" })
    }

    body.pass = await bcrypt.hash(body.pass, 8);

    let userCreate: object;
    try {
        userCreate = await Users.create({
            alias_user: body.user,
            email_user: body.email,
            password_user: body.pass
        })
    } catch {
        return res.status(401).json({ err: "err en registrase" })
    }

    if (!userCreate) {
        return res.status(401).json({
            err: "A ocurrido un error al registrarse"
        })
    }

    return res.status(200).json({
        date: userCreate,
        msj: "Se a registrado correctamente"
    });
})

userRouter.post("/verify", async (req, res) => {

    let body = req.body;

    if (!body.pass || !body.id) {
        return res.status(401).json({ err: "Faltan datos" })
    }

    const vU: any = await Users.findOne({
        attributes: ["password_user", "alias_user"],
        where: { id_user: body.id }
    })

    if (!vU) {
        return res.status(401).json({err: "Por favor inicie sesion nuevamente"})
    }
    let verify = await bcrypt.compare(body.pass, vU.password_user);

    if (!verify) {
        return res.status(401).json({err: "contraseña incorrecta"})
    }

    return res.status(200).json({
        data: vU
    })
})

userRouter.put("/verify", (req, res) => {

    let body = req.body;
    let head = req.get("verify");

    if (!head || !body.pass) {
        return res.status(401).send({err: "faltan valores"})
    }
    const hash = head?.split(" ")[0];
    const noHash = head?.split(" ")[1];
    return res.send(`
    <style>
    h1{
        color:blue;
    }
    </style>
    <h1>con color rojo<h1>`)

})

export default userRouter;