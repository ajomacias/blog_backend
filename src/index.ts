import sequelize from "./sequelize/db/db";
import app from "./components/app";
import "./sequelize/models";

app.listen(app.get('port'),async()=>{
    console.log("server run in port "+ app.get('port'));
    await sequelize.sync({ force:false }).catch((err)=>{
      console.log(err)
    })
})