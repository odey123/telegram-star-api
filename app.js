const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan")
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const CONFIG = require("./src/setup/config")
const paymentRoutes = require('./src/routes/paymentRoutes')
const connectDB = require('./src/setup/mongo_db')
const cors = require("cors")

dotenv.config();
const app = express();


app.use(bodyParser.json())
app.use(express.json())
app.use(morgan("tiny"))
app.use(
    cors({
      origin: "*", methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
    })
  );

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

// Use the payment routes
app.use('/api/payment', paymentRoutes);

connectDB()
const port = CONFIG.ENV.PORT || 4000

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})