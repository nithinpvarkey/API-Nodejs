const express =require('express')
const router= express.Router()

const Bid = require('../models/Bid')
const Auction = require('../models/Auction')
const User = require('../models/User')

const verify=require('../verifyToken')
const {bidValidation} = require('../validations/validation')
const { post } = require('./auth')


router.get('/:authId',verify,async(req,res)=>{

    const Auction_items= await Auction.findById(req.params.authId)
    if(!Auction_items){
        return res.status(400).send({message:'No Items Found'})
    }
    //Validate logged user is not the person who add autction item
    const loggeduser=req.user['_id'];
    const authUser=Auction_items.owner_id
    if(loggeduser==authUser){
        return res.status(400).send({message:'The Owner of the Item Cannot Bid '})
    }

    //Validation to user input credentials
       const {error} =bidValidation(req.body)
       if(error){
          return res.status(400).send({message:error['details'][0]['message']})
       }

        //insert data to mongodb

    const auction_id=req.params.authId
    const bidSave= new Bid ({
        amount:req.body.amount,
        by_user:loggeduser,
        aution_item: auction_id
    })

    try{
        const saveBid= await bidSave.save()
        res.send(saveBid)
    }catch(er){
        res.status(400).send({message:er})
    }

})


router.patch('/winner/:authId',verify,async(req,res)=>{

    const Auction_items= await Auction.findById(req.params.authId)
    if(!Auction_items){
        return res.status(400).send({message:'No Items Found'})
    }
    //Validate logged user is not the person who add autction item
    const loggeduser=req.user['_id'];
    const authUser=Auction_items.owner_id
    if(loggeduser!=authUser){
        return res.status(400).send({message:'Not allowded to view'})
    }
    //get the winner
    const getWinner=await Bid.find({aution_item : req.params.authId}).sort({amount:-1}).limit(1)
    const winner_id=getWinner._id;
    const winning_user=getWinner.by_user;
    //update the winner
        try{
            const updateWinner= await Auction.updateOne(
                { _id:req.params.authId},
                {$set:{
                    highest_bid:winner_id,
                    status:"sold"
                   }

                }
            )
            // foe get the winner name
            return res.send(getWinner)
            // const userExist=await User.findOne({_id:winning_user})
            // return res.send({message:userExist.user_name})

        }catch(er){
            res.status(400).send({message:er})
        }




   


})

module.exports =router