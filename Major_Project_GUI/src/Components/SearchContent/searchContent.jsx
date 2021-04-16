import React, { Component } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import FiltersDiv from '../FiltersDiv/filtersDiv';
import DocumentsList from "../DocumentsList/documentsList";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as documentActions from "../../Redux/Action/documentActions";
import store from "../../Redux/Store/store";
import keywordToTitlesData from '../../JSON_Data/keywordToTitlesMap.json';
import titleToKeywordsData from '../../JSON_Data/titleToKeywordsMap.json';
import documentsData from '../../JSON_Data/documentsData.json';
import documentReducer from '../../Redux/Reducer/documentReducer';

class SearchContent extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	state = {
        documentsData: documentsData,
        documentsTitlesAll: [],
        documentsTitles: [],
		keywordsList: [],
		everythingDone: 0,
    }
    async componentDidMount() {

        var keys = [];
		var keywordsList = [];
		var val = 0;
		console.log(documentsData);
		for(const key in documentsData) {
			keys = [...keys,key]
		}
		await Promise.all([3]).then(async () =>{
			await this.setState({documentsTitlesAll: keys});
        	await this.props.setDocumentsTitlesAll(keys);
		}).then(async () =>{
			const query = localStorage.getItem("searchQuery");;
			if(query.length === 0) {
				await this.setState({documentsTitles: keys});
				await this.props.setDocumentsTitles(keys);
			} else {
				keys = []
				for (const key in documentsData) {
					if(key.toLowerCase().includes(query.toLowerCase())) {
						keys = [...keys, key]
					}
				}
				await this.setState({documentsTitles: keys});
				await this.props.setDocumentsTitles(keys);
			}
		}).then(async () => {
			
			const documentsTitles = this.state.documentsTitles;
			documentsTitles.map((title) => {
				titleToKeywordsData[title].map((keyword) => {
					keywordsList = keywordsList.concat(keyword);
				})
			});

		}).then(async () => {
			await this.setState({keywordsList: keywordsList});
			await this.props.setKeywordsList(keywordsList);
			await this.setState({everythingDone: 1});
		})
	}

	handleSearch (e){
		const val = document.getElementById("searchBoxId").value;
		localStorage.setItem("searchQuery", val);
		window.location.reload();
	}
	handleKeyDown(e) {
		if(e.key === 'Enter') {
			this.handleSearch();
		}
	}
	
	render() {
		const searchQuery = localStorage.getItem("searchQuery");
		const searchComponentDiv = <>
		<div style={{ maxWidth: "650px", padding: "15px", margin: "auto", marginTop: "40px"}}>
			<Form.Label><b>Showing Results for :-</b> {searchQuery}</Form.Label>
			<Form.Group style={{ display: "flex" }}>
				<Form.Control id="searchBoxId" type="text" placeholder="Search Document Here..." onKeyDown={this.handleKeyDown}/>
				<Button variant="light" onClick={this.handleSearch}><SearchIcon /></Button>
			</Form.Group>
		</div>
		<Divider variant="middle" />
		<div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
			<div style={{ width: "300px" }}>
				<FiltersDiv documentsTitles= {this.state.documentsTitles}
				keywordsList= {this.state.keywordsList}/>
			</div>
			<Divider orientation="vertical" flexItem />
			<div style={{ width: "700px"}}>
				<DocumentsList query={searchQuery}
				documentsTitles= {store.getState().documentReducer.documentsTitles}
				documentsTitlesAll= {store.getState().documentReducer.documentsTitlesAll} />
			</div>
		</div>
	</>;
		const divToShow = (this.state.everythingDone === 1) ? searchComponentDiv : null;
		return (
			<div>{divToShow}</div>
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
export default connect(mapStateToProps,mapDispatchToProps)(SearchContent);