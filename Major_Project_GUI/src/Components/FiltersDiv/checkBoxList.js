import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import store from '../../Redux/Store/store';
import * as documentActions from '../../Redux/Action/documentActions';
import { Button } from 'react-bootstrap';
import keywordToTitlesMap from '../../JSON_Data/keywordToTitlesMap.json';

class CheckboxList extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	state = {
		checked: [],
	}
	handleClick(e) {
		var titles = [];
		var checked = this.state.checked;
		let promise = new Promise(function (resolve, reject) {

			store.dispatch(documentActions.setSelectedKeywordsList(checked));
			checked.map((keyword) => {
				keywordToTitlesMap[keyword].map((title) => {
					titles = titles.concat(title);
				});
			});

			resolve(titles);
		})
		promise.then((titles) => {
			var set = new Set(titles);
			titles = Array.from(set);
			console.log(titles);
			store.dispatch(documentActions.setDocumentsTitles(titles));
			
		})
	}
	handleToggle(e) {
		const value = e.target.textContent;
		if (value.length !== 0) {
			const currentIndex = this.state.checked.indexOf(value);
			const newChecked = [...this.state.checked];

			if (currentIndex === -1) {
				newChecked.push(value);
			} else {
				newChecked.splice(currentIndex, 1);
			}
			this.setState({ checked: newChecked });
		}
	};

	render() {
		const keywordsList = this.props.keywordsList;
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<Button variant="primary" onClick={this.handleClick}>Apply Filters</Button>
				</div>
				<List style={{ width: "100%", maxWidth: "350px", backgroundColor: "#fff" }}>
					{keywordsList.map((value, idx) => {
						const labelId = `checkbox-list-label-${idx}`;
						return (
							<ListItem key={idx} role={undefined} dense button onClick={this.handleToggle}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={this.state.checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
										value={value}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={value} />
							</ListItem>
						);
					})}
				</List>
			</>
		);
	}
}

export default CheckboxList;