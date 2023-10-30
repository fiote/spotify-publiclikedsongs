import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginCallback } from '../login/loginCallback';
import { LoginCheck } from '../login/loginCheck';
import { Share } from '../share/share';
import './App.css';
import { LogoutButton } from './logoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../data/store';

export const App = () => {
	const routes = [] as any[];
	routes.push(<Route key="login" path="/" element={<LoginCheck />} />);
	routes.push(<Route key="share" path="/share" element={<Share />} />);
	routes.push(<Route key="callback" path="/callback" element={<LoginCallback />} />);

	return (
		<BrowserRouter basename="/">
			<div className="App">
				<div className="ui centered menu">
					<div className="ui item button">
						<i className="home icon"></i>
						Home
					</div>
					<div className="ui item button">
						<i className="music icon"></i>
						Share
					</div>
					<div className="ui item button">
						<i className="close icon"></i>
						Logout
					</div>
				</div>

				<Routes>
					{routes}
				</Routes>
			</div>
			<LogoutButton />
		</BrowserRouter>
	);
}

export default App;
