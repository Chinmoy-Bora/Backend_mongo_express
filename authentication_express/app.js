const express = require('express');
const app = express();
const port = 8003;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Listening');
    res.render('register');
})

// Create user

app.post('/create', (req, res) => {
    let { username, password, email } = req.body;
    try {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                
                  const createdUsers = await userModel.create(
                        {
                            username,
                            password: hash,
                            email

                        }
                    )
           

                    let token = jwt.sign({ email }, 'hola');
                   
                    res.cookie("token",token);
                    // res.send(createdUsers);
                    res.redirect('/login');
            });
        });
        

        // res.redirect('/login');
    }

    catch (err) {
        console.log("some error occured");
        res.status(500).send(err.message);
    }
})


// Login
app.get("/login",(req,res)=>
{
    res.render('login');
})

app.post("/login",async (req,res)=>
    {
        let user = await userModel.findOne({email : req.body.email});
        if(!user) res.send("something went wrong");
        bcrypt.compare(req.body.password, user.password,function(err,result)
    {
        if(result)
            {

                let token = jwt.sign({ email : user.email }, 'hola');
                   
                res.cookie("token",token);
                res.send("You logged in");
            }
            else
            {
                res.send("something went wrong");
            }
    })
    })


// Logout

app.get('/logout',(req,res)=>
{
    res.cookie("token","");
    // res.send("You loggedout");
    res.redirect('/login');
})


app.listen(port, () => {
    console.log(`Listening at port : ${port}`);
})