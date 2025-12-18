const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  fullName: {
        type: String,
        required: true
    }, 
  gender: String,   
  country: String    
});

module.exports = mongoose.model("MyData", mySchema);