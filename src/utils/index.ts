import { createTorrent } from "./createTorrent";

const trackerURL = "https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_ws.txt";

export const getTrackersList = async () => {
	return await (await fetch(trackerURL)).text();
};

export { createTorrent };
