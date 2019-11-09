const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title:  
  {
      type:String,
      required:true
  },
  description:  
  {
      type:String,
      required:true
  },
  dateReminder:  
  {
      type:Date,
      required:false
  },
  dateCreated :
  {
      type:Date,
      default: Date.now()
  }
});

const taskModel =mongoose.model("Task",taskSchema);

module.exports=taskModel;