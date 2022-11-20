const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const path = require('path')
const port = 800
const bodyparser=require("body-parser")
// var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contactDance',{useNewUrlParser:true});

//Mongoose Schema
var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
});

var Contact=mongoose.model('Contact',contactSchema);

//Express Stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded())

//Pug Stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


//Endpoints

app.get('/', (req, res) => {
    const con = "this is con"
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const con = "this is con"
    const params = {}
    res.status(200).render('contact.pug',params)
})

app.post('/contact', (req, res) => {
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("Item saved to Database")
    }).catch(()=>{
        res.status(400).send("Item not saved to database")
    });
    // res.status(200).render('contact.pug')
})

//Start the server
app.listen(port, () => {
    console.log(`Application started successfully on port : ${port}`);
})