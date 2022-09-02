const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const serverPort =  require('./configs/serverPort');
const dbUrl = require('./configs/dbUrl');
const User = require("./model/user.model");
const { init } = require('./model/user.model');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbUrl.DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("Error while connecting the server");
});
db.once("open", ()=>{
    console.log("Connected to the mongoDB");
    str()
});


async function str(){
   
    try{ 
    
    await User.collection.drop();
    
        const user = await User.create({
        name: "Achal",
        userId : "admin",
        password:bcrypt.hashSync("achalMudgalBackendDeveloper", 8),
        email:"achalmudgalsince97@gmailcom"
    })

    console.log(user);
}catch(err){
    console.log('err in db initialization'+ err.message);
}  
};


//To connect with the server
require('./routes/authRoutes')(app);

app.listen(serverPort.PORT, ()=>{
    console.log("Server running successfully on port number :", serverPort.PORT);
})