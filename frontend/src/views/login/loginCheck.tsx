import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { Home } from "../home/home";
import { Login } from "./login";
import { LoginCallback } from "./loginCallback";

export const LoginCheck = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");

	if (code) {
		return <LoginCallback />;
	}

	if (loginState.profile?.id) {
		return <Home />;
	}

	return <Login />;
};