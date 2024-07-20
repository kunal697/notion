// mongosh  -- start

const express = require('express');
require('dotenv').config();
const app = express();
const  db = require('./config/db.js');
const User = require('./controllers/UserController.js');
const Notesroute = require('./routes/Notesroute.js');
const  {jwtAuthMiddleware, generateToken}= require('./config/auth.js');
const port = 4000;
const cors = require('cors');
app.use(cors());



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.post('/user',User.Register);
app.get('/alluser',jwtAuthMiddleware,User.AllUser);
app.post('/login',User.Login);

app.use("/",Notesroute);


app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
