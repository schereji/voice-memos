import {getMemos, createMemo } from "../lib/memoServices";

const initState = {
	memos: [],
	currentUrl: '',
};

const CURRENT_URL_UPDATE = "CURRENT_URL_UPDATE";
const MEMO_ADD = "MEMO_ADD";
const MEMOS_LOAD = "MEMOS_LOAD";

export const updateCurrentUrl = (url) => ({type: CURRENT_URL_UPDATE, payload: url});

export const loadMemos = (memos) => ({type: MEMOS_LOAD, payload: memos});
export const fetchMemos = () => {
	return (dispatch) => {
		getMemos()
			.then(memos => dispatch(loadMemos(memos)));
	}
};

export const addMemo = (memo) => ({type: MEMO_ADD, payload: memo});
export const saveMemo = ({description, audioUrl}) => {
	return (dispatch) => {
		createMemo(description, audioUrl)
			.then((res) => dispatch(addMemo(res)));
	}
};

export default (state = initState, action) => {
	switch (action.type) {
		case MEMO_ADD:
			return {...state, memos: state.memos.concat(action.payload)};
		case CURRENT_URL_UPDATE:
			return {...state, currentUrl: action.payload};
		case MEMOS_LOAD:
			return {...state, memos: action.payload};
		default:
			return state;
	}
	
}
