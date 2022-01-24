const express = require("express");
// const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const app = express();
const orderschema = require("../models/Orders");
app.use(bodyparser);
const router = express.Router();

router.get("/orderhistory", async(req,res)=>{
    try{
    const orders = await orderschema.find({userId:req.user});
    console.log(orders);
    res.status(200).json({
        status: "success",
        orders : orders
    })

    }catch (e){
        res.json({
            status: "failed",
            message: e.message
        });
    }
});

router.get("/:id", async(req,res)=>{
    try{
    const order = await orderschema.findOne({orderId:req.params.id, userId : req.user} );
    res.status(200).json({
        status: "success",
        order : order
    })

    }catch (e){
        res.json({
            status: "failed",
            message: e.message
        });
    }
});

module.exports = router;