declare namespace ST {
	interface ListItemOperation {
		deleteItem(key: string): void;
		setOpen(key: string): void;
	}

	interface ListItem extends ListItemOption {
		//List item operations set
		operation: ListItemOperation;
		isOpen: boolean;
	}

	interface ListItemOption {
		name: string;
		lastModified: number;
		author: string;
		fileType: "image" | "audio" | "hybrid";

		//Torrent ID
		uniqueKey: string;
		magnetURI: string;
	}

	type LanguageType = "EN" | "ZH";

	interface SuitContent {
		refresh: string;
		torrentListTitle: stirng;
		appTitle: string;
		upload: string;
		noFile: string;
		multiFiles: string;
		processing: string;
		uploadSuccessful: string;
		uploadFailure: string;
		shareListTitle: string;
		downloadListTitle: string;
		authorLabel: string;
		timeLabel: string;
		languageType: string;
	}

	type FileChoosenTips = "noFile" | "uploadSuccessful" | "uploadFailure" | "processing" | "multiFiles";

	interface ExtensionCommonProps {
		suitContent: SuitContent;
	}

	interface FC<T = {}> extends React.FC<ExtensionCommonProps & T> {}

	interface ToastOption<T> {
		message?: string;
		alertType: T;
	}

	type CommonNotice<T> = (type: T, mesaage: ToastOption<T>["message"]) => void;

	type CommonNoticeModuleProp = (message?: string) => void;

	interface NoticeModule {
		error: CommonNoticeModuleProp;
		warning: CommonNoticeModuleProp;
		info: CommonNoticeModuleProp;
		success: CommonNoticeModuleProp;
	}

	interface ToastProps<T> extends ToastOption<T> {
		open: true; //It's show when call function to render compoent
	}

	interface ExtensionFileInput extends HTMLInputElement {
		files: FileList;
	}

	interface TabPanelProps<T = {}> extends T {
		activeIndex: number;
		id: string;
		index: number;
		"aria-labelledby": string;
	}
}

declare namespace STUtils {
	interface TempTorrentListItem extends Partial<File> {
		magnetURI: string;
		id: string;
	}

	interface CreateTorrent {
		(files: FileList): Promise<TempTorrentListItem>;
	}

	interface FormatTorrentList {
		(files: TempTorrentListItem[]): ST.ListItemOption[];
	}
}
