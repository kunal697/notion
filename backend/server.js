// mongosh  -- start

const express = require('express');
const app = express();
const  db = require('./config/db.js');
const User = require('./controllers/UserController.js');
const Notesroute = require('./routes/Notesroute.js');
const port = 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.post('/user',User.Register);
app.get('/alluser',User.AllUser);

app.use("/",Notesroute);


app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
