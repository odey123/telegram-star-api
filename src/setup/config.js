const dotenv = require("dotenv")
dotenv.config({ path: ".env", debug: true, override: true})

const CONFIG = {
    ENV: {
        PORT: process.env.PORT || 4000,
        MONGODB_URI: process.env.MONGODB_URI
    },
};

module.exports = CONFIG;