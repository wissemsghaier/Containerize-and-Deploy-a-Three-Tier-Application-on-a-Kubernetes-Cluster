//    const mongoose = require('mongoose');
// //  mongoose.connect("mongodb://mongo:27017/e-com",{
//     mongoose.connect("mongodb://myUser:myPassword@mongo:27017/e-com?authSource=admin",{
//       useNewUrlParser: true, 
//       useUnifiedTopology: true,
//       family: 4,
//  });
//mongoose.connect('mongodb://127.0.0.1/test')

// const mongoose = require('mongoose');
// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/e-com";
// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4,
// });

// Charger les variables d'environnement depuis le fichier .env
const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const database = process.env.MONGO_DB;

const mongoURI = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

const connectWithRetry = () => {
  console.log("Attempting to connect to MongoDB...");
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      setTimeout(connectWithRetry, 5000); // Réessayer toutes les 5 secondes
    });
};

connectWithRetry();







