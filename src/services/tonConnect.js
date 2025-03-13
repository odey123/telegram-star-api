const nacl = require("tweetnacl");

const getConnectionLink = async (req, res) => {
    try {
        const manifestUrl = "https://telegram-star-api.onrender.com/tonconnect-manifest.json";
        const link = `https://tonkeeper.com/ton-connect?manifest=${encodeURIComponent(manifestUrl)}`;
        
        res.json({ link });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate connection link" });
    }
};

const verifyWallet = async (req, res) => {
    try {
        const { address, signature, payload } = req.body;

        // Convert inputs to Uint8Array for verification
        const publicKey = Buffer.from(address, "hex");
        const message = Buffer.from(payload, "utf8");
        const sig = Buffer.from(signature, "hex");

        const isValid = nacl.sign.detached.verify(message, sig, publicKey);

        if (!isValid) {
            return res.status(400).json({ error: "Invalid signature" });
        }

        res.json({ success: true, message: "Wallet verified!" });
    } catch (error) {
        console.error("Error verifying wallet:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getConnectionLink, verifyWallet };
