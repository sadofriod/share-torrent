import { useContext, useEffect, useState } from "react";
import { Context } from "../components/StateProvider";
import { en, zh } from "../text";
import { client } from "../utils/createTorrent";

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

export const useTotalSpeed = (type: "download" | "upload") => {
	const [speed, setSpeed] = useState<number>(0);
	const timer = setInterval(() => {
		setSpeed(type === "download" ? client.downloadSpeed : client.uploadSpeed);
	}, 1000);

	useEffect(() => {
		return () => {
			clearInterval(timer);
		};
	}, []); //eslint-disable-line

	return speed;
};
