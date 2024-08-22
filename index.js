import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app=express();
const port=3000;
let lang=[];
let lang2=[];

const config={
    headers: {
        'x-rapidapi-key': '143c411a6cmsh8863ab57c063444p16a155jsne1d81f87a40e',
        'x-rapidapi-host': 'rapid-translate-multi-traduction.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
}




app.use(express.static(('public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{res.render('index.ejs')});
app.post('/lang',(req,res)=>{
    lang=req.body.lang;
    res.render('index.ejs',res.locals={
        lang:lang[1],
        lang2:lang2[1]
    });
    console.log("from->"+lang);
    
})
app.post('/lang2',(req,res)=>{
    lang2=req.body.convert;
    res.render('index.ejs',res.locals={
        lang:lang[1],
        lang2:lang2[1]
    });
    console.log("to->"+lang2);
})
app.post('/translate',async (req,res)=>{
     try{
      const text=req.body.from;
      const response = await axios.post("https://rapid-translate-multi-traduction.p.rapidapi.com/t",{
        from: lang[0],
        to: lang2[0],
        q: text
      },config);
      const result = response.data;
      res.render('index.ejs',res.locals={
        translatedText:result[0],
        text:text,
        lang:lang[1],
        lang2:lang2[1]
      });
      lang=[];
      lang2=[];
     }
    catch(error){
        console.error(`Error: ${error}`);
        res.send("Some Error Occured!😭");
    }
});
app.listen(port,()=>console.log(`Server is running on port ${port}`));


