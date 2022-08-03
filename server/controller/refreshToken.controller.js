const User = require('../model/User.mongo');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403); //forbidden

    //evaluate jwt
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
        if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
        const phone = foundUser.phone;
        const accessToken = jwt.sign({
            UserInfo:{
                email:decoded.email,
                phone:phone
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1m'}
        );
        res.json({accessToken});
    })
};

module.exports = {
    handleRefreshToken,
}

