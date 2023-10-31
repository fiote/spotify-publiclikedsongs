import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IShareState {
	songs: ILoaderSongs;
	playlists: ILoaderPlaylists;
}

export interface ILoader {
	total: number;
	offset: number;
	loaded?: boolean;
	list: any[]
}

export interface ILoaderSongs extends ILoader {
	list: ISong[];
}

export interface ISong {
	id: number;
}

export interface ILoaderPlaylists extends ILoader {
	list: IPlaylist[];
}

export interface IPlaylist {
	id: number;
	name: string;
}

const shareSlice = createSlice({
	name: 'counter',
	initialState: {
		songs: JSON.parse(localStorage.getItem("loader.songs") || "{}"),
		playlists: JSON.parse(localStorage.getItem("loader.playlists") || "{}")
	} as IShareState,
	reducers: {
		updateLoader(state, action: PayloadAction<{ code: string, loader: ILoader }>) {
			const { code, loader } = action.payload;
			loader.loaded = (loader?.total && loader?.offset >= loader?.total) ? true : false;
			(state as any)[code] = loader;
			localStorage.setItem("loader."+code, JSON.stringify(loader));
		}
	},
})

export const { updateLoader } = shareSlice.actions;
export default shareSlice.reducer;