const express = require("express");
// const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const app = express();
const orderschema = require("../models/Orders");
app.use(bodyparser);
const router = express.Router();

router.get("/api/orderhistory", async(req,res)=>{
    try{
    const orders = await orderschema.find();
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

router.get("/api/:id", async(req,res)=>{
    try{
    const order = await orderschema.findOne({orderId:req.params.id});
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