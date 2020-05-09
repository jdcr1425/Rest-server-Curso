//================
// Port
//================

process.env.PORT = process.env.PORT || 3000

//================
// Enviroment
//================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
// Database
//================

let urlDB;

if(process.env.NODE_ENV ==='dev'){
    urlDB = `mongodb://localhost:27017/cafe`;
}else{
    urlDB =`mongodb+srv://jd1425:jdcr1425@cluster0-v0gkf.mongodb.net/cafe?retryWrites=true&w=majority`;
}

process.env.URLDB= urlDB;