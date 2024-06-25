const express=require('express')
const app=express()
const port=3001
const path=require('path')

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')))



app.get('/',(req,res)=>{
    res.render("index")
    
})
app.post('/send',(req,res)=>{
    res.send(JSON.stringify(req.body))
    
})

app.listen(port,()=>
{
    console.log(`Server running on the port ${port}`)
})