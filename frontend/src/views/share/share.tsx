import { useEffect, useState } from "react";
import { apiGet } from "../../data/api";
import { getLsInt, getLsIntList } from "../tools/ls";
import "./share.css";
import { SongLoader } from "./songLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { redirect } from "react-router-dom";

export const Share = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const [songsOffset, setSongsOffset] = useState(getLsInt("songs.offset"));
	const [songsTotal, setSongsTotal] = useState(getLsInt("songs.total"));
	const [songs, setSongs] = useState(getLsIntList("songs.songs"));

	useEffect(() => {
		const access_token = JSON.parse(localStorage.getItem("auth") || "{}")?.access_token;
		console.log({ offset: songsOffset, total: songsTotal });

		if (songsTotal && songsOffset >= songsTotal) return;

		apiGet<SavedTracksResponse>("/savedtracks", { offset: songsOffset, access_token }).then(feed => {
			console.log('got feed', feed);
			if (!feed) return;
			if (!feed.items) return;

			const newdata = feed.items.map(item => item.track.id);
			const newsongs = [...songs, ...newdata];
			const newoffset = feed.items.length + feed.offset;
			const newtotal = feed.total;

			setSongsOffset(newoffset); localStorage.setItem("songs.offset", newoffset.toString());
			setSongsTotal(newtotal); localStorage.setItem("songs.total", newtotal.toString());
			setSongs(newsongs); localStorage.setItem("songs.songs", JSON.stringify(newsongs));
		});
	}, [songs, songsOffset, songsTotal]);

	const prSongsDone = songsTotal ? (songsOffset / songsTotal * 100) : 0;
	const prSongsWidth = prSongsDone.toFixed(0) + "%";

	const songsDone = prSongsDone >= 100 ? "Done!" : "";

	const [playlistsOffset, setPlaylistsOffset] = useState(getLsInt("playlists.offset"));
	const [playlistsTotal, setPlaylistsTotal] = useState(getLsInt("playlists.total"));
	const [playlists, setPlaylists] = useState(getLsIntList("playlists.playlists"));

	useEffect(() => {
		const access_token = JSON.parse(localStorage.getItem("auth") || "{}")?.access_token;
		console.log({ offset: playlistsOffset, total: playlistsTotal });

		if (playlistsTotal && playlistsOffset >= playlistsTotal) return;

		apiGet<PlaylistsResponse>("/playlists", { offset: playlistsOffset, access_token }).then(feed => {
			console.log('got feed', feed);
			if (!feed) return;
			const newdata = feed.items.map(item => ({id: item.id, name: item.name}));
			const newplaylists = [...playlists, ...newdata];
			const newoffset = feed.items.length + feed.offset;
			const newtotal = feed.total;;

			setPlaylistsOffset(newoffset); localStorage.setItem("playlists.offset", newoffset.toString());
			setPlaylistsTotal(newtotal); localStorage.setItem("playlists.total", newtotal.toString());
			setPlaylists(newplaylists); localStorage.setItem("playlists.playlists", JSON.stringify(newplaylists));
		});
	}, [playlists, playlistsOffset, playlistsTotal]);

	const prPlaylistsDone = playlistsTotal ? (playlistsOffset / playlistsTotal * 100) : 0;
	const prPlaylistsWidth = prPlaylistsDone.toFixed(0) + "%";
	const playlistsDone = prPlaylistsDone >= 100 ? "Done!" : "";

	if (!loginState.profile?.id) {
		window.location.href = "/";
		return null;
	}

	return (
		<div className="ui centered container">
			<SongLoader />

			<h3>Loading liked songs... {songsDone}</h3>
			<div className="ui indicating progress" data-percent={prSongsDone}>
				<div className="bar" style={{ width: prSongsWidth }}></div>
				<div className="label">{songsOffset} / {songsTotal} ({prSongsWidth})</div>
			</div>

			<h3>Loading user playlists... {playlistsDone}</h3>
			<div className="ui indicating progress" data-percent={prPlaylistsDone}>
				<div className="bar" style={{ width: prPlaylistsWidth }}></div>
				<div className="label">{playlistsOffset} / {playlistsTotal} ({prPlaylistsWidth})</div>
			</div>

			<h3>Playlist Destination</h3>

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
								<div className="ui search">
									<div className="ui icon input">
										<input className="prompt" type="text" placeholder="Search countries..." />
										<i className="search icon"></i>
									</div>
									<div className="results"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
};

interface SavedTracksResponse {
	href: string;
	items: SavedTrack[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
}

interface SavedTrack {
	added_at: string;
	track: Track;
}

interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface ExternalUrls {
	spotify: string;
}

interface Image {
	height: number;
	url: string;
	width: number;
}

interface ExternalIDS {
	isrc: string;
}

interface PlaylistsResponse {
	href: string;
	items: Playlist[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
}

interface Playlist {
	collaborative: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	primary_color?: any;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

interface Tracks {
	href: string;
	total: number;
}

interface Owner {
	display_name: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	type: string;
	uri: string;
}