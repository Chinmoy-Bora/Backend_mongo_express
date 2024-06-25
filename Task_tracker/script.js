const express=require('express')
const app=express()
const path=require('path')
const port=8000
const fs=require('fs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/',(req,res)=>
{   fs.readdir(`./files`,function(err,files)
{
    if(err)
        {
            console.error(err)
            res.status(500).send("Internel Server Error")
        }
    console.log(files);
    res.render("index",{files: files})
});
})

app.get('/read/:filename',(req,res)=>
{   fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata)
    {
        if(err)
            {
                console.error(err)
                res.status(500).send("Internel Server Error")
            }
        
        res.render("show",{filename: req.params.filename,filedata: filedata})
    });
    
})




app.post('/create',(req,res)=>
 {
    
    fs.writeFile(`./files/${req.body.task.split(" ").join("")}.txt`,req.body.description,function(err)
{
    if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
    }
    res.redirect("/");
});

 })

app.listen(port,()=>
{
    console.log(`Listening ${port}`)
})

// module.exports=app;
