const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();

// ------ create an order using post api ------
router.post('/createorder', async function(req, res){
    try { 
        const { orderId, productList, totalNoOFItems, totalPrice } = req.body 
        const userid = req.user
        console.log(" userid is " + userid)
        const order = await Orders.create({ 
             userId:userid, orderId, productList, totalNoOFItems, totalPrice
        });
        return res.status(200).json({  
            message: "Order Succesfully Placed",
            order
        });
    } catch(err) {
        res.status(500).json({
            status: "invalid",
            message: err.message
        })
    }
});

// // ------ get product list using get api ------
// router.get('/products/:id', async (req, res) => {
//     try {
//         const order = await Orders.find({ _id: req.params.id });

//         if (!order) {
//             return res.status(404).send("Order not found");
//         }
//         return res.status(201).json({
//             message: "Order Successfully placed"
//         });
//     } catch (err) {
//         res.status(501).send("Order is not created yet.");
//     }
// });


















// ------ put api to update the status ------
// router.put('/products/:id', async (req, res) => {
//     try {
//         const { orderStatus } = req.body;
//         const checkStatus = await Orders.findOne({ _id: req.params.id });
    
//         if (!checkStatus) {
//             return res.status(404).send("Order is not created yet or it is not found in our database.");
//         }
//         const statusUpdate = await Orders.updateOne({ _id: req.params.id }, orderStatus);
    
//         const finalStatus = await Orders.findOne({ _id: req.params.id });
    
//         return res.status(201).json({
//             message: "Status set",
//             finalStatus
//         });
//     } catch (err) {
//         res.status(503).send("Status not updated");
//     }
// });

module.exports = router;