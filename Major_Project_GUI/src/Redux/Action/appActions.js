import * as Constants from '../Constants';
import {makeActionCreator, store} from '../Store/store';


export const addKeywordToList = (payload) => makeActionCreator(Constants.ADD_KEYWORD_TO_LIST, payload);
export const addFileNameToList = (payload) => makeActionCreator(Constants.ADD_FILENAME_TO_LIST, payload);