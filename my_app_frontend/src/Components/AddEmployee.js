import React, { Component } from 'react';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const customStyle = {
  width: '300px',
  margin: '0 auto'
}

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empName: '',
      empDateOfBirth: '',
      empSalary: '',
      empSkills: '',
      empImage:''
    }
  }

// When value changes of the fields
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

/*  handleChange = empDateOfBirth => {
    this.setState({
      empDateOfBirth: empDateOfBirth
    });
  };*/

// To add new employee when user submits the form
  handleSubmit = (event) => {
    event.preventDefault();
    const { empName, empDateOfBirth, empSalary, empSkills, empImage } = this.state;
    axios.post('http://localhost:3000/addEmployee', {
      empName: empName,
      empDateOfBirth: empDateOfBirth,
      empSalary: empSalary,
      empSkills: empSkills,
      empImage: empImage
    })
    .then((response) => {
      console.log(response);
      this.props.history.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container">
        <form style={customStyle} onSubmit={this.handleSubmit}>
          <label> Employee Name
            <input name="empName" type="text" value={this.state.empName} onChange={this.handleChange} className="form-control"/>
          </label>
          <br />
          <label> Date Of Birth
            <input name="empDateOfBirth" type="text" value={this.state.empDateOfBirth} onChange={this.handleChange} className="form-control"/>
          </label>
          <br />
          <label> Salary
            <input name="empSalary" type="text" value={this.state.empSalary} onChange={this.handleChange} className="form-control"/>
          </label>
          <br />
          <label> Skills
            <input name="empSkills" type="text" value={this.state.empSkills} onChange={this.handleChange} className="form-control"/>
          </label>
          <label> Image
            <input name="empImage" type="text" value={this.state.empImage} onChange={this.handleChange} className="form-control"/>
          </label>
          <br />
          <input type="submit" value="submit" className="btn btn-primary"/>
        </form>
      </div>
    );
  }
}

export default AddEmployee;
