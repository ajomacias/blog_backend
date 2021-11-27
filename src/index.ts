import sequelize from "./sequelize/db/db";
import app from "./components/app";
import "./sequelize/models";

app.listen(app.get('port'),()=>{
    console.log("server run in port "+ app.get('port'));
    sequelize.sync({ force:false }).catch((err)=>{
      console.log(err)
    })
})