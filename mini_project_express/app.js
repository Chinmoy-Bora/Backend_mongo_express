const express = require('express');
const app = express();
const port = 8004;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const postModel = require('./models/posts');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Listening');
    res.render('register');
})

// middel ware for protected route
function isLoggedIn(req,res,next)
{
    
    if(req.cookies.token === "") res.redirect("/login");
    else
    {
        let data =jwt.verify(req.cookies.token,"hola");
        req.user = data;
        next();
    }
}

// Create user

app.post('/create', (req, res) => {
    let { username, password, email, age } = req.body;
    try {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                
                  const createdUsers = await userModel.create(
                        {
                            username,
                            password: hash,
                            email,
                            age

                        }
                    )
           

                    let token = jwt.sign({email : email, user_id :createdUsers._id },"hola");
                   
                    res.cookie("token",token);
                    console.log(createdUsers)
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
        if(!user) res.status(500).send("something went wrong");
        bcrypt.compare(req.body.password, user.password,function(err,result)
    {
        if(result)
            {

                let token = jwt.sign({email : user.email, user_id : user._id },"hola");
                   
                res.cookie("token",token);
                res.redirect('/profile')
            }
            else
            {
                res.redirect('/login')
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

// profile

app.get('/profile',isLoggedIn, async (req,res)=>
    {
        let user= await userModel.findOne({email : req.user.email}).populate("posts");
        console.log(user)
        res.render('profile',{user})
    })

// Create post

app.post('/post',isLoggedIn, async (req,res)=>
{
    let user= await userModel.findOne({email : req.user.email});
    let post = await postModel.create({
        user : user._id,
        content : req.body.content
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

// Like post

app.get('/like/:id',isLoggedIn, async (req,res)=>
    {
        let post= await postModel.findOne({_id : req.params.id}).populate("user");
            if(post.likes.indexOf(req.user.user) === -1)
                {
                    post.likes.push(req.user.user);
                   
                }

                else
                {
                    post.likes.splice(post.likes.indexOf(req.user._id),1);

                }
                await post.save();
        res.redirect('/profile');
    })

app.listen(port, () => {
    console.log(`Listening at port : ${port}`);
})