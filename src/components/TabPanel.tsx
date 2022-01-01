import React from "react";

const TabPanel: React.FC<Partial<ST.TabPanelProps>> = (props) => {
	const { activeTabIndex, index, children } = props;
	const isHidden = activeTabIndex !== index;
	const formatProps = Object.assign({}, props);
	delete formatProps.activeTabIndex;

	return (
		<div {...formatProps} style={{ visibility: isHidden ? "hidden" : "visible" }}>
			{children}
		</div>
	);
};

export default TabPanel;
