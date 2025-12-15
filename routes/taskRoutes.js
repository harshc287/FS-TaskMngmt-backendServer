const express = require("express");

const taskController = require('../controllers/taskController')
const {auth, admin} = require("../middleware/auth")
const router = express.Router();


router.get('/getTasks', auth, admin, taskController.getTasks)
router.post("/createTask", auth, admin, taskController.createTask);
router.get('/getTaskByID/:ID', auth, taskController.getTaskByID)
router.get("/queryTaskTitle/", auth, taskController.queryTaskTitle)
router.put("/updateTask/:ID", auth, admin, taskController.updateTask);
router.delete("/deleteTask/:ID", auth, admin, taskController.deleteTask);

router.get('/getCompletdTasks', auth, admin, taskController.getCompletedTasks)

router.get('/getHighestPriorityTasks', auth, taskController.getHighestPriorityTasks)

router.get('/completedBetween', auth, admin, taskController.getTasksCompletedBetween)

//Added New Api

router.patch("/statusUpdate/:ID", auth, admin, taskController.statusUpdate)


module.exports = router
