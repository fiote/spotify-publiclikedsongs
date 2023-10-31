import { GenericLoader } from "./genericLoader";

export const PlaylistLoader = () => {
	const playlistMap = (item: any) => {
		return { id: item.id, name: item.name };
	}
	return <GenericLoader code="playlists" label="user playlists" endpoint="/playlists" mapper={playlistMap} />;
};