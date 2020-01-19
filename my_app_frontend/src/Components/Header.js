import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';

class Header extends Component {
  render() {
    return (
          <div>
            <Navbar>
            <header>
              <Navbar.Brand>
                <a href="javascript:void(0)">Employees</a>
              </Navbar.Brand>
            </header>
            <Nav>
              <NavItem href="javascript:void(0)">
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem href="javascript:void(0)">
                <Link to="/Addemployee">Add New Employee</Link>
              </NavItem>
            </Nav>

            </Navbar>
          </div>
    );
  }
}
export default Header;
