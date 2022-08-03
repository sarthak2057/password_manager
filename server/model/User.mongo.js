const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String
});

//automatically generate createdAt and updatedAt field
userSchema.set('timestamps',true);

module.exports = mongoose.model('User',userSchema);