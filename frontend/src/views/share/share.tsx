import { useEffect, useState } from "react";
import { apiGet } from "../../data/api";
import { getLsInt, getLsIntList } from "../tools/ls";
import "./share.css";
import { SongLoader } from "./songLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { PlaylistLoader } from "./playlistLoader";
import { SongsDestination } from "./songsDestination";

export const Share = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState, shareState } = rootState;

	return (
		<div className="ui centered container">
			<SongLoader />
			<PlaylistLoader />
			<SongsDestination />

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