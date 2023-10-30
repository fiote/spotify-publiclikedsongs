import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { GenericLoader } from "./genericLoader";

export const SongLoader = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { shareState } = rootState;

	const songMap = (item: any) => {
		return { id: item.track.id };
	}

	return <GenericLoader label="liked songs" loader={shareState.songs} endpoint="/savedtracks" mapper={songMap} />;
};