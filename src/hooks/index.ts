import { useContext } from "react";
import { Context } from "../components/StateProvider";
import { en, zh } from "../text";
// import { client } from "../utils/createTorrent";

export const useText = (): [ST.SuitContent, (type: ST.LanguageType) => void] => {
	const { state, dispatch } = useContext(Context);
	const change = (type: ST.LanguageType) => {
		switch (type) {
			case "EN":
				dispatch({
					type: "CHANGE_LANGUAGE",
					payload: en,
				});
				break;
			default:
				dispatch({
					type: "CHANGE_LANGUAGE",
					payload: zh,
				});
		}
	};
	return [state.languageType, change];
};

export const useStore = (): [ST.GlobalState.ShareState, ST.GlobalState.Dispatch] => {
	const { state, dispatch } = useContext(Context);
	return [state, dispatch];
};
