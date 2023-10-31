import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { useEffect, useRef, useState } from "react";
import { Search, SearchProps } from "semantic-ui-react";

export const SongsDestination = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState, shareState } = rootState;

	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any[]>([]);
	const [value, setValue] = useState('');

	const handleSearchChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
		const value = data.value || '';

		setValue(value);

		const query = value.toLowerCase();
		if (!query) return setResults([]);

		const found = shareState.playlists.list.filter(playlist => {
			const name = playlist.name.toLowerCase();
			return name.includes(query);
		}).map(playlist => {
			return {
				title: playlist.name,
				description: playlist.id
			}
		});

		setResults(found.slice(0, 5));
	}

	const handleSearchPick = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
		console.log(data);
		setValue(data.result.title);
	}

	if (!shareState.songs.loaded || !shareState.playlists.loaded) {
		return null;
	}

	return <>
		<h3>Songs Destination</h3>

		<div className="ui placeholder segment">
			<div className="ui two column stackable center aligned grid">
				<div className="ui vertical divider">Or</div>
				<div className="middle aligned row">
					<div className="column">
						<h5 className="ui icon header">
							<i className="icons">
								<i className="music icon"></i>
								<i className="bottom right corner add icon"></i>
							</i>
							New Playlist
						</h5>
						<div className="ui primary button">
							Create
						</div>
					</div>
					<div className="column">
						<h5 className="ui icon header">
							<i className="search icon"></i>
							Existing Playlist
						</h5>
						<div className="field">
							<Search
							loading={loading}
							placeholder='Search playlist...'
							onResultSelect={handleSearchPick}
							onSearchChange={handleSearchChange}
							results={results}
							value={value}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}