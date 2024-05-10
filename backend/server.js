const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminSchema');
const cors = require("cors");
const express=require('express')
const cookieParser=require('cookie-parser')
const connectDB=require("./database")
const env = require("dotenv");
const bodyParser = require('body-parser');

const authRoutes=require("./routes/authRoute")
const employeeRoutes=require("./routes/emplyeeRoute")

// const authenticate=require("./middlewares/authmiddleware")

const app=express();
app.use(cookieParser());
app.use(express.json())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
env.config();

// Connect to MongoDB
connectDB();

const corsOptions = {
    origin: [process.env.FRONT_END_URL, process.env.ADMIN_URL],
    credentials: true 
  };
app.use(cors(corsOptions));

app.use('/admin', authRoutes);
app.use('/api', employeeRoutes);


// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });



