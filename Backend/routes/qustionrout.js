const express=require("express")
const route=express.Router()
const {askq, storeq}=require("../controler/qustioncontroler")
const auth=require("../midleware/auth.js")




route.get("/q",storeq)

route.post("/qustion",auth,askq)
module.exports=route