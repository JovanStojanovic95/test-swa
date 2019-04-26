const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const Profa = require('../models/users/profa');

const Subject = require('../models/subject');


//----------------- GET METHODS Subjects ------------------------------------//



//----GET ALL SUBJECTS
router.get('/', (req, res, next) => {
    Subject.find()
        .exec()
        .then(subject => {
            res.render('subject/allSubject', {
                subject: subject
            })
        })
        .catch()
})

router.get('/category', (req, res, next) => {

    Subject.find()
        .distinct('category')
        .exec()
        .then(subject => {
            //console.log(subject);
            res.render('subject/category', {
                subject: subject
            })
        })
        .catch()
})





router.get('/add', (req, res, next) => {

    Subject.find()
        .distinct('category')
        .exec()
        .then(subject => {
            //console.log(subject);
            res.render('subject/addSubject', {
                subject: subject
            })
        })
        .catch()
    //res.render('subject/addSubject')
})




//----------------- POST METHODS Subjects ------------------------------------//

//--------------ADD NEW SUBJECT---------------------
router.post('/add', (req, res, next) => {

    let errors = [];

    if (!req.body.name) {
        errors.push({
            text: "Please add the name of subject"
        })
    }
    if (!req.body.category) {
        errors.push({
            text: "Please add the category of subject"
        })
    }

    if (errors.length > 0) {
        res.redirect('subject/add', {
            errors: errors
        });
    } else {

        console.log(req.body.kategorija);
        Subject.findOne({
                name: req.body.name
            })
            .exec()
            .then(subject => {
                if (subject) {
                    console.log(subject);
                    res.render('subject/allSubject');
                } else {
                    const newSubject = new Subject({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        category: req.body.category
                    });
                    return newSubject.save();
                }

            })
            .then(subject => {
               // req.flash('success_msg', 'Subject added');
                res.redirect('/');
            })
            .catch()
    }
})

//---------------Category first time-----------------
router.post('/category', (req, res, next) => {
    Subject.find({
            category: req.body.category
        })
        //.distinct('name')
        .exec()
        .then(subject => {
            console.log(subject);
            res.render('subject/category', {
                subject1: req.body.category,
                predmet: subject
            })
        })
        .catch()
})


//---------------Category second time-----------------
/*router.post('/category/item', (req,res,next)=>{
    Subject.find({name : req.body.name})
    .exec()
    .then(subject=>{
        console.log(subject);
        res.render('subject/category',{subject1:req.body.category ,predmet:subject})
    })
    .catch()
})*/


module.exports = router;