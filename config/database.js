const mongoose = require("mongoose");

const dbname = process.env.DB_NAME || 'caduceus';

//MONGO DB CLOUD SERVER
const cnxurl = process.env.DB_URL || 'mongodb+srv://cluster0-jluxz.mongodb.net';
const dbOptions = {
  user: process.env.DB_USER || 'caduceus-user',
  pass: process.env.DB_PASS || 'vDJSytH4ONAJJmE0'
}

//LOCALHOST SERVER
// const cnxurl = 'mongodb://localhost:27017';

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(cnxurl + "/" + dbname, dbOptions, function (err, done) {
  if (err) {
    console.log("Database connection unsuccessful.");
  } else {
    console.log("Database *" + dbname + "* has connected.");
  }
});
