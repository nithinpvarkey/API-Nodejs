const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    user_name: {
        type:String,
        require:true,
        min:3,
        max:256
    },
    email: {
        type:String,
        require:true,
        min:6,
        max:256
    },
    password: {
        type:String,
        require:true,
        min:6,
        max:1024
    },
    insert_time: {
        type:Date,
        default:Date.now
        
    }
});
module.exports =  mongoose.model('User', userSchema)
