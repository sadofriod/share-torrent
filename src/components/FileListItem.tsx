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
		flex: 3;
	}
	.author {
		flex: 1;
	}
`;

const FileListItem: React.FC<ST.ListItem> = ({ fileType, name, lastModified, author, operation, uniqueKey, isOpen }) => {
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
	console.log(uniqueKey, isOpen);

	return (
		<>
			<ListItem
				disablePadding
				secondaryAction={
					<>
						<IconButton edge="end" onClick={() => deleteItem(uniqueKey)}>
							<DeleteForeverIcon />
						</IconButton>
						<IconButton edge="end">
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
					<div className="author">{author}</div>
					<div className="content">{day(lastModified).format("DD/MM/YYYY")}</div>
				</FileInformation>
			</Collapse>
			<Divider />
		</>
	);
};

export default FileListItem;
