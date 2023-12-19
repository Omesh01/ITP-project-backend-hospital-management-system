const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8040

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
   
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection success!")
})

app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`)
})

const user = require('./routes/staff.js');
app.use("/user",user);

const attendance = require('./routes/attendanceAndSalary.js');
app.use("/attendance",attendance);

const report = require('./routes/report.js');
app.use("/report",report);

const inventory = require('./routes/inventory.js');
app.use("/inventory",inventory);

const bill = require('./routes/bills.js');
app.use("/bill",bill);

const order = require('./routes/order.js');
app.use("/order",order);

const staff = require('./routes/staffdemo.js');
app.use("/staff",staff);