const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

connectDB();
app.use(cors());
app.get("/login",(req,res)=> {
    console.log("GET /login");
});


app.listen(port, () => {console.log("Listening on port: "+port)});
