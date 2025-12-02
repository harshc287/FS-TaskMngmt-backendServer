const express = require("express");

const taskController = require('../controllers/taskController')
const router = express.Router();


router.get('/getTasks', taskController.getTasks)
router.post("/createTask", taskController.createTask);
// router.post("/createTask", taskController.createTask);
// router.get('/ getTaskByID/:ID', taskController.getTaskByID)
// router.put("/updateTask/:ID", taskController.updateTask);
// router.delete("/deletTask/:ID", taskController.deleteTask);

module.exports = router
