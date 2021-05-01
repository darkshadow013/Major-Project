import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import FiltersDiv from '../FiltersDiv/filtersDiv';
import DocumentsList from "../DocumentsList/documentsList";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as documentActions from "../../Redux/Action/documentActions";
import store from "../../Redux/Store/store";
import titleToKeywordsData from '../../JSON_Data/titleToKeywordsMap.json';
import documentsData from '../../JSON_Data/documentsData.json';

class SearchContent extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	state = {
		documentsData: documentsData,
		documentsTitles: [],
		keywordsList: [],
		showError: 0,
	}
	async componentDidMount() {

		var keys = [];
		var keywordsList = [];

		let promise = new Promise(function (resolve, reject) {
			for (const key in documentsData) {
				keys = keys.concat(key)
			}
			resolve(keys);
		})
		promise.then(async () => {
			const query = localStorage.getItem("searchQuery");
			if (query.length === 0) {
				await this.setState({ documentsTitles: keys });
				await this.props.setDocumentsTitles(keys);
			} else {
				keys = []
				for (const key in documentsData) {
					if (key.toLowerCase().includes(query.toLowerCase())) {
						keys = keys.concat(key);
					}
				}
				await this.setState({ documentsTitles: keys });
				await this.props.setDocumentsTitles(keys);
			}
		}).then(async () => {

			const documentsTitles = keys;
			documentsTitles.map((title) => {
				titleToKeywordsData[title].map((keyword) => {
					keywordsList = keywordsList.concat(keyword);
				})
			});
			var set = new Set(keywordsList);
			keywordsList = Array.from(set);

		}).then(async () => {
			await this.setState({ keywordsList: keywordsList });
			await this.props.setKeywordsList(keywordsList);
		})
	}
	handleSearch(e) {
		const val = document.getElementById("searchBoxId").value;
		this.setState({showError: 0});
		if(val.length === 0) {
			this.setState({showError: 1});
		} else {
			localStorage.setItem("searchQuery", val);
			window.location.reload();
		}
	}
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			this.handleSearch();
		}
	}

	render() {
		const searchQuery = localStorage.getItem("searchQuery");
		const errorDiv = <div style={{width: "100%", fontSize: "80%", color: "#dc3545"}}>
			Please enter something
		</div>;
		const errorBox = (this.state.showError === 1) ? errorDiv: null;
		return (
			<>
				<div style={{ maxWidth: "650px", padding: "15px", margin: "auto", marginTop: "40px" }}>
					<Form.Label><b>Showing Results for :-</b> {searchQuery}</Form.Label>
					<Form.Group style={{ display: "flex", marginBottom: "0.25rem" }}>
						<Form.Control required id="searchBoxId" type="text" placeholder="Search Document Here..." onKeyDown={this.handleKeyDown} />
						<Button variant="light" onClick={this.handleSearch}><SearchIcon /></Button>
					</Form.Group>
					{errorBox}
				</div>
				<Divider variant="middle" />
				<div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
					<div style={{ width: "300px" }}>
						<FiltersDiv documentsTitles={this.state.documentsTitles}
							keywordsList={this.state.keywordsList} />
					</div>
					<Divider orientation="vertical" flexItem />
					<div style={{ width: "700px" }}>
						<DocumentsList documentsTitles={store.getState().documentReducer.documentsTitles} />
					</div>
				</div>
			</>
		);
	}
}

SearchContent.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchContent);