const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {

        customerName: {
            type: String,
            required: true
        },

        mobileNumber: {
            type: Number,
            required: true
        },
        
        city: {
            type: String,
            required: true
        },
        
        deliverLocation: {
            type: String,
            required: true
        },
        
        deliverDate: {
            type: String,
            required: true
        },

        totalAmount: {
            type: Number,
            required: true
        },

        deliveryPerson: {
            type: String
        }

    }
)
    
module.exports = mongoose.model('OrderModel', orderSchema);