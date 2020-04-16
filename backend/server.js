const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})
const uri = process.env.DB_CONNECTION;
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=> console.log("Connected to MongoDB.."))
    .catch(err => console.error('Could not connect...',err));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 5000;

const userRouter = require('./routes/users');
app.use('/users',userRouter);
//localhost:5000/users => userRouter


const productsSofaCleaningRouter = require('./routes/cleaning/productsSofaCleaning');
app.use('/Cleaning/sofaCleaning',productsSofaCleaningRouter);

const professionalRouter = require('./routes/professionals/professionals');
app.use('/professionals', professionalRouter);

const applicationRouter = require('./routes/application/application');
app.use('/application', applicationRouter);

//Appliance Routers
const productsACRouter = require('./routes/appliance/productsAC');
app.use('/appliance/ac',productsACRouter);
const productsFridgeRouter = require('./routes/appliance/productsFridge');
app.use('/appliance/fridge',productsFridgeRouter);
const productsWahingMachineRouter = require('./routes/appliance/productsWashingMachine');
app.use('/appliance/washingmachine',productsWahingMachineRouter);

//Electronic Routers
const productsMicrowaveRouter = require('./routes/electronic/productsMicrowave');
app.use('/electronic/microwave',productsMicrowaveRouter);
const productsTVRouter = require('./routes/electronic/productsTV');
app.use('/electronic/TV',productsTVRouter);
const productsWaterPurifierRouter = require('./routes/electronic/productsWaterPurifier');
app.use('/electronic/water',productsWaterPurifierRouter);

const productsMakeUpRouter = require('./routes/salon/productsMakeUp');
app.use('/Salon/makeup', productsMakeUpRouter);

const productsElectricianRouter = require('./routes/homeservice/productsElectrician');
app.use('/HomeService/electrician', productsElectricianRouter);

const productsPlumberRouter = require('./routes/homeservice/productsPlumber');
app.use('/HomeService/plumber', productsPlumberRouter);

const productsCarpenterRouter = require('./routes/homeservice/productsCarpenter');
app.use('/HomeService/carpenter', productsCarpenterRouter);

const productsSalonSpaRouter = require('./routes/salon/productsSalonSpa');
app.use('/Salon/salonSpa', productsSalonSpaRouter);

const productsHaircutRouter = require('./routes/salon/productsHair');
app.use('/Salon/haircut', productsHaircutRouter);

// const salonRouter = require('./routes/salon/productsMakeUp');
// app.use('/salon/makeup', salonRouter);

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/users.model'); 


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, cb) => {
  User.serializeUser();
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  User.deserializeUser();
  cb(null, user);
});



app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});