const User=require("../models/users")
const Soldier=require("../models/soldiers")

module.exports.home=(req,res)=>{
    res.render("openpage/home.ejs");
}

module.exports.signup=(req,res)=>{
    res.render("openpage/signup.ejs")
}
module.exports.signin=(req,res)=>{
    res.render("openpage/signin.ejs")
}

module.exports.signingin=async(req,res)=>{
    res.redirect(`/soldiers`);
  }

  module.exports.registeringin=async(req,res)=>{
     try{
        const {username,password}=req.body;
     const applieduser=new User({username});
     const user=await User.register(applieduser,password)
     const soldiers=await Soldier.find({})
      res.redirect("/soldiers")
      }catch(e){
         req.flash("error",e.message);
         res.redirect("/signup")   
      }}