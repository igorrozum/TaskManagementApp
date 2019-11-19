// const mongoose = require('mongoose');
const Task = require("../models/Task");
const express = require('express')
const router = express.Router()


function isAuthenticated(req, res, next) {
    if (req.session.userInfo) {
        return next();
    } else {
        res.render('User/login')
    }
  }


// Takes you to the task add page
router.get('/add', isAuthenticated, (req, res)=>{
    res.render('Task/taskadd')
})


router.post('/add', (req, res)=>{

    const formData = {
        title: req.body.title,
        description: req.body.description,
        dateReminder: req.body.reminderDate,
        user: req.session.userInfo._id
    }

    const task = new Task(formData);
    task.save().then(() => console.log('Task has been saved successfully'))
    .catch((err)=>console.log(`Something went wrong: ${err}`))

    res.redirect('/task/list')
})


// Takes you to the task list page
router.get('/list', isAuthenticated, (req, res)=>{
    // This is how you pull from the database
    Task.find({user: req.session.userInfo._id})
    .then((tasks)=>{
        res.render("Task/taskdashboard", {
            list : tasks
        })
    })
    .catch(err=>console.log(`Error : ${err}`))
})


router.get('/edit/:id', (req, res)=>{
    
    Task.findById(req.params.id)
    .then((task)=>{
        res.render("Task/taskedit", {
            task : task
        })
    })
    .catch(err=>console.log(`Error : ${err}`))

})


router.put('/edit/:id', (req, res)=>{
    Task.findById(req.params.id)
    .then((task)=>{
        task.title = req.body.title
        task.description = req.body.description
        task.dateReminder = req.body.reminderDate
        task.save()
        .then(()=>{
            console.log("Task has been saved successfully")
            res.redirect("/task/list")
        })
    })
    .catch(err=>console.log(`Error : ${err}`))
})


router.delete('/delete/:id', (req, res)=>{
    Task.deleteOne({_id:req.params.id})
    .then(()=>console.log("The document has been deleted"))
    .catch((err)=>console.log(`Something went wrong: ${err}`))

    res.redirect('/task/list')
})



module.exports = router