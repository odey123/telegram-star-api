const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const CONFIG = require("./src/setup/config");
const paymentRoutes = require('./src/routes/paymentRoutes');
const authRoutes = require('./src/routes/authRoutes');
const starRoutes = require('./src/routes/starsRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const connectDB = require('./src/setup/mongo_db');
const cors = require("cors");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(
    cors({
      origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);

// Root route for welcome message
app.get('welcome/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TON API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8ff;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .content {
          text-align: center;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #007bff;
          font-size: 2em;
        }
        p {
          color: #555;
          font-size: 1.2em;
        }
      </style>
    </head>
    <body>
      <div class="content">
        <h1>Welcome to the TON API!</h1>
        <p>This API allows you to manage wallet balances, deposits, withdrawals, and transaction history.</p>
        <p>Check the documentation for more details.</p>
      </div>
    </body>
    </html>
  `);
});

//app.use(express.static(path.join(__dirname, "public")));

// Add route for tonconnect-manifest.json
app.get("/tonconnect-manifest.json", (req, res) => {
  res.json({
    "url": "https://telegram-star-api.onrender.com",
    "name": "Telegram Stars",
    "manifestVersion": "1.0"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Use the routes
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/wallet', walletRoutes);

connectDB();
const port = CONFIG.ENV.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
