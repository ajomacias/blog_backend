import { ConfigInterface } from "./configInterface";
import { config } from "dotenv"

config()

export const getData = (): ConfigInterface => {
    return {
        database: process.env.DATABASE || "" ,
        password: process.env.PASSWORD || "" ,
        user: process.env.USER || ""  ,
        dialect: process.env.DIALECT || "mysql"  ,
        host: process.env.HOST || "localhost"  ,
    }
}