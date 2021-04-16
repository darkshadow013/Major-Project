import React, { Component } from 'react';
class Details extends Component {
	state = {}
	render() {
		return (
			<div>
				details
				{this.props.location.state.query}
			</div>
		);
	}
}

export default Details;