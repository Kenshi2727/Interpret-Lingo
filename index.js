import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app=express();
const port=3000;
let lang='en';
app.use(express.static(('public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{res.render('index.ejs')});
app.post('/lang',(req,res)=>{
    lang=req.body.lang;
    console.log(req.body.lang);
    
    res.render('index.ejs');
})
app.post('/translate',async (req,res)=>{
     try{
      const text=req.body.from;
      const response = await axios.post("https://rapid-translate-multi-traduction.p.rapidapi.com/t");
      const result = response.data;
     }
    catch(error){
        console.error(`Error: ${error}`);
        res.send("Some Error Occured!😭");
    }
});
app.listen(port,()=>console.log(`Server is running on port ${port}`));


