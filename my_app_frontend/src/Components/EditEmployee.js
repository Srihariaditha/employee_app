import React, { Component } from 'react';
import axios from 'axios';

const customStyle = {
  width: '300px',
  margin: '0 auto'
}

class EditEmployee extends Component {
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

  componentDidMount = () => {
    this.getEmployeeById();
  }

  // To get employee based on ID
  getEmployeeById() {
    axios.get('http://localhost:3000/editEmployee/' + this.props.match.params.empId)
    .then((response) => {
      this.setState({
          empName: response.data.empName,
          empDateOfBirth: response.data.empDateOfBirth,
          empSalary: response.data.empSalary,
          empSkills: response.data.empSkills,
          empImage: response.data.empImage
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // To update the record on submit
  handleSubmit = (event) => {
    event.preventDefault();
    const { empName, empDateOfBirth, empSalary, empSkills, empImage } = this.state;
    axios.post('http://localhost:3000/updateEmployee/' + this.props.match.params.empId, {
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

export default EditEmployee;
