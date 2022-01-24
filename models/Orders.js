const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: Number, unique: true },
    date: { type: Date, default: Date.now() },
    productList: [{
        prodType: String,
        quantity: { type: Number, default: 0 },
        wash: { type: String, default: "false" },
        press: { type: String, default: "false" },
        fold: { type: String, default: "false" },
        pack: { type: String, default: "false" },
        price: { type: Number, default: 0 }
    }],
    totalPrice: Number,
    totalNoOfItems: Number,
    // store: { type: String, default: "JP Nagar" },
    // city: { type: String, default: "Bangalore" },
    // phone: { type: Number, default: 9952647123 },
    orderStatus: { type: String, default: "Ready to pickup" }
});

module.exports = new mongoose.model('Orders', orderSchema);