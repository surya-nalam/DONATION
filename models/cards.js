const mongoose=require("mongoose");


const cardSchema=new mongoose.Schema({

    name:{
        type:String,
    },
    card_number:{
        type:String,
    },
    card_type:{
        type:String,
    },
    exp_date:{
        type:String,
    },
    cvv:{
        type:String,
    },
    amount:{
        type:Number,
    },
    soldiers:[
        {
        type:mongoose.Schema.Types.ObjectId,
         ref:"Soldier",
        }
    ],
})

module.exports=mongoose.model("Card",cardSchema);