import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IShareState {
	songs: ILoaderSongs;
	playlists: ILoaderPlaylists;
}

export interface ILoader {
	total: number;
	offset: number;
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

	} as IShareState,
	reducers: {

	},
})

export const {  } = shareSlice.actions
export default shareSlice.reducer;