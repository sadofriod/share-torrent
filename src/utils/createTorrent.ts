import WebTorrent from "webtorrent";
import { getTrackersList } from ".";

// console.log();

getTrackersList().then((data) => console.log(data.split("\n").filter((item) => item)));

export const client = new WebTorrent();

/**
 * Use to upload files
 * @param files Hybrid files list (audio | iamge)
 * @returns template torrent buffer list with file's name and modifiy time
 */
export const createTorrent: STUtils.CreateTorrent = async (sourceFiles) => {
	const isMultiFiles = sourceFiles.length > 1;
	const listItem = await new Promise<STUtils.TempTorrentListItem>((res, rej) => {
		client.seed(sourceFiles, (torrent) => {
			const { files, magnetURI, name, infoHash, torrentFileBlobURL } = torrent;
			const type = isMultiFiles ? "hybrid" : sourceFiles[0].type;
			const names = isMultiFiles ? files.map(({ name }) => name).join(" | ") : name;
			res({
				name: names,
				magnetURI,
				id: infoHash,
				fileUrl: torrentFileBlobURL,
				lastModified: Date.now(),
				type,
			});
		});
		client.on("error", (err) => rej(err));
	});
	return listItem;
};

export const formatTorrentListItem = ({ name, magnetURI, id, lastModified, type, fileUrl }: STUtils.TempTorrentListItem) => {
	const formatType = type?.includes("/") ? type.split("/")[0] : type;
	return {
		name: name as string,
		lastModified: lastModified as number,
		uniqueKey: id,
		fileType: formatType as ST.ListItemOption["fileType"],
		magnetURI,
		author: (window as any).author || "anyomus",
		fileUrl,
	};
};

export const formatTorrentList: STUtils.FormatTorrentList = (files) => {
	return files.map(formatTorrentListItem);
};
