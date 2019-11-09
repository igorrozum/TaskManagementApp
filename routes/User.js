const express = require('express')
const router = express.Router()


// Takes you to the login page
router.get('/login', (req, res)=>{
    res.render('User/login')
})


// Takes you to the register page
router.get('/register', (req, res)=>{
    res.render('User/register')
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