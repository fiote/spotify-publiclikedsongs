import { useEffect, useState } from "react";
import { apiGet } from "../../data/api";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUrl, setVerifier } from "../../data/loginSlice";
import { RootState } from "../../data/store";

export const Login = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const [image, setImage] = useState<string>("");
	const [clicked, setClicked] = useState<boolean>(false);
	const dispatch = useDispatch<any>();

	useEffect(() => {
		fetch("https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true").then(async response => {
			const json = await response.json();
			setImage(json[0]);
		});
	}, []);

	useEffect(() => {
		if (!loginState.loginUrl) return;
		if (!loginState.verifier) return;
		window.location.href = loginState.loginUrl;
	}, [loginState.loginUrl, loginState.verifier]);

	let divImage = image
		? <div className="imagebox" style={{backgroundImage: "url("+image+")"}}></div>
		: <div className="ui placeholder"><div className="square image"></div></div>;

	const onClickLogin = () => {
		setClicked(true);
		apiGet("/login").then(feed => {
			dispatch(setLoginUrl(feed?.url));
			dispatch(setVerifier(feed?.verifier));
		});
	};

	if (clicked) return null;

	return (
		<div id='logincard' className="ui center aligned container">
			<div className="ui centered card">
				<div className="image">
					{divImage}
				</div>
				<div className="content">
					<div className="header">You (as a Shiba)</div>
					<div className="meta">
						<span className="followers">Random image from <a href="https://shibe.online/">shibe.online</a></span>
					</div>
					<div className="description">
						An amazing person who is probably an amazing listener. <b>You're not logged yet.</b>
					</div>
				</div>
				<div className="ui button" onClick={onClickLogin}><i className="user icon"></i>Click here to login</div>
			</div>

		</div>
	)
}
