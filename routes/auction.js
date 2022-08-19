const express = require('express')
const router=express.Router()


const Auction = require('../models/Auction')
const {auctionItemValidation} = require('../validations/validation')
const verify=require('../verifyToken')




router.post('/addItem',verify,async(req,res)=>{
      //Validation to user input credentials
      const {error} =auctionItemValidation(req.body)
      if(error){
         return res.status(400).send({message:error['details'][0]['message']})
      }
      //get loged user
      const user_id=req.user['_id'];

       //insert Auction Item  to mongodb
     const autionSave= new Auction ({
        item_name:req.body.item_name,
        item_description:req.body.item_description,
        item_condition:req.body.item_condition,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        owner_id:user_id
     
    })

    try{
        const savedUser= await autionSave.save()
        res.send(savedUser)
    }catch(er){
        res.status(400).send({message:er})
    }
})

router.get('/viewitems',verify,async(req,res)=>{
    try{
        const Auction_items= await Auction.find()
        res.send(Auction_items)
    }catch(er){
        res.status(400).send({message:er})
    }
})
router.get('/viewitemsSold',verify,async(req,res)=>{
    const loggeduser=req.user['_id'];

    try{
        const Auction_items= await Auction.find({status:'sold',owner_id:loggeduser})
        res.send(Auction_items)
    }catch(er){
        res.status(400).send({message:er})
    }
})

module.exports =router
