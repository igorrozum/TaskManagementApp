const express = require('express')
const router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
// })


// Takes you to the home page
router.get('/', (req, res)=>{
    res.render('General/index');
})


// Takes you to the register page
router.get('/about', (req, res)=>{
    res.render('General/about')
})


module.exports = router