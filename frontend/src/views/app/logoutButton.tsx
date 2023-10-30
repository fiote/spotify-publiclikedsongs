import { useDispatch, useSelector } from "react-redux";
import { unsetLogin } from "../../data/loginSlice";
import { RootState } from "../../data/store";

export const LogoutButton = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const dispatch = useDispatch<any>();
	if (!loginState.profile?.id) return null;

	const onLogoutClick = () => {
		dispatch(unsetLogin());
	};

	return (
		<div className='ui center aligned container' style={{paddingTop: 30}}>
			<button className='ui button' onClick={onLogoutClick}>Logout</button>
		</div>
	);
}