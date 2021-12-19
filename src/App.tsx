import React, { useCallback, useEffect } from "react";
import "./App.css";
import FileList from "./components/FileList";
import { Box, Button, IconButton, Tab, Tabs, TabsProps } from "@mui/material";
import { useState } from "react";
import notice from "./components/functionalToast";
import { createTorrent, formatTorrentListItem } from "./utils/createTorrent";
import TabPanenl from "./components/TabPanel";
import ObjectStore from "./utils/indexedDB";
import { useText } from "./hooks";
import TranslateIcon from "@mui/icons-material/Translate";
import AppContainer from "./style";
import { indigo } from "@mui/material/colors";

const App: React.FC = () => {
	const [text, changeLanguage] = useText();
	const [fileState, setFilestate] = useState<string>(text.noFile);

	const [tempTorrentList, setTempTorrentList] = useState<ST.ListItemOption[]>([]);

	const [activeIndex, setActiveIndex] = useState<number>(0);

	const tabProps = (index: number) => ({
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	});

	const initTorrentList = useCallback(async () => {
		const list = await ObjectStore.getAllList("share");
		setTempTorrentList(list);
	}, []);

	useEffect(() => {
		initTorrentList();
	}, [initTorrentList]);

	const handleUpload: React.ChangeEventHandler<ST.ExtensionFileInput> = async (e) => {
		try {
			if (!e) {
				notice.error("File choosen fail");
				setFilestate("noFile");
			}
			notice.info("Processing.....");
			setFilestate(text.processing);
			const { files } = e.target as ST.ExtensionFileInput;
			const tempTorrentListItem = await createTorrent(files);
			const item = formatTorrentListItem(tempTorrentListItem);
			ObjectStore.addListItem("share", item);
			setFilestate(item.name);
			setTempTorrentList([...tempTorrentList, item]);
		} catch (error) {
			setFilestate(text.uploadFailure);
			notice.error("Create torrent fail");
			console.log(error);
		}
	};

	const handleChange: TabsProps["onChange"] = (event, val) => {
		setActiveIndex(val);
	};

	const tabPanelProps = (activeIndex: number, index: number) => ({
		...tabProps(index),
		index,
		activeIndex,
		"aria-labelledby": `simple-tab-${index}`,
	});

	const handleLanguageChange = () => {
		return text.languageType === "EN" ? changeLanguage("EN") : changeLanguage("ZH");
	};
	return (
		<AppContainer>
			<div className="header">
				<h1 dangerouslySetInnerHTML={{ __html: text.appTitle }}></h1>
				<div>
					<IconButton onClick={handleLanguageChange}>
						<TranslateIcon />
					</IconButton>
				</div>
			</div>
			<div className="mid">
				<div className="fileOperation">
					<div className="content">
						<Button variant="outlined" style={{ width: "100%", justifyContent: "flex-start", textAlign: "left" }}>
							{fileState}
						</Button>
					</div>
					<div className="uploadFileContainer">
						<Button variant="contained" style={{ position: "relative", zIndex: 0 }}>
							<input type="file" multiple={true} onChange={handleUpload} className="fileChooser" />
							{text.upload}
						</Button>
					</div>
					<div></div>
				</div>
			</div>
			<div className="bottom">
				<Box sx={{ border: 1, borderColor: indigo[200], borderRadius: "8px" }}>
					<Tabs indicatorColor="secondary" value={activeIndex} onChange={handleChange} textColor="inherit">
						<Tab label={text.shareListTitle} {...tabProps(activeIndex)} />
						<Tab label={text.downloadListTitle} {...tabProps(activeIndex)} />
					</Tabs>
					<TabPanenl {...tabPanelProps(activeIndex, 0)}>
						<FileList listData={tempTorrentList} suitContent={text} />
					</TabPanenl>
					<TabPanenl {...tabPanelProps(activeIndex, 1)}>{/* <FileList /> */}</TabPanenl>
				</Box>
			</div>
		</AppContainer>
	);
};

export default App;
