const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.use("/user", userRoutes);



  mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@secchat.b2rcmo1.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    try{
        app.listen(5000);
        console.log("MongoDB is up and Server is listening on port 5000");
    } catch (err){
        console.log(err);
    }

  })
  .catch(err => {
      console.log("there was error");
  });