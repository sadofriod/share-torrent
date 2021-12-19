import React from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";
import ReactDOM from "react-dom";

const Toast: React.FC<ST.ToastProps<AlertColor>> = ({ message, alertType, open }) => {
	const content = message || "nothing to show";

	const [isOpen, setOpen] = useState<boolean>(open);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={alertType}>
				{content}
			</Alert>
		</Snackbar>
	);
};

const commonNotice: ST.CommonNotice<AlertColor> = (type, message) => {
	const container = document.createElement("div");
	document.body.append(container);
	ReactDOM.render(<Toast alertType={type} message={message} open={true} />, container);
	return;
};

const notice: ST.NoticeModule = {
	error: (message) => commonNotice("error", message),
	warning: (message) => commonNotice("warning", message),
	info: (message) => commonNotice("info", message),
	success: (message) => commonNotice("success", message),
};

export default notice;
