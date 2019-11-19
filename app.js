const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
require('dotenv').config({ path: "apis.env" })
const fileupload = require("express-fileupload");
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()


app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(fileupload())
app.use(session({secret: "This is my secret key"}))

app.use((req, res, next) => {
    //This is a global variable that can be accessed by templates
    res.locals.user = req.session.userInfo
    next()
})

// load route objects
const taskRouter = require('./routes/Task')
const userRouter = require('./routes/User')
const generalRouter = require('./routes/General')

app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/', generalRouter)


mongoose.connect(process.env.DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`App was conneted to the database`)
})
.catch((err)=>{
    console.log(`Something went wrong: ${err}`)
})




app.listen(process.env.PORT, ()=>{
    console.log(`App is conneted to the port ${process.env.PORT}`)
})