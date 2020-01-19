import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import EmployeeService from './Services';

var divStyle = {
  margin: '8% 8%',
};

class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.employeeService = new EmployeeService();
    this.state = {
      employees: []
    }
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  componentDidMount = () => {
    this.getEmployeeList();
  }

  // To get all the employees
  async getEmployeeList() {
     await axios.get('http://localhost:3000/allEmployees')
    .then((response) => {
      console.log("In client side response")
      console.log(response);
      this.setState({
        employees: response.data
    });
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  // To delete any employee
  deleteEmployee(empid) {
    this.employeeService.deleteEmployee(empid);
  this.getEmployeeList();
  }

  render() {
  const { employees } = this.state;
  console.log(employees);
  return (
    <div style={divStyle}>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Photo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          employees && employees.map((employee, i) => {
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{employee.empName}</td>
              <td>{employee.empDateOfBirth}</td>
              <td>{employee.empSalary}</td>
              <td>{employee.empSkills}</td>
              <td>{employee.empImage}</td>
              <td>
              <Link to={"editEmployee/" + employee.empId} className="btn btn-primary">Edit</Link>
              </td>
              <td>
              <Button onClick={() => this.deleteEmployee(employee.empId)} bsStyle="danger" >Delete</Button>
              </td>
            </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  );
  }
}

export default ListEmployee;
