import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import notice from "../components/functionalToast";
import { formatTorrentListItem } from "../utils/createTorrent";
import { useStore, useText } from "../hooks";
import { createTorrent } from "../utils";
import ObjectStore from "../utils/indexedDB";
import downloadTorrent from "../utils/downloadTorrent";

const Mid: React.FC = () => {
	const [text] = useText();
	const [fileState, setFilestate] = useState<string>(text.noFile);
	const [magnetURI, setMagnetURI] = useState("");
	const [{ shareList, activeTabIndex }, dispatch] = useStore();
	// const { shareList } = store;
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
			dispatch({ type: "SET_SHARE_LIST", payload: [...shareList, item] });
		} catch (error) {
			setFilestate(text.uploadFailure);
			notice.error("Create torrent fail");
			console.log(error);
		}
	};

	const handleTorrentDownload = () => {
		if (magnetURI) {
			downloadTorrent(magnetURI);
		}
	};

	const renderFileOperation = () => {
		return (
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
			</div>
		);
	};

	const renderAddNewDownload = () => {
		return (
			<div className="fileOperation">
				<div className="content">
					<Input onBlur={(e) => setMagnetURI(e.target.value)} fullWidth={true} placeholder={text.downloadPlaceHolder} />
				</div>
				<div className="uploadFileContainer">
					<Button variant="contained" style={{ position: "relative", zIndex: 0 }} onClick={handleTorrentDownload}>
						{text.download}
					</Button>
				</div>
			</div>
		);
	};

	return <div className="mid">{activeTabIndex === 0 ? renderFileOperation() : renderAddNewDownload()}</div>;
};

export default Mid;
