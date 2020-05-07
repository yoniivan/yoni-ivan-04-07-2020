import React from 'react';
import { Navbar, Nav, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
 

const NavigationBar = (props) => {

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg={props.theameBG} variant={props.theameV}>
    <Navbar.Brand href="#home">Herolo Weather Task</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <div style={{marginRight: "3rem"}}>
        <ToggleButtonGroup type="checkbox" 
        value={props.value} 
        onChange={props.handleChange}
        >
        <ToggleButton value={1}>Dark</ToggleButton>
        <ToggleButton value={2}>Light</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Nav>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/favorites">Favorites</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    </div>
  );
}

export default NavigationBar;