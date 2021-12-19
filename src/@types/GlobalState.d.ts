declare namespace ST {
	declare namespace GlobalState {
		interface ShareState {
			languageType: SuitContent;
			torrentState?: "error" | "done" | "ready";
		}

		type ActionType = "CHANGE_LANGUAGE" | "CHANGE_TORRENT_SAT";
		type Actions = { type: "CHANGE_LANGUAGE"; payload: SuitContent } | { type: "CHANGE_TORRENT_STATE"; payload: ShareState["torrentState"] };
		type Dispatch = React.Dispatch<{ type: "CHANGE_LANGUAGE"; payload: SuitContent }> & React.Dispatch<{ type: "CHANGE_TORRENT_STATE"; payload: ShareState["torrentState"] }>;
	}
}
