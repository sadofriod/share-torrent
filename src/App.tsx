import React, { useCallback, useEffect } from "react";
import "./App.css";
import { IconButton, Typography } from "@mui/material";
import ObjectStore from "./utils/indexedDB";
import { useStore, useText } from "./hooks";
import TranslateIcon from "@mui/icons-material/Translate";
import AppContainer from "./style";
import Mid from "./layout/Mid";
import BottomTabs from "./layout/BottomTabs";

const App: React.FC = () => {
	const [text, changeLanguage] = useText();

	const [, dispatch] = useStore();

	const initTorrentList = useCallback(async () => {
		const list = await ObjectStore.getAllList("share");
		dispatch({ type: "SET_SHARE_LIST", payload: list });
	}, [dispatch]);

	useEffect(() => {
		initTorrentList();
	}, [initTorrentList]);

	const handleLanguageChange = () => {
		return text.languageType === "EN" ? changeLanguage("EN") : changeLanguage("ZH");
	};
	return (
		<AppContainer>
			<div className="header">
				<Typography dangerouslySetInnerHTML={{ __html: text.appTitle }} variant="h2" className="headerTitle" component="h2">
					{/* <h1 dangerouslySetInnerHTML></h1> */}
				</Typography>
				<div>
					<IconButton onClick={handleLanguageChange}>
						<TranslateIcon />
					</IconButton>
				</div>
			</div>
			<Mid />
			<BottomTabs />
		</AppContainer>
	);
};

export default App;
