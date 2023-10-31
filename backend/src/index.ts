// src/index.ts
import express from 'express';
import cors from 'cors';
import { generateCodeChallenge, generateCodeVerifier, spotiGet, spotiPost } from './apis/spotify';
import { dotenv } from './tools/dotenv';

const app = express();
const port = 3110;

app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());

app.get('/login', async (req, res) => {
	console.log('GET /login');
	console.log(req.sessionID);

	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	const params = new URLSearchParams();
	params.append("client_id", dotenv().SPOTIFY_APP_CLIENTID);
	params.append("response_type", "code");
	params.append("redirect_uri", dotenv().SPOTIFY_ALL_REDIRECT_URL);
	params.append("scope", "user-read-private user-read-email user-library-read playlist-read-private");
	params.append("code_challenge_method", "S256");
	params.append("code_challenge", challenge);

	res.send({verifier, url: `https://accounts.spotify.com/authorize?${params.toString()}`});
});

app.post('/auth', async (req, res) => {
	console.log('POST /auth');

	spotiPost('https://accounts.spotify.com/api/token', {
		grant_type: 'authorization_code',
		code: req.body.code,
		code_verifier: req.body.verifier
	}).then(result => {
		res.send(result);
	}).catch(err => {
		res.send(err);
	});
});

app.post('/check', async (req, res) => {
	const { auth } = req.body;

	const profile = await spotiGet('https://api.spotify.com/v1/me', null, auth.access_token);
	if (profile?.id) return res.send({status: true});

	spotiPost('https://accounts.spotify.com/api/token', {
        grant_type: 'refresh_token',
        refresh_token: auth.refresh_token
	}).then(result => {
		res.send(result);
	}).catch(err => {
		res.send(err);
	});
});

app.get('/profile', async (req, res) => {
	console.log('GET /profile');
	const access_token = req.query.access_token as string;
	if (!access_token) return res.send({error: 'No access token provided'});

	spotiGet('https://api.spotify.com/v1/me', null, access_token).then(result => {
		res.send(result);
	}).catch(err => {
		res.send(err);
	});
});

app.get('/playlists', async (req, res) => {
	console.log('GET /playlists');
	const { access_token, offset } = req.query;
	if (!access_token) return res.send({error: 'No access token provided'});

	spotiGet('https://api.spotify.com/v1/me/playlists', {limit: 50, offset}, access_token as string).then(result => {
		res.send(result);
	}).catch(err => {
		res.send(err);
	});
});

app.get('/savedtracks', async (req, res) => {
	console.log('GET /savedtracks');
	const { access_token, offset } = req.query;
	if (!access_token) return res.send({error: 'No access token provided'});

	spotiGet('https://api.spotify.com/v1/me/tracks', {limit: 50, offset}, access_token as string).then(result => {
		res.send(result);
	}).catch(err => {
		res.send(err);
	});
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
