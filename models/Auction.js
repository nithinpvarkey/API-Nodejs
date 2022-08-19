const { status } = require('express/lib/response');
const mongoose= require('mongoose');
var Schema = mongoose.Schema;

const AuctionItemSchema = mongoose.Schema({
    item_name: {
        type:String,
        require:true,
        max:256
    },
    item_description: {
        type:String,
        require:true,
        max:1024
    },
    item_condition: {
        type:String,
        require:true,
        max:1024
    },
    highest_bid: {
         type: Schema.Types.ObjectId, 
         ref: 'bids'
    },
    owner_id: {
         type: Schema.Types.ObjectId, 
         ref: 'User',
         require:true
    },
    insert_time: {
        type:Date,
        default:Date.now
    },
    start_date:{
       type:Date,
       require:true
    },
    end_date:{
        type:Date,
        require:true
    },
    status: {
        type:String,
        default:'ForSale'
    }
});
module.exports =  mongoose.model('Auction_Item', AuctionItemSchema)
