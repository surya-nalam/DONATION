const User=require("../models/users")
const Soldier=require("../models/soldiers")
const Card=require("../models/cards")
const {cloudinary}=require("../cloudinary");

const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken=process.env.MAPBOX_TOKEN;
const geocoder=mbxGeocoding({accessToken:mapBoxToken})





module.exports.show=async(req,res)=>{
    const soldiers=await Soldier.find({})
    res.render("soldiers/show.ejs",{soldiers});
}
module.exports.new=(req,res)=>{
    res.render("soldiers/new.ejs");
}
module.exports.selectedsoldier=async(req,res)=>{
    const {id}=req.params;
    const soldier=await Soldier.findById(id).populate("payments");
    res.render("soldiers/donate.ejs",{soldier})
}
module.exports.deletesoldier=async(req,res)=>{
   
    const {id}=req.params;
    const soldier=await Soldier.findById(id);
    const result=await Soldier.deleteOne(soldier);
    res.redirect("/soldiers");

}
module.exports.editsoldier=async(req,res)=>{
    const {id}=req.params;
    const soldier=await Soldier.findById(id);
    res.render("soldiers/edit.ejs",{soldier});
}

module.exports.newsoldier=async(req,res)=>{
   const geoData=await geocoder.forwardGeocode({
    query:req.body.soldier.place,
    limit:1
   }).send();
   
     const soldier=new Soldier(req.body.soldier);
     soldier.geometry=geoData.body.features[0].geometry;
     soldier.images=req.files.map(f=>({url:f.path,filename:f.filename}))
    await soldier.save();
    res.redirect("/soldiers");
}
module.exports.donatesoldier=async(req,res)=>{
    const {id}=req.params;
    const card=new Card(req.body.card)
    const soldier=await Soldier.findById(id);
     finalamount=soldier.amount+parseInt(req.body.card.amount);
     const user=req.user;
    const result=await Soldier.findByIdAndUpdate(id,{$set:{amount:finalamount}},{runValidators:true,new:true})

    
    result.payments.push(card);
    card.soldiers.push(soldier);
    user.payments.push(card);
    await card.save();
    await result.save();
    await user.save();
    if(finalamount>=5000000)
    {
        await Soldier.deleteOne(result);
        res.render("soldiers/success.ejs");
    }
   
    res.redirect(`/soldiers/${result._id}`);
}

module.exports.updatedsoldier=async(req,res)=>{
    const {id}=req.params;
    const soldier=await Soldier.findByIdAndUpdate(id,req.body.soldier,{runValidators:true,new:true})
    // soldier.images=req.files.map(f=>({url:f.path,filename:f.filename}))
    const images=req.files.map(f=>({url:f.path,filename:f.filename}))
    soldier.images.push(...images);
    if(req.body.deleteimages)
    {
     for(let filename of req.body.deleteimages){
        await cloudinary.uploader.destroy(filename)
     }
     await soldier.updateOne({$pull:{images:{filename:{$in:req.body.deleteimages}}}})
    }
    await soldier.save();
    res.redirect("/soldiers");

}