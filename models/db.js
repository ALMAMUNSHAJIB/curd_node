const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
   name: {
       type: String,
       required: true,
       trim: true
   },
   email: {
       type: String,
       require: true,
       trim: true,
       unique: true
   },
   address: {
       type: String,
       required: true,
       trim: true
   }
})


const User = mongoose.model('User', user)

module.exports = User;