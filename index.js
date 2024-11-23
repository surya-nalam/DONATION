if(process.env.NODE_ENV!=="production"){
    require("dotenv").config()
}


const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const Soldier=require("./models/soldiers.js")
const Card=require("./models/cards.js")
const User=require("./models/users.js")
const expresserror=require("./utils/expresserror");
const passport=require("passport");
const localstrategy=require("passport-local")
const flash=require("connect-flash")
const session=require("express-session");
const opens=require("./routes/opens")
const users=require("./routes/users")
const soldiers=require("./routes/soldiers")




app.engine("ejs",ejsmate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


const sessionconfiguration={
    secret:"oooh boy",
    resave:false,
    saveUnitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}


app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(session(sessionconfiguration));
app.use(express.static(path.join(__dirname,"public")))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use("/soldiers",soldiers)
app.use("/account",users)
app.use("/",opens)




app.use((req,res,next)=>{
    res.locals.currentuser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
 })

 const requirelogin=(req,res,next)=>{
    if(!req.session.user_id){
        res.redirect("/login")
    }
    next();
}





mongoose.connect('mongodb://localhost:27017/donation',{useNewUrlParser:true,useUnifiedTopology:true})

 .then(()=>{
    console.log("mongo connection open for donation");
})
.catch(err=>{
    console.log("error");
    console.log(err);
})



app.all("*",(req,res,next)=>{
    next(new expresserror("page not found",404))
})
app.use((err,req,res,next)=>{
    const {statuscode=500}=err;
    if(!err.message)err.message="oh its wrong"
    const{status=500,message="something went wrong"}=err;
    res.status(status).render("error",{err});
})
app.listen(4000,()=>{
    console.log("started donation server")
})