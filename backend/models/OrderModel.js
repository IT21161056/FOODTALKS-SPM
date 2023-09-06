const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const orderSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        deliveryPersonName: {
            type : String
        }   
    },
    {
        timestamps: true
    }
)
    


module.exports = mongoose.model('OrderModel', orderSchema);