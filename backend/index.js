const express = require("express");
const app = express();
const authRoute = require("./routes/authRoutes");
const employeeRoute = require("./routes/employeeRoutes");
var cors = require("cors");


//db
const db = require("./config/dbConnect");

//cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


//middlewares
app.use(express.json());

//api routes
app.use("/api/auth", authRoute);
app.use("/api/employee",employeeRoute)



app.listen(5000, () => {
    console.log("Server connected at 5000");
})