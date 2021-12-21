import { List, Collapse, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileListItem from "../components/FileListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IosShareIcon from "@mui/icons-material/IosShare";
import ObjectStore from "../utils/indexedDB";
import notice from "../components/functionalToast";
import { useTotalSpeed } from "../hooks";

const Container = styled.div`
	border: 0px solid #505050;
	border-radius: 8px;
	padding: 10px;
	.list-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		& > h3 {
			display: flex;
			align-items: center;
			font-size: 1.1em;
		}
		& > div {
			display: flex;
			align-items: center;
			font-size: 14px;
			& > button {
				display: flex;
				align-items: center;
			}
		}
	}
`;

const FileList: ST.FC<{
	listData: ST.ListItemOption[];
}> = ({ suitContent, listData }) => {
	const { refresh, torrentListTitle, export: exportText } = suitContent;

	const [isOpen, setOpen] = useState<boolean>(false);

	const [openItemSet, setOpenItem] = useState<{ [key: string]: number }>({});

	const speed = useTotalSpeed("upload");

	const handleOpenItem: ST.ListItemOperation["setOpen"] = (key) => {
		if (key in openItemSet) {
			const openItmes = { ...openItemSet };
			delete openItmes[key];
			setOpenItem(openItmes);
		} else {
			const openItmes = { ...openItemSet, [key]: 1 };
			setOpenItem(openItmes);
		}
	};

	const handleDeleteItem: ST.ListItemOperation["deleteItem"] = (key) => {
		console.log(key);
	};

	const renderList = () => {
		const formatListData = listData.map<ST.ListItem>((item) => {
			const { uniqueKey } = item;

			return {
				...item,
				isOpen: uniqueKey in openItemSet,
				operation: {
					setOpen: handleOpenItem,
					deleteItem: handleDeleteItem,
				},
			};
		});

		return formatListData.map((item) => {
			return <FileListItem key={item.uniqueKey} {...item} />;
		});
	};

	const handleOpen = () => {
		setOpen(!isOpen);
	};

	const handleExport = async () => {
		try {
			const list = await ObjectStore.getAllList("share");
			const downloader = document.createElement("a");
			const blob = new Blob([JSON.stringify(list)], { type: "application/json" });
			downloader.setAttribute("href", URL.createObjectURL(blob));
			downloader.download = `torrent_list_${Date.now()}`;
			downloader.click();
		} catch (error) {
			console.log(error);
			notice.error("export fail");
		}
	};
	console.log(speed);

	return (
		<Container>
			<div className="list-header" onClick={handleOpen}>
				<h3>
					{torrentListTitle}
					&nbsp;
					<ArrowForwardIosIcon fontSize="small" className={!isOpen ? "" : "collapse-active-arrow"} />
				</h3>
				<div
					onClick={(e) => {
						e.stopPropagation();
						setOpen(true);
					}}
				>
					<Button>
						<p>{refresh}</p>
						<RefreshIcon style={{ marginTop: "-3px" }} fontSize="small" />
					</Button>
					<Button onClick={handleExport} size="small" variant="contained">
						{exportText}
						<IosShareIcon style={{ marginTop: "-3px" }} fontSize="small" />
					</Button>
				</div>
			</div>
			<Collapse in={isOpen}>
				<List>{renderList()}</List>
			</Collapse>
		</Container>
	);
};

export default FileList;
