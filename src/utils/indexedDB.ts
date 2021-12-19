import { IDBPDatabase, openDB } from "idb";

const SHARE_TORRENT = "SHARE_TORRENT";

const SHARE_LIST = "SHARE_LIST";
const DOWNLOAD_LIST = "DOWNLOAD_LIST";

class Torrent {
	db: Promise<IDBPDatabase>;

	constructor() {
		const db = openDB(SHARE_TORRENT, 1, {
			upgrade(db) {
				db.createObjectStore(SHARE_LIST, {
					keyPath: "uniqueKey",
					autoIncrement: false,
				});

				db.createObjectStore(DOWNLOAD_LIST, {
					keyPath: "uniqueKey",
					autoIncrement: false,
				});
			},
		});
		this.db = db;
	}

	init = async (list: ST.ListItemOption[]) => {
		const db = await this.db;
		for await (const listItem of list) {
			await db.add(SHARE_LIST, listItem);
		}
	};

	getAllList = async (type: "share" | "download") => {
		const storeName = type === "share" ? SHARE_LIST : DOWNLOAD_LIST;
		const db = await this.db;
		return await db.getAll(storeName);
	};

	deleteListItem = async (type: "share" | "download", key: string) => {
		const storeName = type === "share" ? SHARE_LIST : DOWNLOAD_LIST;
		const db = await this.db;
		const keyRange = IDBKeyRange.only(key);
		await db.delete(storeName, keyRange);
	};

	multiDeleteListItem = async (type: "share" | "download", keys: string[]) => {
		for await (const key of keys) {
			await this.deleteListItem(type, key);
		}
	};

	addListItem = async (type: "share" | "download", listItem: ST.ListItemOption) => {
		const storeName = type === "share" ? SHARE_LIST : DOWNLOAD_LIST;
		const db = await this.db;
		await db.add(storeName, listItem);
	};
}

export default new Torrent();
