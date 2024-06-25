const mongoose=require('mongoose')

mongoose.connect(`mongodb://localhost:27017/mongopractice`);

const userSchema=mongoose.Schema(
    {
        username: String,
        email: String,
        contact: String
    }
)

const model =mongoose.model("user",userSchema);

module.exports = model
