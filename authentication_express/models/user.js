const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/auth`);

const authModel = mongoose.Schema({
    username :
    {
        type: String,
        required: true
    },
    password :
    {
        type: String,
        required: true
    },

    email :
    {
        type: String,
        required: true
    },
})

const model = mongoose.model('auth',authModel)

module.exports = model;

