//Logic to Verify the req body passed

const User = require('../model/user.model');

//===Validate signup req body

const signUpReqBodyValidation = async (req,res,next) =>{
    //validate if name is present
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! User name is not provided"
        });
    }
    //validate if userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is not provided"
        });
    }
    //Check if userId passed is not duplicate
    try{
        const user = await User.findOne({userId:req.body.userId});
        if(user != null){
            return res.status(400).send({
                message:"Failed! UserId is already taken"
            });
        }
    }catch(err){
        return res.status(500).send({
            message:"Internal error while validating the request"
        });
    }

    //Validate if password is present or not
    if(!req.body.password){
        return res.status(400).send({
            message:"Failed! Password is not provided"
        });
    };

    //validate if email is present
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! Email is not provided"
        });
    }
    //check if email is not duplicate
    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message:"Failed! Not a valid email id"
        });
    }

    next();
}

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};





//====Validate signIn request
const singInReqBodyValidation =(req,res,next) =>{

    //Validate if the userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message:"Failed! userId is not provided"
        });
    }

    //validate if password is present
    if(!req.body.password){
        return res.status(400).send({
            message:"Failed! Password is not provided"
        });
    }

    next();
}

const verifyForAuthReqBody = {
    signUpReqBodyValidation : signUpReqBodyValidation,
    singInReqBodyValidation : singInReqBodyValidation
}

module.exports = verifyForAuthReqBody;
