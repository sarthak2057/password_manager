const User = require('../model/User.mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAuth = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({'message':'Username and password is required.'});
    const foundUser = await User.findOne({email:email}).exec();
    if(!foundUser) return res.sendStatus(401); //unauthorized

    //evaluate password
    const match = await bcrypt.compare(password,foundUser.password);
    if(match){
        //create accessToken
        const accessToken = jwt.sign({
            "UserInfo":{
                "email":foundUser.email,
                "phone":foundUser.phone
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1200s'}
        
        );

        const refreshToken = jwt.sign({
            "email":foundUser.email
        },process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"3600s"});

        //saving refreshtoken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60,sameSite:'None'});
        res.json({accessToken});
    }else{
        res.sendStatus(401);
    }


}

module.exports = {
    handleAuth
}