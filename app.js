const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const CONFIG = require("./src/setup/config");
const paymentRoutes = require('./src/routes/paymentRoutes');
const starRoutes = require('./src/routes/starsRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const connectDB = require('./src/setup/mongo_db');

// Swagger setup
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: "*", 
methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] }));

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "TON Stars API",
      version: "1.0.0",
      description: "API for TON Stars Mini App",
    },
    servers: [{ url: "http://localhost:" + (CONFIG.ENV.PORT || 4000) }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root route for welcome message
app.get('/', (req, res) => {
  res.status(200).send("Welcome to TON Stars API");
});

app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Use the routes
app.use('/api/payment', paymentRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/orders', orderRoutes);


connectDB();
const port = CONFIG.ENV.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
