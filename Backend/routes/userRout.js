const express=require("express")
const route=express.Router()
const { reg, login, checkUser } =require("../controler/usercontroler")
const auth=require("../midleware/auth.js")

route.post("/reg",reg)

route.post("/login",login)

route.get("/chake",auth,checkUser)
module.exports=route
