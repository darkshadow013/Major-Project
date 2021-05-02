import React from 'react';
import documentsData from '../../JSON_Data/documentsData.json';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as documentActions from "../../Redux/Action/documentActions";
import store from '../../Redux/Store/store';

class DocumentsList extends React.Component {

    constructor(props) {
        super(props);
        store.subscribe(() => {
            this.setState({ documentsTitles: store.getState().documentReducer.documentsTitles });
        })
    }
    state = {
        documentsData: documentsData,
        documentsTitles: [],
    }
    async componentDidMount() {
        console.log("Document List ");
        await this.setState({ documentsTitles: this.props.documentsTitles });
    }
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                <div style={{ textAlign: "center", fontWeight: "bolder", fontSize: "larger" }}>Documents List</div>
                <div style={{
                    fontWeight: "600",
                    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                    lineHeight: "1.1",
                    color: "#767676"
                }}
                >Showing Results :- {this.props.documentsTitles.length}</div>
                <div style={{ display: "flex", flexDirection: "column", marginTop: "20px", maxHeight: "500px", overflowY: "auto" }}>
                    {this.state.documentsTitles.map((title, idx) => {
                        return (
                            <div style={{ padding: "20px", marginBottom: "10px", paddingBottom: "10px", backgroundColor: "#f4f4f4" }}>
                                <div style={{ color: "#005274", fontSize: "1rem", fontWeight: "500", cursor: "pointer" }}>
                                    <a href={this.state.documentsData[title][2]}>{idx + 1}.  {title}</a>
                                </div>
                                <div style={{ padding: "10px" }}>
                                    <a href={this.state.documentsData[title][0]} className="btn btn-light btn-sm btn-spacer" download="">Bibtex »</a>
                                    <a href={this.state.documentsData[title][1]} className="btn btn-light btn-sm btn-spacer">Metadata »</a>
                                    <a href={this.state.documentsData[title][2]} className="btn btn-light btn-sm btn-spacer">Paper »</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

DocumentsList.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);