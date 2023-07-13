const express= require("express")
const Router= express.Router()
const{newuser,getall,isverified,forgetpassword,resetpassword}=require("../controller/controller")
Router.post("/create",newuser)
Router.get("/get",getall)
Router.post("/userveriy/:id",isverified)
Router.get("/create",forgetpassword)
Router.get("/reset_password/:id",resetpassword)

module.exports=Router