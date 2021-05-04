import React from 'react';
import store from '../../Redux/Store/store';
import * as documentActions from '../../Redux/Action/documentActions';
import { Button } from 'react-bootstrap';
import keywordToTitlesMap from '../../JSON_Data/keywordToTitlesMap.json';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';

class CheckboxList extends React.Component {
	constructor(props) {
		super(props);
		this.listobj = null;
		this.fields = { text: "name" };
		this.initialTitles = props.documentsTitles;
		this.handleClick = this.handleClick.bind(this);
	}
	state = {
		checked: [],
	}
	handleClick(e) {
		var initialTitles = this.props.documentsTitles;
		var titles = [];
		var str = "";
		var keyword = "";
		var checked = this.listobj.getSelectedItems().data;
		if (checked.length === 0) {
			store.dispatch(documentActions.setDocumentsTitles(this.props.documentsTitles));
		} else {
			let promise = new Promise(function (resolve, reject) {
				console.log("Promise");
				for (const index in checked) {
					str = checked[index].name;
					keyword = str.substring(0, str.length - checked[index].count.length - 2);
					keywordToTitlesMap[keyword].map((title) => {
						if (initialTitles.includes(title)) {
							titles.push(title);
						}
					});
				}

				resolve(titles);
			})
			promise.then((titles) => {
				console.log(titles);
				var set = new Set(titles);
				titles = Array.from(set);
				store.dispatch(documentActions.setDocumentsTitles(titles));
			})
		}
	}
	render() {
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<Button variant="primary" onClick={this.handleClick}>Apply Filters</Button>
				</div>
				<ListViewComponent
					style={{ marginTop: "15px" }}
					id="list"
					dataSource={this.props.keywordsList}
					showCheckBox={true}
					fields={this.fields}
					ref={scope => {
						this.listobj = scope;
					}}
				/>
			</>
		);
	}
}

export default CheckboxList;