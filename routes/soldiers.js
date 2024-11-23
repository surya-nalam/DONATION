const express=require("express")
const router=express.Router({mergeParams:true});
const Soldier=require("../models/soldiers.js")
const Card=require("../models/cards.js")
const isloggedin=require("../middleware");
const soldiers=require("../controllers/soldiers");
const multer=require("multer");
const storage=require("../cloudinary/index");
const upload=multer(storage);

router.get("/",soldiers.show)
router.get("/new",isloggedin,soldiers.new)

router.get("/:id",soldiers.selectedsoldier)
router.get("/:id/edit",isloggedin,soldiers.editsoldier)


router.post("/",isloggedin,upload.array("images"),soldiers.newsoldier)

router.post("/:id",isloggedin,soldiers.donatesoldier)
router.put("/:id",isloggedin,upload.array("images"),soldiers.updatedsoldier)

router.delete("/:id",isloggedin,soldiers.deletesoldier)

module.exports=router;