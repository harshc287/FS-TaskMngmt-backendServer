const express = require("express");

const taskController = require('../controllers/taskController')
const router = express.Router();


router.get('/getTasks', taskController.getTasks)
router.post("/createTask", taskController.createTask);
router.get('/getTaskByID/:ID', taskController.getTaskByID)
router.get("/queryTaskTitle/", taskController.queryTaskTitle)
router.put("/updateTask/:ID", taskController.updateTask);
router.delete("/deleteTask/:ID", taskController.deleteTask);

module.exports = router
