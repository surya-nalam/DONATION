const mongoose=require("mongoose");
const imageSchema=new mongoose.Schema({
    url:String,
    filename:String
})
imageSchema.virtual("thumbnail").get(function(){
return this.url.replace("/upload","/upload/w-200")
})
const soldierSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
    },
    dob:{
        type:String,
    },
    age:{
        type:Number,
    },
    lifespan:{
        type:String,
    },
    acheivements:{
        type:String,
    },
    position:{
        type:String,
    },
    family:{
        type:String,
    },
    causeofdeath:{
        type:String,
    },
    amount:{
        type:Number,
    },
    payments:[
        {
        type:mongoose.Schema.Types.ObjectId,
         ref:"Card",
        }
    ],
    images:[imageSchema],
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
           required:true,
        }
    }
    
})


module.exports=mongoose.model("Soldier",soldierSchema)