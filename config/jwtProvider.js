const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // Node.js built-in crypto module
const fs = require("fs");
const path = require("path");

// Path to store the secret key - fixing the path
const SECRET_KEY_PATH = path.join(__dirname, "..", "config", "jwt-secret.key");

// Function to generate a secure random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Function to get the secret key (generates if doesn't exist)
const getSecretKey = () => {
  try {
    // Try to read existing secret key
    if (fs.existsSync(SECRET_KEY_PATH)) {
      console.log("Using existing JWT secret key");
      return fs.readFileSync(SECRET_KEY_PATH, "utf8");
    } else {
      // Create directory if it doesn't exist
      const dir = path.dirname(SECRET_KEY_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Generate new secret key
      const newSecretKey = generateSecretKey();
      console.log("Generated new JWT secret key");
      
      // Save the secret key to file
      fs.writeFileSync(SECRET_KEY_PATH, newSecretKey, "utf8");
      
      return newSecretKey;
    }
  } catch (error) {
    console.error("Error managing JWT secret key:", error);
    // Fallback to environment variable or generate temporary key
    return process.env.JWT_SECRET_KEY || generateSecretKey();
  }
};

// Get the secret key
const SECRET_KEY = getSecretKey();

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };