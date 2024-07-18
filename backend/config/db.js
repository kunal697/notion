const mongoose = require('mongoose');

const mongoURL =  'mongodb://127.0.0.1:27017/notiondb'
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',( )=>{
    console.log("connected to mongodb..");
})

db.on('error',(err)=>{
    console.log("err :",err);
})

db.on('disconnected',( )=>{
    console.log("disconnected with mongodb..");
})

module.exports = db;