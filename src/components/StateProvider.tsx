import React, { createContext, useReducer } from "react";
import { zh } from "../text";
const initialState: ST.GlobalState.ShareState = {
	languageType: zh,
};

export const Context = createContext<{
	state: ST.GlobalState.ShareState;
	dispatch: ST.GlobalState.Dispatch;
}>({ state: initialState, dispatch: () => {} });

const reducer = (state: ST.GlobalState.ShareState, action: ST.GlobalState.Actions): ST.GlobalState.ShareState => {
	const { type } = action;

	switch (type) {
		case "CHANGE_LANGUAGE":
			return { ...state, languageType: action.payload as ST.SuitContent };

		default:
			return state;
	}
};

const StateProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default StateProvider;
