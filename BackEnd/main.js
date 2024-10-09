const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Student = require('./Student');
const moment = require('moment');
const cors = require('cors');

const connectionString = "mongodb+srv://Kairavii:Kairavi10@cluster1.aqmwa.mongodb.net/Attendance";
mongoose.connect(connectionString).then(()=>{
    console.log("Connected with DB");

    const app = express();
    app.use(bodyParser.json());

    app.use(cors({
        origin: 'http://localhost:3000', // Allow only your React app
        methods: ['GET', 'POST','PUT'], // Allow specific methods
    }));
    
    app.post('/login',async(req,res)=>{
        let user = req.body.username;
        let pass = req.body.pass;
        console.log("user"+" "+user+"pass"+" "+pass);
        const ans = await Student.findOne({Name: user});
        if(ans.Password==pass){
            res.send("Authenticated");
        }
        else{
            res.send("invalid");    
        }
    });

    app.post('/att/:date',async(req,res)=>{
        let present = {...req.body};
        let str = "";
        let roll = 0;
        const currentDate = moment().format('MMMM Do YYYY');
        for (const key in present) {
            str = present[key];
            let parts = str.split(':');
            roll = parseInt(parts[0]);
            
            const ans = await Student.findOne({RollNo : roll});

            const index = await ans.Att.find((obj)=>{
                if(obj.Date===req.params.date){
                    return true;
                }
            });
            if(index==undefined){
                if(ans){
                    let obj = {
                       Date: currentDate,
                       Pre : parts[1]
                    };
                    ans.Att.push(obj);
                    await ans.save();
               }
            }
        }
            res.send("Get All");
    });


    //GetByRollNo
    app.get('/students/:roll',async(req,res)=>{
        const ans = await Student.findOne({RollNo : req.params.roll});
        res.send(ans);
    });

    //GetAll
    app.get('/students',async(req,res)=>{
        const ans = await Student.find();
        res.send(ans);
    });

    //Edit
    app.put('/students/:rollToEdit/:date',async(req,res)=>{
            const ans = await Student.findOne({RollNo : req.params.rollToEdit});
            
            const index = await ans.Att.find((obj)=>{
                if(obj.Date === req.params.date){
                    return true;
                }
            });
            
            index.Pre = req.body.present;
            await ans.save();
            res.send("done");
    });

    app.listen(3001,()=>{
        console.log("Port 3001");
        
    });
});

 