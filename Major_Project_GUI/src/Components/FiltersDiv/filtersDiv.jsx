import React from 'react';
import CheckboxList from './checkBoxList'
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as documentActions from "../../Redux/Action/documentActions";
class FiltersDiv extends React.Component {
	render() {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ textAlign: "center", fontWeight: "500", fontSize: "larger" }}>Keywords Filtering</div>
				<div style={{ display: "flex", flexDirection: "column", marginTop: "20px", maxHeight: "500px", overflowY: "auto" }}>
					<CheckboxList documentsTitles={this.props.documentsTitles} keywordsList={this.props.keywordsList} />
				</div>
			</div>
		);
	}
}

FiltersDiv.propTypes = {
	setDocumentsTitlesAll: PropTypes.func,
	setDocumentsTitles: PropTypes.func,
};
const mapStateToProps = (state) => ({
	...state
});
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators(documentActions, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FiltersDiv);