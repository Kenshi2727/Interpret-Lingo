import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app=express();
const port=3000;

app.use(express.static(('public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{res.render('index.ejs')});
app.post('/translate',async (req,res)=>{
     try{
       const response = await axios.get("");
       const result = response.data;
     }
    catch(error){
        console.error(`Error: ${error}`);
        res.send("Some Error Occured!😭");
    }
});
app.listen(port,()=>console.log(`Server is running on port ${port}`));
