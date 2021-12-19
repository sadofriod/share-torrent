import { useContext } from "react";
import { Context } from "../components/StateProvider";
import { en, zh } from "../text";

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
