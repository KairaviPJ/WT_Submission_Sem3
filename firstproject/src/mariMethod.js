const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your React app
    methods: ['GET', 'POST'], // Allow specific methods
}));
const Students = ['abs','ddd','ddd'];
app.get('/',async(req,res)=>{
    res.send("Hello");
})
app.post('/att',async (req,res)=>{
    let ans =  await {...req.body};
    console.log(ans);
    res.send(ans);
});

app.listen(3002,(req,res)=>{
    console.log("server @3002"); 
})