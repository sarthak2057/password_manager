const User = require('../model/User.mongo');
const bcrypt = require('bcrypt');


const registerUser = async (req,res)=>{
    //destructing from reuest body
    const {fullName,email,phone,password,confirm_password} = req.body;

    //validating the input
    if(!fullName || !email || !phone || !password){
        return res.status(400).json({
            message:'Required Field is empty'
        });
    }

    //check for the duplicate records
    const duplicateEmail = await await User.findOne({email:email}).exec();
    const duplicatePhone = await await User.findOne({phone:phone}).exec();

    if(duplicateEmail || duplicatePhone) return res.send(409).json({
        message:'Email or phone already used'
    }); //Conflict

    if(password !== confirm_password){
        return res.status(400).json({
            message:'password and confirm password dosen\'s match'
        })
    }

    try{
        //encrypt password
        const hashedPwd = await bcrypt.hash(password,10);
        const result = await User.create({
            fullName,
            email,
            phone,
            password:hashedPwd
        });
        res.status(201).json({success:`User created successfully`})
    } catch(err){
        res.status(500).json({message:err.message});
    }

}

module.exports = {
    registerUser
}