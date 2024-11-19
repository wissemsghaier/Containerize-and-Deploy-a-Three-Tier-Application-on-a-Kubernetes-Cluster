 const mongoose = require('mongoose');
 mongoose.connect("mongodb://mongo:27017/e-com",{
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     family: 4,
});
//mongoose.connect('mongodb://127.0.0.1/test')

// const mongoose = require('mongoose');
// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/e-com";
// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4,
// });
