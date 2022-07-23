const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

require('dotenv').config();


const port = process.env.PORT || 7000;


app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, { }
  );

const connection = mongoose.connection;
connection.on('error', (error) => console.error(error))

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

//Router Connections

const plantsRouter = require('./routes/plants');
const wateringRouter = require('./routes/watering');

app.use('/plants', plantsRouter);
app.use('/watering', wateringRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  });