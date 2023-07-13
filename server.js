require("./config/config")
const express= require("express")
const app= express()
app.use(express.json())
const Router=require("./route/route")
app.use("/api",Router)
PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("bro am on nigga")
})