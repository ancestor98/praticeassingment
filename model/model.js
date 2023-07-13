const mongoose=require("mongoose")

const userschema= new  mongoose.Schema({
    username:{
        type:String

    },email:{
        type:String

    },phonenumber:{
        type:String

    },password:{
        type:String

    
},isverified:{
    type:Boolean,
    default:false,
}}
)
const usermodel=mongoose.model("model",userschema)

module.exports=usermodel