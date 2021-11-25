import {DataTypes, Model} from "sequelize";
import sequelize  from "../db/db";

export class Articles extends Model{ }

Articles.init({
    id_article:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key: "id_user"
        }
    },
    title_article:{
        type: DataTypes.STRING,
        allowNull:false,
        
    },
    description_article:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    category_article:{
        type:DataTypes.STRING,
        allowNull:true
    },

},{
    sequelize,
    modelName:"article",
    updatedAt:false
}
)