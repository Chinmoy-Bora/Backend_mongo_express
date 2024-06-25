const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/user_manage`);

const userModel= mongoose.Schema(
    {
        username :
        {
            type: String,
            required : true
        },
        email:
        {
            type:String,
            required : true
        },
        image:
        {
            type: String,
            required : true
        }
    }
)

const model=mongoose.model('user',userModel);

module.exports=model

