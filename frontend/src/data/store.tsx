import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import shareSlice from './shareSlice';

const store = configureStore({
	reducer: {
		loginState: loginSlice,
		shareState: shareSlice
	},
})

export type RootState = ReturnType<typeof store.getState>;

export default store;