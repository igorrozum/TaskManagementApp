const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
require('dotenv').config({ path: "apis.env" })





// load route objects
const taskRouter = require('./routes/Task')
const userRouter = require('./routes/User')
const generalRouter = require('./routes/General')



const app = express()

app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/', generalRouter)


app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))


mongoose.connect(process.env.DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`App was conneted to the database`)
})
.catch((err)=>{
    console.log(`Something went wrong: ${err}`)
})












const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App is conneted to the port ${PORT}`)
})