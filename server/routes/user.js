const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const _ = require('underscore');
const app = express();
const {checkToken, checkRole} = require('../middlewares/auth')

app.get('/users', checkToken, (req, res)=>{
    


    let from = req.query.from || 0;
    let limit = req.query.limit || 5;


    User.find({state:true}, 'name email role state google img')
        .skip(Number(from))
        .limit(Number(limit))
        .exec( (err, users)=>{
            if(err) {
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            User.count({state:true}, (err, count)=>{
                res.json({
                    ok:true,
                    users,
                    records:count
                });
            } );
        }); 
});

app.post('/users',[checkToken,checkRole], (req, res)=>{
    let body = req.body;

    let user = new User({
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
    });

    user.save((err,userDB)=>{
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            user:userDB
        });
    });
   
});

app.put('/users/:id',[checkToken,checkRole], (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['name','email','img','role','state']);

    User.findByIdAndUpdate(id, body, {new:true,runValidators:true}, (err, userDB)=>{
        
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            user:userDB
        });
    });


 
});

app.delete('/user/:id',[checkToken,checkRole], (req, res)=>{
    const id = req.params.id;

    User.findByIdAndUpdate(id, {state:false},{new:true,runValidators:true}, (err, userUpdated)=>{
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!userUpdated){
            res.json({
                ok:false,
                message:'User not found',
            })
        }
        res.json({
            ok:true,
            user:userUpdated
        });
    } );
/*     User.findByIdAndDelete(id, (err, Userdeleted)=>{

        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!Userdeleted){
            res.json({
                ok:false,
                message:'User not found',
            })
        }
        res.json({
            ok:true,
            message:'Deleted',
            Userdeleted
        })
    }); */

    
});

module.exports = app;