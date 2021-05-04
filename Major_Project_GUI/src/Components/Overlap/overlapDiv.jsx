import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
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
import { HeatMapComponent, Inject, Legend, Tooltip } from '@syncfusion/ej2-react-heatmap';

class OverlapDiv extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    state = {
        documentsData: documentsData,
        titleToKeywordsData: titleToKeywordsData,
        documentsTitles: [],
        keywordsList: [],
        showError: 0,
        matrixData: [],
        easyTitles: [],
    }
    async calculateDistance(titleA, titleB) {
        var keywordsX = this.state.titleToKeywordsData[titleA];
        var keywordsY = this.state.titleToKeywordsData[titleB];
        var cnt = 0;
        await keywordsX.forEach((key) => {
            if (keywordsY.includes(key)) {
                cnt = cnt + 1
            }
        });
        return cnt;
    }
    async componentDidMount() {

        var keys = [];
        var distanceMatrix = [];
        var easyTitles = [];
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
            console.log(this);
            keys.forEach(async (titleA, index) => {
                easyTitles.push("Doc_" + (index + 1));
                var distanceArray = [];
                await keys.forEach(async (titleB) => {
                    var distance = await this.calculateDistance(titleA, titleB);
                    distanceArray.push(distance);
                });
                distanceMatrix.push(distanceArray);
            })
        }).then(async () => {
            console.log(easyTitles);
            await this.setState({ easyTitles: easyTitles });
            await this.setState({ matrixData: distanceMatrix });
        });
    }
    handleSearch(e) {
        const val = document.getElementById("searchBoxId").value;
        this.setState({ showError: 0 });
        if (val.length === 0) {
            this.setState({ showError: 1 });
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
        const errorDiv = <div style={{ width: "100%", fontSize: "80%", color: "#dc3545" }}>
            Please enter something
		</div>;
        const errorBox = (this.state.showError === 1) ? errorDiv : null;
        const noDocumentsDiv = <section className="jumbotron text-center" style={{ background: "white" }}>
            <div className="container">
                <p className="lead text-muted">No Documents found.</p>
            </div>
        </section>;

        const heatMapDiv = <div style={{ padding: "0px", display: "flex", justifyContent: "center" }}>
            <HeatMapComponent id='heatmap'
                titleSettings={{
                    text: 'Overlapping of Keywords',
                    textStyle: {
                        size: '19px',
                        fontWeight: '500',
                        fontFamily: 'ROBOTO'
                    }
                }}
                xAxis={{ labels: this.state.easyTitles }}
                yAxis={{ labels: this.state.easyTitles }}
                width="800px"
                dataSource={this.state.matrixData}>
                <Inject services={[Legend, Tooltip]} />
            </HeatMapComponent>
        </div>;

        const contentDiv = <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "300px", maxWidth: "50%", padding: "0px 20px" }}>
                <div style={{ textAlign: "center", fontWeight: "500", fontSize: "larger", paddingBottom: "20px" }}>Titles Mapping</div>
                <div style={{ maxHeight: "800px", overflowY: "scroll" }}>
                    <Table striped bordered hover>
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>#</th>
                                <th>Mapped Title</th>
                                <th>Title Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.documentsTitles.map((title, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>Doc_{index + 1}</td>
                                        <td>{title}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Divider orientation="vertical" flexItem />
            {heatMapDiv}
        </div>;
        const heatMapDetailsDiv = (this.state.documentsTitles.length === 0) ? noDocumentsDiv : contentDiv;
        return (
            <>
                <div style={{ maxWidth: "650px", padding: "15px", margin: "auto", marginTop: "40px" }}>
                    <Form.Label><b style={{ fontWeight: "500" }}>Showing Results for :-</b> {searchQuery}</Form.Label>
                    <Form.Group style={{ display: "flex", marginBottom: "0.25rem" }}>
                        <Form.Control required id="searchBoxId" type="text" placeholder="Search Document Here..." onKeyDown={this.handleKeyDown} />
                        <Button variant="light" onClick={this.handleSearch}><SearchIcon /></Button>
                    </Form.Group>
                    {errorBox}
                </div>
                <Divider variant="middle" />
                {heatMapDetailsDiv}
            </>
        );
    }
}

OverlapDiv.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(OverlapDiv);