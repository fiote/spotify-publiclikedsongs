import { useEffect } from "react";
import { apiGet, apiPost } from "../../data/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { setAuth, setProfile } from "../../data/loginSlice";

export const LoginCallback = () => {
	console.log('LoginCallback()');
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const dispatch = useDispatch<any>();

	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");

	useEffect(() => {
		const verifier = loginState.verifier;
		if (!verifier) return;

		apiPost("/auth", { code, verifier }).then(auth => {
			if (auth?.access_token) dispatch(setAuth(auth));
			else window.location.href = '/';
		});
	},[code, loginState.verifier, dispatch]);

	useEffect(() => {
		const access_token = loginState.auth?.access_token;
		if (!access_token) return;

		apiGet("/profile", { access_token }).then(profile => {
			if (profile?.id) dispatch(setProfile(profile));
			else window.location.href = '/';
		});

	}, [loginState.auth?.access_token, dispatch]);

	useEffect(() => {
		const access_token = loginState.auth?.access_token;
		const userId = loginState.profile?.id;
		if (!access_token || !userId) return;
		window.location.href = '/';
	}, [loginState.auth?.access_token, loginState.profile?.id]);

	return (
		<div className="ui center aligned container">
			Processing login...
		</div>
	);
}
