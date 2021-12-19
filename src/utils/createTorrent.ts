import WebTorrent from "webtorrent";

const client = new WebTorrent();

/**
 * Use to upload files
 * @param files Hybrid files list (audio | iamge)
 * @returns template torrent buffer list with file's name and modifiy time
 */
export const createTorrent: STUtils.CreateTorrent = async (sourceFiles) => {
	const isMultiFiles = sourceFiles.length > 1;
	const listItem = await new Promise<STUtils.TempTorrentListItem>((res, rej) => {
		client.seed(sourceFiles, (torrent) => {
			const { files, magnetURI, name, infoHash } = torrent;
			const type = isMultiFiles ? "hybrid" : sourceFiles[0].type;
			const names = isMultiFiles ? files.map(({ name }) => name).join(" | ") : name;
			res({
				name: names,
				magnetURI,
				id: infoHash,
				lastModified: Date.now(),
				type,
			});
		});
		client.on("error", (err) => rej(err));
	});
	return listItem;
};

export const formatTorrentListItem = ({ name, magnetURI, id, lastModified, type }: STUtils.TempTorrentListItem) => {
	const formatType = type?.includes("/") ? type.split("/")[0] : type;
	return {
		name: name as string,
		lastModified: lastModified as number,
		uniqueKey: id,
		fileType: formatType as ST.ListItemOption["fileType"],
		magnetURI,
		author: (window as any).author || "anyomus",
	};
};

export const formatTorrentList: STUtils.FormatTorrentList = (files) => {
	return files.map(formatTorrentListItem);
};
