import * as Constants from '../Constants';
import {makeActionCreator} from '../Store/store';


export const setDocumentsTitlesAll = (payload) => makeActionCreator(Constants.SET_DOCUMENTS_TITLES_ALL, payload);
export const setDocumentsTitles = (payload) => makeActionCreator(Constants.SET_DOCUMENTS_TITLES, payload);
export const setKeywordsList = (payload) => makeActionCreator(Constants.SET_KEYWORDS_LIST, payload);
export const setSelectedKeywordsList = (payload) => makeActionCreator(Constants.SET_SELECTED_KEYWORDS_LIST, payload);
