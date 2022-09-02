const authController = require('../controller/authController');
const verifyUserReq = require('../middleware/verifyUserReq');

module.exports = (app) =>{
    //signUp
    app.post('/eminence/api/v1/auth/signup',[verifyUserReq.signUpReqBodyValidation],authController.signup);
    //signIn
    app.post('/eminence/api/v1/auth/signin',[verifyUserReq.singInReqBodyValidation],authController.signIn);
} 