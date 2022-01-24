const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ------ DB Connection ------
mongoose.connect("mongodb+srv://chitha_srinath:Srinath@1234@cluster0.ofweo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
    console.log("DB connected");
})
mongoose.connection.on("error", (e) => {
    console.log("Error connecting to DB", e);
})
// ------ DB Connection ------

const app = express();
app.use(express.json());
app.use(cors());

// ------ Importing routes ------
const loginRoute = require('./routes/loginRoute');
const orderRoute = require('./routes/orderRoute');
const existingOrders = require('./routes/getexistingorders');
// ------ Importing routes ------

// ------ Importing models ------
const User = require('./models/User');
// ------ Importing models ------

// authentication middleware
app.use('/api/v1', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).send('Request not valid');
        } else {
            jwt.verify(token, 'thisissecrettokenforlaundryserviceproject12@#', async (err, decoded) => {
                if (err) {
                    return res.status(403).send('Invalid token');
                }
                const user_u = await User.findOne({ _id: decoded.data });
                req.user = user_u._id;
                next();
            })
        }
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: 'User not found'
        });
    }
});

app.use('/api/v1', loginRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', existingOrders);

// ------ Server start ------
app.listen(2000, () => console.log('Server is running on port 2000'));
// ------ Server start ------