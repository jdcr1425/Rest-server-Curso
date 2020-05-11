const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

app.post('/login', (req, res)=>{

    let {email, password} = req.body;

    User.findOne({email:email}, (err, userDb)=>{
        
        if(err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!userDb){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'User or password incorrect'
                }
            });
        }
        if(!bcrypt.compareSync(password, userDb.password)){
            return res.status(500).json({
                ok:false,
                error:{
                    message:'User or password incorrect'
                }
            });
        }

        let token = jwt.sign({
            user: userDb
        },process.env.SEED, {expiresIn:process.env.EXPIRATION_TOKEN})

        res.json({
            ok:true,
            user:userDb,
            token
        });
    });

  
});





module.exports = app;