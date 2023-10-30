import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { Home } from "../home/home";
import { Login } from "./login";

export const LoginCheck = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	if (loginState.profile?.id) {
		return <Home />;
	}

	return <Login />;
};