const mongoose=require("mongoose");
const passportlocalmongoose=require("passport-local-mongoose");




const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    phoneno:{
        type:Number,
    },
    image:{
        type:String,
    },
    payments:[
        {
        type:mongoose.Schema.Types.ObjectId,
            ref:"Card",
    }],

})

userSchema.plugin(passportlocalmongoose)

module.exports=mongoose.model("User",userSchema)