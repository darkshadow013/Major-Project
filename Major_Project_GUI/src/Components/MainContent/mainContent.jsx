import React, { Component } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

class MainContent extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleSearch (e){
		const val = document.getElementById("searchBoxId").value;
		localStorage.setItem("searchQuery", val);
		this.props.history.push( {pathname: "/search", state: {query: val}});
	}
	handleKeyDown(e) {
		if(e.key === 'Enter') {
			this.handleSearch();
		}
	}
	render() {
		return (
			<>
				<div style={{ maxWidth: "650px", padding: "15px", margin: "auto", marginTop: "60px" }}>
					<Form.Group controlId="formBasic" style={{ display: "flex" }}>
						<Form.Control id="searchBoxId" type="text" placeholder="Search Document Here..." onKeyDown={this.handleKeyDown}/>
						<Button variant="light" onClick={this.handleSearch}><SearchIcon /></Button>
					</Form.Group>
				</div>
				<section className="jumbotron text-center" style={{background: "white"}}>
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