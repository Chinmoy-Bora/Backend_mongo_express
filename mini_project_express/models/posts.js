const mongoose = require('mongoose');



const postModel = mongoose.Schema({
    user:
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "auth"
        }
    ],
    content :
    {
        type : String
    },

    date :
    {
        type : Date,
        default : Date.now
    },

    likes :
    [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
    ]
})

const model = mongoose.model('post',postModel)

module.exports = model;

