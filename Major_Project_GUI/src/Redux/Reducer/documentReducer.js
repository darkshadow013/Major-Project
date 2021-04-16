import * as Constants from '../Constants'
const initialState = {
    documentsTitlesAll: [],
    documentsTitles: [],
    selectedKeywordsList: [],
    keywordsList: [],
};

function documentReducer(state = initialState, action) {
    switch(action.type) {
        case Constants.SET_DOCUMENTS_TITLES_ALL: {
            return Object.assign({}, state, {
                documentsTitlesAll: action.payload
            })
        }
        case Constants.SET_DOCUMENTS_TITLES: {
                return Object.assign({}, state, {
                    documentsTitles: action.payload
                })
        }
        case Constants.SET_KEYWORDS_LIST: {
            return Object.assign({}, state, {
                keywordsList: action.payload
            })
        }  
        case Constants.SET_SELECTED_KEYWORDS_LIST: {
            return Object.assign({}, state, {
                selectedKeywordsList: action.payload
            })
        }  
        default:
            return state;
    }
}

export default documentReducer;

