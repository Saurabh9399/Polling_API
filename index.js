const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//middleware to parse form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
      console.log(`Error running the server on port: ${err}`);
      return;
    }
    console.log(`Server running good on port: ${port}`);
});