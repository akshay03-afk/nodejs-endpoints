const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "./.env"})

const app = express();

app.use(express.json());
app.use(cookieParser())

mongoose 
 .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   },  
 () => console.log("Database connected!"));



const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>[
    res.send("Api is running")
])


//import all the routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})