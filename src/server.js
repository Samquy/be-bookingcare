import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors'
require('dotenv').config();

let app = express();
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
//}
app.use(cors({ origin: true }));
// app.use(cors(corsOptions)) // Use this after the variable declaration
// app.use(cors({ credentials: true, origin: '*',optionSuccessStatus:200, }))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoute(app);
connectDB(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("run sucess " + port);
})



