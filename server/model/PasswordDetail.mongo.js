const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordDetailSchema = new Schema({
    website:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    detail:{
        type:String
    }
})

passwordDetailSchema.set('timestamps',true);

module.exports = mongoose.model('Password',passwordDetailSchema);