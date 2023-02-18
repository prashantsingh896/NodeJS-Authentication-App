const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const db = require('./models/mongoose')

let PORT;

if(process.env.NODE_ENV=="production"){
    PORT = process.env.PORT || 8000;
}
else{
    PORT = 8000;
}

//set up the view engine to ejs
app.set('view engine','ejs');
app.set('views','./views');



app.use('/',require('./routes'));

app.listen(PORT, function(err){
    if(err){
        console.log('Error in running the server: ',err)
    }
    else{
        console.log('Server listening with all ears at port: ',PORT);
    }
});