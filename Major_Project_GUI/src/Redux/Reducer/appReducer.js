import * as Constants from '../Constants'
const initialState = {
    completeKeywordsList: [],
    fileNameList: [],
};

function appReducer(state = initialState, action) {
    switch(action.type) {
        case Constants.ADD_KEYWORD_TO_LIST: {
            return Object.assign({}, state, {
                completeKeywordsList: state.completeKeywordsList.concat(action.payload)
            })
        }
        case Constants.ADD_FILENAME_TO_LIST: {
                return Object.assign({}, state, {
                    fileNameList: state.fileNameList.concat(action.payload)
                })
        }
        default:
            return state;
    }
}

export default appReducer;

