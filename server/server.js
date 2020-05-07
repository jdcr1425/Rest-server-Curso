require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/users', (req, res)=>{
    res.json('get user')
});

app.post('/users', (req, res)=>{
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje:"El nombre es necesario"
        })
    }else{
        res.json({
            body
        })
    }
   
});

app.put('/users/:id', (req, res)=>{
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/user/:id', (req, res)=>{
    res.json('delete user')
});


app.listen(process.env.PORT, ()=>{
    console.log(`Ejecutando en el puerto ${process.env.PORT}`)
})