const express = require("express");

const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const coursesRoutes = require("./routes/Courses")
const paymentRouter = require('./routes/Payment')
const dbconnect = require("./config/database");
const cookiesParser = require("cookie-parser");
const cors = require("cors")

const {cloudinaryConnect} = require("./config/cloudinaryConnect")

const fileupload  = require("express-fileupload")
const dotenv = require("dotenv")
dotenv.config();

const PORT = process.env.PORT || 4000
// database connect
 dbconnect()

//  middelware

app.use(express.json());
app.use(cookiesParser());
app.use(cors({
    // origin:"http://localhost:3000",
    credentials:true,
}))

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

// connect to cloudinary
cloudinaryConnect();


// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/courses",coursesRoutes);
app.use("/api/v1/payment",paymentRouter); 

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"this is home route"
    })
})

// const mailSender = require("./utils/mailSender")
// mailSender("cajdjk","sad","adf")

app.listen(PORT,()=>{
    console.log(`app is runnig on ${PORT}`)
})