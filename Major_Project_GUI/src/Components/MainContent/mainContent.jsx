import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

class MainContent extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	state = {
		showError: 0,
	}
	handleSearch(e) {
		const val = document.getElementById("searchBoxId").value;
		this.setState({ showError: 0 });
		if (val.length === 0) {
			this.setState({ showError: 1 });
		} else {
			localStorage.setItem("searchQuery", val);
			this.props.history.push({ pathname: "/search" });
		}
	}
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			this.handleSearch();
		}
	}

	render() {
		const errorDiv = <div style={{ width: "100%", fontSize: "80%", color: "#dc3545" }}>
			Please enter something
		</div>;
		const errorBox = (this.state.showError === 1) ? errorDiv : null;
		return (
			<>
				<div style={{ maxWidth: "650px", padding: "15px", margin: "auto", marginTop: "60px" }}>
					<Form.Group controlId="formBasic" style={{ display: "flex", marginBottom: "0.25rem" }}>
						<Form.Control required id="searchBoxId" type="text" placeholder="Search Document Here..." onKeyDown={this.handleKeyDown} />
						<Button variant="light" onClick={this.handleSearch}><SearchIcon /></Button>
					</Form.Group>
					{errorBox}
				</div>
				<section className="jumbotron text-center" style={{ background: "white" }}>
					<div className="container">
						<h1 className="jumbotron-heading">Hi There,</h1>
						<p className="lead text-muted">You are on the homepage. Try Searching for a document.</p>
					</div>
				</section>
			</>
		);
	}
}

export default MainContent;