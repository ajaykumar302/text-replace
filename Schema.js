const mongoose = require('mongoose');
//  schema for response data
const responseSchema = new mongoose.Schema({
    html: String,
  }, { timestamps: true });
  
  //  model 
  const Response = mongoose.model('Response', responseSchema);
  
  module.exports.Response = Response;