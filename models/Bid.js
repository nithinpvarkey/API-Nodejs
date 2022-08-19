const { number } = require('joi');
const mongoose=require('mongoose')
var Schema = mongoose.Schema;

const bidSchema = mongoose.Schema({
    amount :{
        type:Number,
        require:true
    },
    by_user :{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require:true
    },
    aution_item:{
        type: Schema.Types.ObjectId, 
        ref: 'Auction_Item',
        require:true
    },
    entry_time :{
        type:Date,
        default:Date.now
    }
   

})

module.exports = mongoose.model('bids',bidSchema)