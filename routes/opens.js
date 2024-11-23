const express=require("express")
const router=express.Router({mergeParams:true});
const Soldier=require("../models/soldiers.js")
const User=require("../models/users.js")
const passport=require("passport")
const opens=require("../controllers/opens")


router.get("/",opens.home)

router.get("/signup",opens.signup)

router.get("/signin",opens.signin)




router.post("/signin",passport.authenticate("local",{failureFlash:true,failureRedirect:"/signin"}),opens.signingin)




router.post("/signup",opens.registeringin)
    









module.exports=router;