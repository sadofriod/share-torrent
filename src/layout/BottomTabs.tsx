import { TabsProps, Box, Tabs, Tab } from "@mui/material";
import { indigo } from "@mui/material/colors";
import React from "react";
import { useText, useStore } from "../hooks";
import TabPanenl from "../components/TabPanel";
import FileList from "./FileList";

const BottomTabs = () => {
	const [text] = useText();
	const [{ activeTabIndex, shareList }, dispatch] = useStore();
	const tabProps = (index: number) => ({
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	});
	const handleChange: TabsProps["onChange"] = (event, val) => {
		dispatch({ type: "TAB_SWITCH", payload: val });
	};

	const tabPanelProps = (activeTabIndex: number, index: number) => ({
		...tabProps(index),
		index,
		activeTabIndex,
		"aria-labelledby": `simple-tab-${index}`,
	});

	return (
		<div className="bottom">
			<Box sx={{ border: 1, borderColor: indigo[200], borderRadius: "8px" }}>
				<Tabs indicatorColor="secondary" value={activeTabIndex} onChange={handleChange} textColor="inherit">
					<Tab label={text.shareListTitle} {...tabProps(activeTabIndex)} />
					<Tab label={text.downloadListTitle} {...tabProps(activeTabIndex)} />
				</Tabs>
				<TabPanenl {...tabPanelProps(activeTabIndex, 0)}>
					<FileList listData={shareList} suitContent={text} />
				</TabPanenl>
				<TabPanenl {...tabPanelProps(activeTabIndex, 1)}>{/* <FileList /> */}</TabPanenl>
			</Box>
		</div>
	);
};

export default BottomTabs;
