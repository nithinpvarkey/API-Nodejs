const joi = require('joi')

//for validating create user
const registerValidation = (data) =>{
    const schemaValidation = joi.object({
        user_name:joi.string().required().min(3).max(256),
        email: joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

//for validting login user
const loginValidation = (data) =>{
    const schemaValidation = joi.object({
        email: joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

// For Validation aution Items
const auctionItemValidation = (data) =>{
    const schemaValidation = joi.object({
        item_name: joi.string().required().max(256),
        item_description: joi.string().required().max(1024),
        item_condition: joi.string().required().max(1024),
        start_date: joi.date().required(),
        end_date: joi.date().required()
    })
    return schemaValidation.validate(data)
}
// for validting bid
const bidValidation = (data) =>{
    const schemaValidation = joi.object({
        amount: joi.number().required()
     
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation=registerValidation
module.exports.loginValidation=loginValidation
module.exports.auctionItemValidation=auctionItemValidation
module.exports.bidValidation=bidValidation