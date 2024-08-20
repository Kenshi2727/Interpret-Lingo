import express from 'express';
import path from 'path';
const app=express();
const port=3000;

app.use(express.static(('public')));
//default use
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{res.render('index.ejs')});
app.listen(port,()=>console.log(`Server is running on port ${port}`));
