const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/post_manage`);

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
    age :
    {
        type : Number,
    },

    posts :[{
        type : mongoose.Schema.Types.ObjectId , ref:"post"}],
})

const model = mongoose.model('auth',authModel)

module.exports = model;

