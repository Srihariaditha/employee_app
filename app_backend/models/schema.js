//securitySchema stored in db
//portfolio is a collection of secuirty

//Mongoose schema models are used
const mongoose = require('mongoose')
const Schema = mongoose.Schema
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.DATABASE_URL);
autoIncrement.initialize(connection);
const  employeeSchema = new  Schema({
  empId: {
    type: Number,
    unique: true,
    ref: 'EmployeeID'
  },
  empName:{
    type: String,
    required: true,
  },
  empDateOfBirth: {
    type: String,
    required: true
  },
  empSalary: {
    type: Number,
    required: true
  },
  empSkills:{
    type: [String]
  },
  empImage:{
    type: String,
    data: Buffer //allows to store image in array form
  }
})

employeeSchema.plugin(autoIncrement.plugin,{
  model: 'EmployeeID',
  field: 'empId',
  startAt: 1,
  incrementBy: 1
});
//exporting out Schema's
module.exports = mongoose.model('Employee', employeeSchema)
