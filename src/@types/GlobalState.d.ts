declare namespace ST {
	declare namespace GlobalState {
		interface ShareState {
			languageType: SuitContent;
			torrentState?: "error" | "done" | "ready";
			shareList: ST.ListItemOption[];
			activeTabIndex: number;
		}

		type ChangeLanguage = { type: "CHANGE_LANGUAGE"; payload: SuitContent };
		type ChangeTorrentState = { type: "CHANGE_TORRENT_STATE"; payload: ShareState["torrentState"] };
		type SetShareList = { type: "SET_SHARE_LIST"; payload: ShareState["shareList"] };
		type TabSwitch = {
			type: "TAB_SWITCH";
			payload: number;
		};

		type Actions = ChangeLanguage | ChangeTorrentState | SetShareList | TabSwitch;

		type Dispatch = React.Dispatch<ChangeLanguage> & React.Dispatch<ChangeTorrentState> & React.Dispatch<SetShareList> & React.Dispatch<TabSwitch>;
	}
}
