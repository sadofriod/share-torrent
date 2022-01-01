import { client } from "./createTorrent";
import WebTorrent from "webtorrent";

const downloadTorrent = (torrent: string | Buffer | File, opts?: WebTorrent.TorrentOptions) => {
	client.add(
		torrent,
		{
			announce: ["udp://112.74.165.209:8000", "ws://112.74.165.209:8888", "http://112.74.165.209:8888", "http://112.74.165.209:8888/announce"],
			...opts, //insted of default options
		},
		(torrent) => {
			console.log("trigger");

			torrent.on("infoHash", () => {
				console.log(torrent.infoHash);
			});
			torrent.on("done", () => {
				console.log(torrent.torrentFileBlobURL);
			});
			torrent.on("error", (err) => {
				if (err) console.log(err);
			});
			torrent.on("download", (bytes) => {
				console.log(bytes);
			});
		}
	);
};

export default downloadTorrent;
