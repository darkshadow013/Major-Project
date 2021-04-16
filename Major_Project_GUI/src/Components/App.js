import React from "react";
import '../CSS/mainDiv.css'
import data from '../JSON_Data/keywordsMap.json';
import filesData from '../JSON_Data/filesMap.json';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../Redux/Action/documentActions";
import { store } from '../Redux/Store/store';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		//this.handleFilesShowList = this.handleFilesShowList.bind(this);
	}
	state = {
		jsonData: data,
		keysList: [],
		selectedKeysList: [],
		originalKeysList: [],
		originalFilesList: [],
		filesList: [],
		filesData: filesData,
	}

	async handleChange(e) {
		if (e.target.value.length === 0) {
			await this.setState({ keysList: this.state.originalKeysList });
		} else {
			var matches = await (this.state.originalKeysList).filter(function (windowValue) {
				if (windowValue) {
					return windowValue.indexOf(e.target.value) >= 0;
				}
			});
			await this.setState({ keysList: matches });
		}
	}
	removeElement(array, elem) {
		var index = array.indexOf(elem);
		if (index > -1) {
			array.splice(index, 1);
		}
		return array;
	}
	updateFilesList = async () => {
		var selected = this.state.selectedKeysList;
		var completeArray = [];
		var array = []
		if (selected.length != 0) {
			await Promise.all(selected.map(async (key) => {
				completeArray = completeArray.concat(this.state.jsonData[key]);
			})).then(() => {
				var set = new Set(completeArray);
				array = Array.from(set);
			}).then(() => {
				this.setState({ filesList: array });
			});
		}
		else {
			this.setState({ filesList: this.state.originalFilesList });
		}
	}
	async handleClick(e) {
		if (e.target.checked === true) {
			await this.setState({ selectedKeysList: [...this.state.selectedKeysList, e.target.value] });
			this.updateFilesList();
		} else {
			var array = await this.removeElement(this.state.selectedKeysList, e.target.value);
			await this.setState({ selectedKeysList: array });
			this.updateFilesList();
		}
	}
	async handleRemove(e) {
		var array = await this.removeElement(this.state.selectedKeysList, e);
		await this.setState({ selectedKeysList: array })
		this.updateFilesList();
	}
	async componentDidMount() {
		var jsonData = this.state.jsonData;
		var keys = [];
		for (const key in jsonData) {
			keys = [...keys, key]
		}
		await this.setState({ keysList: keys });
		await this.setState({ originalKeysList: keys });

		var filesData = this.state.filesData;
		var files = [];
		for (const file in filesData) {
			files = [...files, file]
		}
		await this.setState({ originalFilesList: files });
		await this.setState({ filesList: files });
	}

	render() {
		var list = this.state.keysList;
		var selected = this.state.selectedKeysList;
		var show = (selected.length === 0) ? null : <>
			<hr style={{ marginBottom: "1px" }} />
			<div className="selectedKeywordsDiv">
				{selected.map((key, idx) => (
					<div className="chip">
						{key}
						<span className="closebtn" onClick={() => this.handleRemove(key)}>&times;</span>
					</div>
				))}
			</div>
		</>

		return (
			<div className="mainClass">
				<div className="heading">
					<p className="headingText">
						Document Filtering
					</p>
				</div>
				<div className="flex-container">

					<div className="keywordsDiv1">
						<div className="keywordsDiv2">
							<div className="keywordsSearchDiv">
								<input id="searchBox" placeholder="Search..." type="search" onChange={this.handleChange} />
							</div>
							{show}
						</div>
						<div className="keywordsDiv3">
							<div className="keywordsListDiv">
								{list.map((key, idx) => (
									<>
										<input type="checkbox" id={key} name={key} value={key}
											checked={this.state.selectedKeysList.indexOf(key) > -1 ? true : false}
											onClick={this.handleClick.bind(this)}
											onChange={() => console.log("try")} />
										<label htmlFor={key}> {key}</label><br></br>
									</>
								))}
							</div>
						</div>
					</div>

					<div className="filesDiv1">
						<table style={{ width: "100%" }}>
							<tr>
								<th style={{ width: "10%" }}>S.No.</th>
								<th>PDF</th>
							</tr>
							{this.state.filesList.map((key, idx) => (
								<tr>
									<td style={{ textAlign: "center" }}>{idx + 1}</td>
									<td style={{ padding: "0 10px" }}><a href={filesData[key]}>{key}</a></td>
								</tr>
							))}
						</table>
					</div>

				</div>
			</div>
		);
	}
}

App.propTypes = {
	addKeywordToList: PropTypes.func,
	addFileNameToList: PropTypes.func,
};
const mapStateToProps = (state) => ({
	...state
});
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		...bindActionCreators(appActions, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
