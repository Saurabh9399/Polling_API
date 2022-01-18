const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/polling-API");  //Local 
mongoose.connect("mongodb+srv://sambitn20:Sld3VlQLrAWqitn6@cluster0.tbok7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", () => {
  console.log("Connected to Database :: MongoDB🌎");
});

module.exports = db;
