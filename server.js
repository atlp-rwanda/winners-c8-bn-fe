const express = require('express');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config()
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname,'dist')));
app.listen(port, function() {
    console.log('listening on port ', port);
  });

