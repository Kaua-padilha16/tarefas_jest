
const {Router} = require("express");
const TaskController = require("../controllers/TaskController");

const checkTaskExists = require("../middlewares/checkTaskExists");

const taskRoutes = Router();
const taskController = new TaskController();

//----------------------------------------------------------------------------//

taskRoutes.post("/tasks/:user_id", taskController.createTask);

taskRoutes.get("/tasks", taskController.listTask);

taskRoutes.get("/tasks/:id", checkTaskExists, taskController.listTaskById);

taskRoutes.put("/tasks/:task_id", checkTaskExists, taskController.updateTask);

taskRoutes.patch("/tasks/status/:task_id", checkTaskExists, taskController.updateTaskStatus);

taskRoutes.delete("/tasks/:task_id", checkTaskExists, taskController.deleteTask);

//-------------------------------------------------------------------------------//

module.exports = taskRoutes;