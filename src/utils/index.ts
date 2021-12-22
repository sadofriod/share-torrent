const trackerURL = "https://ngosang.github.io/trackerslist/trackers_best.txt";

export const getTrackersList = async () => {
	return await (await fetch(trackerURL)).text();
};
