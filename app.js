const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const port = process.env.PORT || 3000;

const app = express();

//------------------------TEST AREA

const Profa = require('./models/users/profa');


//-----------------------------

mongoose.connect('mongodb://localhost/swaTest_db', {
    //useMongoClient: true // prevazidjeno...
    useCreateIndex: true, /// warning because i change id not mongo
    useNewUrlParser: true
}).then(()=>{
    console.log("MongoDB Connected...");
}).catch( (err)=>{
    console.log(err);
})





//routes
const userProfaRoutes = require('./routes/userProfa');
const subjectRoutes = require('./routes/subject');



// use static folder public 
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


//Handlebars middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  Method-override Middelware
app.use(methodOverride('_method'));


// Body-parser Middelware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});

app.get('/', (req,res,next)=>{
    /*Profa.find({firstName: 'jovan'})
    .exec()
    .then(user=>{
        console.log(user);
        res.render('test',{ user : user});
    })
    .catch(err=>{throw err});*/
    res.render('test');
})


// Routes which should handle requests
app.use("/users", userProfaRoutes);
app.use("/subject", subjectRoutes);
