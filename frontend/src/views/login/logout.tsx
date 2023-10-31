import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsetLogin } from "../../data/loginSlice";

export const Logout = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(unsetLogin());
	}, [dispatch]);

	return (
		<div className="ui center aligned container">
			Logging out...
		</div>
	)
}