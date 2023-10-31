import { GenericLoader } from "./genericLoader";

export const SongLoader = () => {
	const songMap = (item: any) => {
		return { id: item.track.id };
	}
	return <GenericLoader code="songs" label="liked songs" endpoint="/savedtracks" mapper={songMap} />;
};