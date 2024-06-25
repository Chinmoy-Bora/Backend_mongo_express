const express = require("express");
const app = express()
const bodyParser = require('body-parser');


const port = 8001

const userModel = require('./models/model')
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Running");
})

app.get('/create', async (req, res) => {
    try {
        const createdUser = await userModel.create(
            {
                username: "paresh3",
                email: "Jitu@gmail.com",
                contact: "xxxxxxxxxx"
            }
        )
        res.send("createdUser");
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
})


app.get('/read', async (req, res) => {
    const readUser = await userModel.find()
    res.send(readUser);
})

app.get('/update', async (req, res) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            {
                username: "paresh3"
            },
            {
                username:"Harsh1"
            }
        )
        res.send(updatedUser);
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
})

app.get('/delete', async (req, res) => {
    try {
        const updatedUser = await userModel.findOneAndDelete(
            {
                username:"Harsh1"
            }
        )
        res.send(updatedUser);
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
}
)