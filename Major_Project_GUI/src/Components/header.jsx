import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
class Header extends Component {
	state = {}
	render() {
		return (
			<Navbar collapseOnSelect expand="sm" bg="light" variant="light">
				<Navbar.Brand href="#home">Doc<b style={{ fontWeight: "500" }}>Filter</b></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: "flex-end" }}>

					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/overlap">Overlap</Nav.Link>
						<Nav.Link href="https://github.com/darkshadow013/Major-Project">Code</Nav.Link>
						<Nav.Link href="/details.html">Details</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;