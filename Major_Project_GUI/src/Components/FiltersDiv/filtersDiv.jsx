import React from 'react';
import CheckboxList from './checkBoxList'
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as documentActions from "../../Redux/Action/documentActions";
import store from "../../Redux/Store/store";
import keywordToTitlesData from '../../JSON_Data/keywordToTitlesMap.json';
import titleToKeywordsData from '../../JSON_Data/titleToKeywordsMap.json';
import documentsData from '../../JSON_Data/documentsData.json';
class FiltersDiv extends React.Component {
	constructor(props) {
        super(props);
    }
	render() {
		return (
			<div style={{display: "flex", flexDirection: "column"}}>
				<div style={{textAlign: "center", fontWeight: "bolder", fontSize: "larger"}}>Keywords Filtering</div>
				<div style={{display: "flex", flexDirection: "column", marginTop: "20px", maxHeight: "500px", overflowY: "auto"}}>
					<CheckboxList documentsTitles= {this.props.documentsTitles}
					keywordsList= {this.props.keywordsList}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(FiltersDiv);