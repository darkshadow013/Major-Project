import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import * as documentActions from "../../Redux/Action/documentActions";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import titleToKeywordsData from '../../JSON_Data/titleToKeywordsMap.json';
class TwoDocumentOverlap extends React.Component {
    constructor(props) {
        super(props);
        this.ddl1 = null;
        this.ddl2 = null;
        this.handleClick = this.handleClick.bind(this);
    }
    state = {
        titleToKeywordsData: titleToKeywordsData,
        commonKeys: [],
        showOverlappedKeywords: false,
    }
    async calculateDistance(titleA, titleB) {
        var keywordsX = this.state.titleToKeywordsData[titleA];
        var keywordsY = this.state.titleToKeywordsData[titleB];
        var cnt = 0;
        var arr = [];
        await keywordsX.forEach((key) => {
            if (keywordsY.includes(key)) {
                cnt = cnt + 1
                arr.push(key);
            }
        });
        return [cnt, arr];
    }
    async handleClick(e) {
        const title1 = this.ddl1.itemData;
        const title2 = this.ddl2.itemData;
        if (typeof title1 === "undefined" || typeof title2 === "undefined") {
            console.log("Select documents");
        } else {
            const res = await this.calculateDistance(title1, title2);
            const commonKeys = res[1];
            await this.setState({ commonKeys: commonKeys });
            await this.setState({ showOverlappedKeywords: true });
        }
    }
    render() {
        const overlappedKeywordsDiv = <div>
            <div>
                <b style={{ fontWeight: "500" }}>Overlapping Keywords :-</b> {this.state.commonKeys.length}
                <div>
                    {this.state.commonKeys.map((title, index) => {
                        return (
                            <li>{title}</li>
                        );
                    })}
                </div>
            </div>
        </div>;
        const showOverlappedDiv = (this.state.showOverlappedKeywords === true) ? overlappedKeywordsDiv : null;
        return (
            <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                <div>
                    <div style={{ textAlign: "center", fontWeight: "500", fontSize: "larger" }}>Overlapping of documents</div>
                    <div style={{ textAlign: "center", fontSize: "small" }}><a href="/overlap">(Click here for more detailed overlapping analysis)</a></div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", height: "100px", overflowY: "auto" }}>
                    <div style={{ width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <DropDownListComponent
                            id="ddlelement"
                            dataSource={this.props.documentsTitles}
                            popupHeight="200px"
                            placeholder="Select Document 1"
                            ref={scope => {
                                this.ddl1 = scope;
                            }} />

                        <DropDownListComponent
                            id="ddlelement"
                            dataSource={this.props.documentsTitles}
                            popupHeight="200px"
                            placeholder="Select Document 2"
                            ref={scope => {
                                this.ddl2 = scope;
                            }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "400px" }}>
                        <div style={{ textAlign: "center" }}>
                            <Button variant="primary" onClick={this.handleClick}>Find Overlapping</Button>
                        </div>
                    </div>
                    {showOverlappedDiv}
                </div>
            </div>
        );
    }
}

TwoDocumentOverlap.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TwoDocumentOverlap);