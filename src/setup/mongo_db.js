const mongoose = require("mongoose");
const CONFIG = require("./config");

function setupMongoDB() {
  const MONGODB_URI = CONFIG.ENV.MONGODB_URI;

  if (!MONGODB_URI) return;
  
  // MongoDB connection
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log(`Connected to MongoDB :: ${MONGODB_URI}`))
    .catch((err) =>
      console.log(`Error connecting to MongoDB :: ${MONGODB_URI}`, err.message)
    );
}

module.exports = setupMongoDB