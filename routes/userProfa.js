const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
//const upload = multer({dest:"uploads/"});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });



// Model userProfa
const Profa = require('../models/users/profa');
//---------------TESTS
const Subject = require('../models/subject');
//--------------


// User login route
router.get('/login', (req, res) => {
    Subject.find()
    .exec()
    .then(subject=>{
        res.render('users/login',{subject:subject});
    })
    .catch()
   
    //res.render('users/login');
})


// User registar route
router.get('/register', (req, res) => {
    res.render('users/register');
})


//---------------Register Profa user compete only auth
router.post('/register', (req, res) => {

    let errors = [];

    if (req.body.password != req.body.passwordCon) { // cheacking passwords match
        errors.push({
            text: 'Password do not match'
        });
    }

    if (req.body.password.length < 4) { // cheackin length of password
        errors.push({
            text: 'Password must be least 4 characters'
        });
    }

    if (errors.length > 0) { // if no problems
        res.render('users/register', {
            errors: errors, // return all thing that user set in input and problems
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordCon: req.body.passwordCon
        });
    } else {
        Profa.find({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    //req.flash('error_msg', 'Email alerady exist');
                    res.redirect('/users/register'); // if it exist cant do
                } else {
                    const newUser = new Profa({ // else create object of model 
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt) => { 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash; // hash is crptted password
                            newUser.save() // then save that user with crypt password
                                .then(user => {
                                    //req.flash('success_msg', "You are now register and you can log in");
                                    res.redirect('/users/login');
                                }).catch(err => {
                                    console.log(err);
                                    return
                                })
                        });
                    })
                }
            })
    }
});

//-------------Profa Profile

router.get('/profile', (req,res,next)=>{
    Profa.findOne({email:'jocko95@live.com'})
    .exec()
    .then(user=>{
        console.log(user);
        res.render('users/profile',{ user:user});
    })
    .catch()
    
})


router.get('/profile/edit', (req,res,next)=>{
    
    Profa.findOne({email:'jocko95@live.com'})
    .exec()
    .then(user=>{
        console.log("nest")
        res.render('users/editProfile',{ user:user});
    })
    .catch()

})

router.post('/profile/edit', upload.single('userImage'), (req,res,next)=>{
    console.log(req.file.path);
    let fullFilePath = __dirname + "/" + req.file.path;
    Profa.findOneAndUpdate({email:'jocko95@live.com'},{firstName:req.body.firstName, userImage : fullFilePath})
    .exec()
    .then(user=>{
        //user.firstName = req.body.firstName;
        //user.userImage = req.file.path;
        console.log('2');
        return user;
        
    })
    .then(user=>{
        console.log('3');
        res.render('users/profile',{ user:user});
    })
    .catch()
})



//---------------Last for auth
router.post('/login', (req, res) => {
    res.render('profil');
})

module.exports = router;