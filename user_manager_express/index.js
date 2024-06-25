const express=require('express');
const app= express();
const path= require('path');
const port=8002 ;
const userModel= require('./models/user')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


// main route

app.get('/',(req,res)=>
{
    res.render('userCreate');
})

// read

app.get('/read',async (req,res)=>
    {
     try{
        let allUser= await userModel.find()
        res.render('read',{allUser : allUser})
     }
     catch(err)
     {
        console.log("Error :",err);
        res.status(500).send(err.message);
     }
    })


// delete

    app.get('/delete/:username', async (req,res)=>
        
            {
             try{
                let allUser= await userModel.findOneAndDelete({username: req.params.username})
                res.redirect('/read')
             }
             catch(err)
             {
                console.log("Error :",err);
                res.status(500).send(err.message);
             }
        })



// create

app.post('/create', async (req,res)=>
    {
        let{username , email , image}=req.body
        try
        {
            const createdUser = await userModel.create(
                {
                    username : username,
                    email: email,
                    image : image
                },
                
            ) 
            console.log("User created");
            res.redirect('/read');
        }
        catch(err)
        {
            console.log("Error :",err);
            res.status(500).send(err.message);
        }
    })

    // update

    app.get('/updateInfo/:id', async (req,res)=>
        
        {
         try{
            let User= await userModel.findOne({_id : req.params.id})
            res.render('update',{User: User})
         }
         catch(err)
         {
            console.log("Error :",err);
            res.status(500).send(err.message);
         }
    })

    // after update
    app.post('/update/:username', async (req,res)=>
        
        {
         try{
            let User= await userModel.findOneAndUpdate(
                {
                    username : req.params.username
                },
                {
                    email : req.body.new_email,
                    image : req.body.url
                }
            )
            console.log(User);
            res.redirect('/read');
         }
         catch(err)
         {
            console.log("Error :",err);
            res.status(500).send(err.message);
         }
    })

app.listen(port,()=>
{
    console.log(`Server running at port ${port}`);
})