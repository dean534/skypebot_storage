const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const {dbAuth} = require('./key');

// mongoose database
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${dbAuth.username}:${dbAuth.password}@ds012889.mlab.com:12889/skypebot`,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log('database connecting...'));

const Bulletin = require('./db/schema/Bulletin');

// meddleware
app.use(express.static('public'));
app.use(express.json());



// route
app.get('/', (req, res) => {
  Bulletin.findOne({},(err, data)=>{
    res.render("./client/build");
  })
});

app.get('/api/bulletin', (req, res) => {
  Bulletin.findOne({},(err, data)=>{
    res.json(data);
  })
});

app.post('/api/bulletin', (req, res) => {
  Bulletin.create({title: "維護公告", detail: "在4/25 6:00 - 12:00 系統維護，敬請見諒", username: "Kleist534"}, (err, data)=>{
    res.json(data);
  })
});

app.listen(port, () => console.log(`server is preparing at PORT ${port}...`))