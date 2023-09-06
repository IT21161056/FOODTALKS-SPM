const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({

    resturant:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    dish:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    qnty:{
        type:Number,
    },
    review:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model("Cart", cartSchema);
