const express = require('express')
const router = express.Router();
//get dbSchema's
const Employee = require('../models/schema')


//adding a new employee
router.post('/addEmployee', async function(req,res) {
  console.log('Add Employee: ')
  console.log(req)
  const employee = new Employee({
      empName: req.body.empName,
      empDateOfBirth: req.body.empDateOfBirth,
      empSalary: req.body.empSalary,
      empSkills: req.body.empSkills,
      empImage: req.body.empImage
    })
  try{
     const newEmployee= await employee.save()
     res.status(201).json(newEmployee) //success status
   }catch(err){
     res.status(400).json({message: err.message}) //error status
   }
})

//update the Employee details
router.patch('/updateEmployee/:empId', getEmployee, async (req,res) => {
  console.log('Update Employee '+ res.Employee.empId)
  if(req.body.empName != null){
    res.Employee.empName = req.body.empName
  }
  if(req.body.empDateOfBirth != null){
    res.Employee.empDateOfBirth = req.body.empDateOfBirth
  }
  if(req.body.empSalary != null){
    res.Employee.empSalary = req.body.empSalary
  }
  if(req.body.empSkills != null){
    res.Employee.empSkills = req.body.empSkills
  }
  if(req.body.empImage != null){
    res.Employee.empImage = req.body.empImage
  }
  try{
    const updateEmployee = await res.Employee.save()
    res.json(updateEmployee)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

//remove one employee
router.delete('/deleteEmployee/:empId', getEmployee, async (req,res) => {
  console.log("Delete Employee" + res.Employee.empId)
  try{
    await res.Employee.remove();
    return res.json({message: 'Deleted ' + req.params.empId})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

//get  employee
router.get('/editEmployee/:empId',getEmployee, async function(req,res) {
  console.log('Get  Employee: '+ res.Employee.empId)
  res.json(res.Employee)
})


router.get('/allEmployees', async function(req,res) {
  console.log('Get All Employees: ')
  try{
    const employees = await Employee.find()
    console.log(employees)
    res.json(employees)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})
//using middleware to get employee
async function getEmployee(req, res, next){
  //console.log(req.params+ req.query)
  try{
    employee = await Employee.findOne({empId: Number(req.params.empId)})
    if (employee == null) {
     return res.status(404).json({ message: 'Cannot find Employee: ' + req.params.empId})
    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
  res.Employee = employee
  next()
}

module.exports = router ;
