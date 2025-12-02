const Task = require('../models/taskModel')

//createTask
async function createTask(req, res){
  console.log(req.body)
  try {
    const newTask = await Task.create(req.body)
    if(newTask){
      res.status(200).send({msg:"task created successfully...", success:true})
    }else{
      res.status(400).send({msg:"error while creating task...", success:false})

    }
  } catch (error) {
    res.status(500).send({msg:"Server Error",success:false})
  }
}

// Get tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll()
    res.status(200).send({taks:tasks, success:true})

  } catch (err) {
    res.status(500).json({msg:"server error", success: false });
  }
};



//getalltask

function getAllTask(req, res){
  try {
    
  } catch (error) {
    res.status(500).send({msg:"server error"})
    
  }
}

//getTaskByID
function getTaskByID(req, res){
  try {
    
  } catch (error) {
    res.status(500).send({msg:"server error"})
    
  }
}



// Update a task
function updateTask(req, res){
  try {
   
    
  } catch (err) {
    res.status(500).json({msg:"server error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
  
  } catch (err) {
    res.status(500).json({ msg:"server error" });
  }
};

module.exports = {deleteTask, getAllTask, getTaskByID, updateTask, createTask, getTasks}
 