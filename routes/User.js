const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const path = require('path')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))


// Takes you to the login page
router.get('/login', (req, res)=>{
    res.render('User/login')
})


// Takes you to the login page
router.post('/login', (req, res)=>{
    const errors = []
    const formData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({email: formData.email})
    .then(user => {
        if (user) {
            bcrypt.compare(formData.password, user.password)
            .then(isMatched => {
                if (isMatched) {
                    // Create session
                    req.session.userInfo = user;

                    res.redirect('/task/list')
                } else {
                    errors.push('Sorry, your password does not match')
                    res.render('User/login', { errors : errors })
                }
            })
            .catch(err => console.log(`Something went wrong: ${err}`))
        } else {
            errors.push("Sorry, your email hasn't been found")
            res.render('User/login', { errors : errors })
        }
    })
    .catch(err => console.log(`Something went wrong: ${err}`))
})


// Takes you to the register page
router.get('/register', (req, res) => {
    res.render('User/register')
})

router.post('/register',(req,res)=> {
    //validation
    let errors = []

    if (req.files == null) {
        errors.push("please upload the file")
    } else {
        if (req.files.profilePic.mimetype.indexOf('image') == -1) {
            errors.push('it is not an image')
        }
    }

    if (errors.length > 0) {
        res.render('User/register', {
            errors: errors
        })
    } else {
        const userData = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            // username : req.body.username,
            password : req.body.password
        }
        
    
        const user = new User(userData)
        user.save()
        .then(user => {
            req.files.profilePic.name = `pic_${user._id}${path.parse(req.files.profilePic.name).ext}`

            req.files.profilePic.mv(`./public/uploads/${req.files.profilePic.name}`)
            .then(() => {
                console.log(`User ${user.firstName} has been inserted`) 
                // user.profilePic = req.files.profilePic.name
                user.updateOne({profilePic: req.files.profilePic.name})
                .then(() => console.log(`Picture ${req.files.profilePic.name} has been saved`))
                .catch(err => console.log(`Picture ${req.files.profilePic.name} has not been saved`))
                res.redirect('/user/login')
            })
            .catch(err => console.log(`something went wrong ${err}`))
        })
        .catch(err => {
            console.log(`Something went wrong: ${err}`)
            res.redirect('/user/register')
        })
    }


});


router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/user/login')
})


// Takes you to the dashboard page
router.get('/dashboard', (req, res)=>{
    res.render('register')
})


// Takes you to the profile page
router.get('/profile', (req, res)=>{
    res.render('register')
})


module.exports = router