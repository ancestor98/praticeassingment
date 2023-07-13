require("dotenv")  .config()
const mongoose= require("mongoose")
const url=process.env.DB_DATABASE
mongoose.connect(url).then(()=>{
    console.log("we up")
}).catch((e)=>{
    console.log(e.message)

})