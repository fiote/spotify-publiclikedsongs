import axios from "axios";
import { dotenv } from "../tools/dotenv";
const crypto = require('node:crypto').webcrypto;

export const spotiGet = (url: string, payload: Record<string, any> | null, access_token: string) : Promise<any> => {
	return new Promise((resolve, reject) => {
		const params = new URLSearchParams();

		if (payload) {
			Object.keys(payload).forEach((key) => {
				params.append(key, payload[key]);
			});
		}

		const query = params.toString();

		const options = {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}

		axios.get(url+'?'+query, options).then((result) => {
			resolve(result.data);
		}).catch((err) => {
			const { status, statusText, data } = err.response;
			reject({ status, statusText, data });
		});
	});
}

export const spotiPost = (url: string, payload: Record<string, any>, coreparams: boolean = true) : Promise<SpotifyTokenResponse> => {
	return new Promise((resolve, reject) => {
		const params = new URLSearchParams();

		if (coreparams) {
			payload.client_id = dotenv().SPOTIFY_APP_CLIENTID;
			payload.redirect_uri = dotenv().SPOTIFY_ALL_REDIRECT_URL;
		}

		console.log('payload', payload);

		Object.keys(payload).forEach((key) => {
			params.append(key, payload[key]);
		});

		const options = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}

		axios.post(url, params, options).then((result) => {
			resolve(result.data);
		}).catch((err) => {
			const { status, statusText, data } = err.response;
			reject({ status, statusText, data });
		});
	});
};

export interface SpotifyTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}


export const generateCodeVerifier = (length: number) => {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const generateCodeChallenge = async (codeVerifier: string) => {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}