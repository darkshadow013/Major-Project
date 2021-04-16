import React, { Component } from 'react';
class ErrorPage extends Component {
	render() {
		return (
			<section className="jumbotron text-center" style={{ background: "white" }}>
				<div className="container">
					<h1 className="jumbotron-heading">404 Error</h1>
					<p className="lead text-muted">This link doesn't exist</p>
				</div>
			</section>
		);
	}
}

export default ErrorPage;