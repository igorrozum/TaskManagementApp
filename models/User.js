const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName:  {
        type:String,
        required:true
    },
    lastName:  {
        type:String,
        required:true
    },
    email:  {
        type:String,
        required:true
    },
    username:  {
        type:String
    },
    password:  {
        type:String,
        required:true
    },
    profilePic:  {
        type:String
    },
    dateCreated : {
        type:Date,
        default: Date.now()
    }
});

userSchema.pre('save', function(next){
    //the higher the number of salt is the more salt will be added. 10 is default
    bcrypt.genSalt(10)
    .then(salt => {
        bcrypt.hash(this.password, salt)
        .then(hash => {
            this.password = hash;
            next()
        })
    })
    .catch(err => console.log(`Something went wrong: ${err}`))
})

const userModel = mongoose.model("User",userSchema);

module.exports=userModel;