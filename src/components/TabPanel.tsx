import React from "react";

const TabPanel: React.FC<Partial<ST.TabPanelProps>> = (props) => {
	const { activeIndex, index, children } = props;
	const isHidden = activeIndex !== index;
	const formatProps = Object.assign({}, props);
	delete formatProps.activeIndex;

	return (
		<div {...formatProps} style={{ visibility: isHidden ? "hidden" : "visible" }}>
			{children}
		</div>
	);
};

export default TabPanel;
