const express = require("express");
const { createEmployee, getEmployee,updateEmployee, deleteEmployee, getSingleEmployee } = require("../controllers/employeeController");
const router = express.Router()

router.post("/createEmployee",createEmployee )
router.get("/getEmployee",getEmployee )
router.get("/getSingleEmployee/:id",getSingleEmployee )
router.put("/updateEmployee/:id",updateEmployee )
router.delete("/deleteEmployee/:id", deleteEmployee);


module.exports = router