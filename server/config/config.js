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
    urlDB =process.env.MONGO_URI;
}

process.env.URLDB= urlDB;

//================
// token expiration
//================
// 60 s * 60 m * 24 h * 30 d
process.env.EXPIRATION_TOKEN = 60*60*24*30;


//================
// auth SEED
//================
process.env.SEED = process.env.SEED || 'this-is-the-dev-seed';