const express=require("express")
const router=express.Router({mergeParams:true});
const User=require("../models/users.js")



router.get("/",async(req,res)=>{
    const user=req.user;
    // console.log(user);
    res.render("user/show.ejs",{user});
})


router.get("/edit",(req,res)=>{
    const user=req.user;
    res.render("user/edit.ejs",{user});
})

router.put("/",async(req,res)=>{
    // const account=req.user;
    const data=req.user._id;
     const user= await User.findByIdAndUpdate(data,req.body,{runValidators:true,new:true})
     res.redirect(`/account`)
})

router.get("/payments",async(req,res)=>{
    const data=req.user; 
    const user=await data.populate("payments");
    res.render("user/payments.ejs",{user})
})

module.exports=router;