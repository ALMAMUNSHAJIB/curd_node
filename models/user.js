const  { Schema,  model } = require('mongoose');

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

},
 {
     timestamps: true
 }
)



const Tank = model('Tank', userSchema);
module.exports = Tank;

