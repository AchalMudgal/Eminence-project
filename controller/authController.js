const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Logic for singup
exports.signup = async (req,res) =>{
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8),
        email : req.body.email
    }

    try{
        const reqUser = await User.create(userObj);

        const response = {
            name : reqUser.name,
            userId : reqUser.userId,
            email : reqUser.email
        }

        res.status(201).send(response);
    }catch(err){
        console.log("Error occured", err.message);
        res.status(500).send({
            message : "Internal Error while signup"
        })
    }
}

//Logic for SignIn

exports.signIn = async (req,res) => {

    try{ 
    const user = await User.findOne({userId : req.body.userId});

    //Check if userId passed is valid
    if(user == null){
        return res.status(400).send({
            message : "Failed! UserId passed doesn't exist"
        });
    }

    //Check the password 
    const passwordValidity = bcrypt.compareSync(req.body.password, user.password);

      //Check if the password passed is correct
    if(!passwordValidity){
        return res.status(401).send({
            message:"Wrong password"
        });
    }

    //Create jsonWebToken
    const token = jwt.sign({
        id:user.userId
    },"random_Key",{
        expiresIn : 60000
    });

    //Successfull login response
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email : user.email,
        accessToken : token
    });
    }catch(err){
        console.log("Error occured", err.message);
        res.status(500).send({
            message : "Internal error while signIn"
        });
    };
};