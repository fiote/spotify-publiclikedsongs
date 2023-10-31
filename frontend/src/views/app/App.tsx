import { useEffect, useState } from 'react';
import { LoginCheck } from '../login/loginCheck';
import { Share } from '../share/share';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../data/store';
import { apiPost } from '../../data/api';
import { setAuth } from '../../data/loginSlice';
import { Logout } from '../login/logout';
import { Login } from '../login/login';

enum Page {
	HOME,
	SHARE,
	LOGOUT
}

interface IPageConfig {
	page: Page;
	label: string;
	icon: string;
	active?: boolean;
	content: JSX.Element;
}

export const App = () => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const [page, setPage] = useState<Page>(Page.HOME);
	const [domMenu, setDomMenu] = useState<JSX.Element | null>(null);
	const [domContent, setDomContent] = useState<JSX.Element | null>(null);

	useEffect(() => {
		const logged = loginState.auth?.access_token && loginState.profile?.id;

		if (!logged) {
			setDomMenu(null);
			setDomContent(<LoginCheck />);
			return;
		}

		const links = [] as IPageConfig[];
		links.push({ page: Page.HOME, label: 'Home', icon: 'home', content: <LoginCheck /> });
		links.push({ page: Page.SHARE, label: 'Share', icon: 'music', content: <Share /> });
		links.push({ page: Page.LOGOUT, label: 'Logout', icon: 'close', content: <Logout /> });

		links.forEach(link => {
			link.active = link.page === page;
			if (link.active) setDomContent(link.content);
		});

		const domLinks = links.map((link) => {
			return (
				<div key={link.page} className={`item ${link.active ? 'active' : ''}`} onClick={() => setPage(link.page)}>
					<i className={`${link.icon} icon`}></i>
					{link.label}
				</div>
			);
		});

		setDomMenu(
			<div id="appmenu" className="ui centered equal width menu">
				{domLinks}
			</div>
		);
	}, [loginState.auth?.access_token, loginState.profile?.id, page]);

	return (
		<div className="App">
			{domMenu}
			{domContent}
		</div>
	);
}

export default App;