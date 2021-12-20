import React from "react";
import { Collapse, ListItem, ListItemText, ListItemButton, Divider, IconButton, Avatar, ListItemAvatar } from "@mui/material";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCallback } from "react";
import styled from "styled-components";
import day from "dayjs";
import { useText } from "../hooks";
import notice from "./functionalToast";

const FileInformation = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	.author,
	.content {
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.content {
		flex: 2;
	}
	.author {
		padding-left: 20px;
		flex: 1;
	}
`;

const FileListItem: React.FC<ST.ListItem> = ({ fileType, name, lastModified, author, operation, uniqueKey, isOpen, magnetURI }) => {
	const [{ authorLabel, timeLabel }] = useText();

	const FileType = useCallback(() => {
		switch (fileType) {
			case "audio":
				return <AudioFileIcon />;
			case "image":
				return <PhotoSizeSelectActualIcon />;
			default:
				return <InsertDriveFileIcon />;
		}
	}, [fileType]);

	const { setOpen, deleteItem } = operation;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(magnetURI);
			notice.success("Copy success");
		} catch (error) {
			console.log(error);
			notice.error("Copy fail: " + error.message);
		}
	};

	return (
		<>
			<ListItem
				disablePadding
				secondaryAction={
					<>
						<IconButton edge="end" onClick={() => deleteItem(uniqueKey)}>
							<DeleteForeverIcon />
						</IconButton>
						<IconButton onClick={handleCopy} edge="end">
							<ContentCopyIcon />
						</IconButton>
					</>
				}
			>
				<ListItemButton onClick={() => setOpen(uniqueKey)}>
					<ListItemAvatar>
						<Avatar>{FileType()}</Avatar>
					</ListItemAvatar>

					<ListItemText
						primary={name}
						primaryTypographyProps={{
							className: "single-line",
						}}
					/>
				</ListItemButton>
			</ListItem>
			<Collapse in={isOpen}>
				<FileInformation>
					<div className="author">{`${authorLabel}: ${author}`}</div>
					<div className="content">{`${timeLabel}: ${day(lastModified).format("DD/MM/YYYY")}`}</div>
				</FileInformation>
			</Collapse>
			<Divider />
		</>
	);
};

export default FileListItem;
