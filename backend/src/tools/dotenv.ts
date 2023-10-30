const config = require('dotenv').config();

export const dotenv = () : IDotenv => {
	return config.parsed;
}

export interface IDotenv {
	SPOTIFY_APP_CLIENTID: string;
	SPOTIFY_ALL_REDIRECT_URL: string;
};