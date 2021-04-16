import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
class Header extends Component {
	state = {}
	render() {
		return (
			<Navbar collapseOnSelect expand="sm" bg="light" variant="light">
				<Navbar.Brand href="#home">Doc<b>Filter</b></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav"  style={{justifyContent: "flex-end"}}>
					
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="https://github.com/darkshadow013/Major-Project">Code</Nav.Link>
						<Nav.Link href="/details">Details</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;