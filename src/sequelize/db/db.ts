import { Sequelize } from "sequelize";
import { ConfigInterface, getData } from "../../config";

const data : ConfigInterface = getData();

const sequelize = new Sequelize(data.database,data.user,data.password,{
    host:data.host,
    dialect: "mysql"
})

export default sequelize;