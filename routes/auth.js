const express = require('express')
const { exist } = require('joi')
const router=express.Router()

const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonWebToken=require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    
    //Validation to user input credentials
    const {error} =registerValidation(req.body)
     if(error){
        return res.status(400).send({message:error['details'][0]['message']})
     }
     //Validation for the User Exist

     const userExist=await User.findOne({email:req.body.email})
     if(userExist){
        return res.status(400).send({message:'User Already Exist'})
     }

     //hashing password
     const salt=await bcryptjs.genSalt(5)
     const hashPassword=await bcryptjs.hash(req.body.password,salt)

    //insert data to mongodb
     const userSave= new User ({
        user_name:req.body.user_name,
        email:req.body.email,
        password: hashPassword
    })
    try{
        const savedUser= await userSave.save()
        res.send(savedUser)
    }catch(er){
        res.status(400).send({message:er})
    }

})

router.post('/login',async(req,res)=>{
    
    //Validation to user input credentials
    const {error} = loginValidation(req.body)
     if(error){
        return res.status(400).send({message:error['details'][0]['message']})
     }

        //Validation for the User Exist

        const userExist=await User.findOne({email:req.body.email})
        if(!userExist){
           return res.status(400).send({message:'User Not Exist'})
        }

        //decrypt password and check password exist

        const decryptPassword= await bcryptjs.compare(req.body.password,userExist.password)
        if(!decryptPassword){
            return res.status(400).send({message:'Incorrect password'})
         }

         //generate auth-token

         const token=jsonWebToken.sign({_id:userExist._id},process.env.TOKEN_SECRET)
         res.header('auth_token',token).send({'auth_token':token})
})


module.exports=router