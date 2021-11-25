import sequelize from "../db/db";
import { Model, DataTypes } from "sequelize";

export class Users extends Model { }

Users.init({
    id_user:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    alias_user:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email_user:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password_user:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"user",
    updatedAt:false
})