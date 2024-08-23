import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app=express();
const port=3000;
let lang=[];
let lang2=[];

const config={
    headers: {
        'x-rapidapi-key': '86bd06d194msh1c357ba1925fabep1b4b14jsnb057546bef01',
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
      lang=[];//clearing the array
      lang2=[];//clearing the array
     }
    catch(error){
        console.error(`Error: ${error}`);
        res.render('index.ejs',res.locals={text:"Some Error Occured!😭",translatedText:"Some Error Occured!😭"});
    }
});

app.post('/copy-text',(req,res)=>{
    try{
        res.render('index.ejs',res.locals={
            translatedText:"You text is copied to clipboard📋",
            text:"You text is copied to clipboard📋",
            lang:lang[1],
            lang2:lang2[1]
          });
    }
    catch(error){
        console.error(`Error: ${error}`);
        res.render('index.ejs',res.locals={text:"Some Error Occured!😭",translatedText:"Some Error Occured!😭"});
    }
});
app.listen(port,()=>console.log(`Server is running on port ${port}`));


