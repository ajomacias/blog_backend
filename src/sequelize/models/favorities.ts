import { Model, DataTypes } from "sequelize"
import sequelize from "../db//db"

export class Favorites extends Model { }

Favorites.init({
    id_favorite:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"id_user"
        }
    },
    id_article:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"articles",
            key:"id_article"
        }
    }
},{
    sequelize,
    modelName:"favorite",
    timestamps:false
}
)