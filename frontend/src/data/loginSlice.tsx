import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ILoginState {
	verifier?: string;
	loginUrl?: string;
	auth?: IAuth;
	profile?: IProfile;
}

export interface IAuth {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
}

export interface IProfile {
	id: number;
	images: {
		url: string;
		width: number;
	}[];
	display_name: string;
	followers: {
		total: string;
	};
}

const loginSlice = createSlice({
	name: 'counter',
	initialState: {
		verifier: localStorage.getItem("verifier"),
		auth: JSON.parse(localStorage.getItem("auth") || "{}"),
		profile: JSON.parse(localStorage.getItem("profile") || "{}"),
	} as ILoginState,
	reducers: {
		setVerifier(state, action: PayloadAction<string>) {
			state.verifier = action.payload;
			localStorage.setItem("verifier", action.payload);
		},
		setLoginUrl(state, action: PayloadAction<string>) {
			state.loginUrl = action.payload;
		},
		setProfile(state, action: PayloadAction<IProfile>) {
			state.profile = action.payload;
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		setAuth(state, action: PayloadAction<IAuth>) {
			state.auth = action.payload;
			localStorage.setItem("auth", JSON.stringify(action.payload));
		},
		unsetLogin(state) {
			state.profile = undefined;
			state.auth = undefined;
			localStorage.removeItem("auth");
			localStorage.removeItem("profile");
		}
	},
})

export const { setVerifier, setLoginUrl, setAuth, setProfile, unsetLogin } = loginSlice.actions;
export default loginSlice.reducer;