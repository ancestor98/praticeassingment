const usermodel= require("../model/model")
const bcrypt= require("bcrypt")
const mailsender= require("./emailcontroller")

 
exports.newuser= async(req,res)=>{
    console.log(req.body)
    try {
        const {username,email,phonenumber,password} = req.body
        // now we ash the password
        const saltedRound=10
       const  hashpassword= await  bcrypt.hash(password,saltedRound)
       console.log(req.body)
        const data= {
            username,
            email,
            phonenumber,
            password:hashpassword
        }
        const newuser= await new usermodel(data)
        
        const subject="kindly check your email"
        const link=`${req.protocol}://${req.get("host")} api/userveriy/${newuser.id}`
        const message=`welome onbord my gee use this link to verify ${link} to verify`
        mailsender({
            email:newuser.email,
            subject,
            message

        })
        await newuser.save()
        if(!newuser){
            res.status(400).json({
                status:"failed",
                message:"error creating user"
            })
        }else{
            res.status(201).json({
                status:"succesful",
                message:"user created succsesfully",
                data:newuser
            })
        }

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
exports.getall= async(req,res)=>{
    try {
        const user = await usermodel.find()
        res.status(201).json({
            status:"succesful",
            message:"user created succsesfully",
            data:user
        })
    

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
        
        
    
exports.isverified= async(req,res)=>{
    try {
        const verified= await usermodel.findByIdAndUpdate(req.params.id,{isverified:true})
        if(!verified){
            res.status(404).json({
                message:"user is not verified"
            })
        }else{
            res.status(200).json({
                message:`user with email ${verified.email} verrified succsesfully`
            })

        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
        
    }

    exports.forgetpassword= async(req,res)=>{
        try {
            const{email}= req.body;
            // create a link with the reset
            const theuser= await usermodel.findOne({email});
            if(!theuser){
                res.status(404).json({
                    message:"no user"
                })
            }else{
                const subject= "forotten password"
                  const link=`${req.protocol}://${req.get("host")}/api/reset_password/${theuser._id}`
                  const message= `click thre${link} to reset password`
                  const data={
                    email:theuser.email,
                    subject,
                    message,


                  };
                  mailsender(data);
                  res.status(200).json({
                    message:"check your email"
                  })
            }


        } catch (error) {
            res.status(500).json({
                message:error.message
            })
            
        }
    }
    exports.resetpassword= async(req,res)=>{
        try {
            const id= req.params.id
            const saltedRound=10
            const hashedpassword= bcrypt.hash(newpassword,saltedRound);
            const user= await usermodel.findOneAndUpdate(id,{password:hashedpassword});
            if (user){
                res.status(200).json({
                    message:"password changed"
                })
            
        }else{
            res.status(500).json({
                message:"an error occured when trying to change password"
            })
        }
    }catch (error) {
            res.status(500).json({
                message:error.message
            })
            
            
        }
    };
    

