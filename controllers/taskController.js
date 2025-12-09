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
    const tasks = await Task.findAll({
      attributes: ["id", "title", "status", "priority", "startDate", "endDate"]
    })
    res.status(200).send({taks:tasks, success:true})

  } catch (err) {
    res.status(500).json({msg:"server error", success: false });
  }
};


//getTaskByID
async function getTaskByID(req, res){
  console.log(req.params.ID)
  const id = Number(req.params.ID)
  try {
    const task = await Task.findByPk(id)
    if(!task){
      res.status(404).send({msg:"task not found", success: false})

    }else{
      res.status(200).send({success:true, task:task})
    }
    
  } catch (error) {
    res.status(500).send({msg:"Server Error",success:false})
    
  }
}

//queryTaskTitle

async function queryTaskTitle(req, res) {
  const { tname } = req.query

  try {
    const taskByTitle = await Task.findOne({
      where: { title: tname }
    })

    if (!taskByTitle) {
      return res.status(404).send({ msg: "Task not found", success: false })
    }

    return res.status(200).send({
      success: true,
      task: taskByTitle
    })

  } catch (error) {
    return res.status(500).send({ msg: "Server Error", success: false })
  }
}



// Update a task
async function updateTask(req, res){

  console.log(req.body)
  console.log(req.params)
    const ID = req.params.ID
    const{status, priority, startDate, endDate} = req.body

  try {
    const [Updated] = await Task.update(
      {status, priority, startDate, endDate},
      {where:{id:ID}}
    )
    if(Updated === 0){
      res.status(400).send({msg:"task not found", success: false})
    }
     return res.status(200).send({
      success: true,
      msg: "Task updated successfully"
    }) 

  }catch (err) {
    res.status(500).json({msg:"server error", success: false });
  }
};

// Delete a task
async function deleteTask(req,res){
    console.log(req.params)
    const {ID} = req.params
    try {
        const taskDeleted = await Task.destroy({
            where:{id:ID}
        })
        console.log(taskDeleted,'taskDeleted')
        if(!taskDeleted){
            res.status(400).send({msg:"Task not found", success:false})
        }
          return res.status(200).send({
            success: true,
            msg: "Task deleted successfully"
    })

    } catch (error) {
        res.status(500).send({msg:"Server Error"})
    }
}

module.exports = {
  deleteTask,
  getTaskByID,
  updateTask, 
  createTask, 
  getTasks, 
  queryTaskTitle
}
 