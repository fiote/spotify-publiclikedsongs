import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/app/App';
import reportWebVitals from './tests/reportWebVitals';
import { Provider } from 'react-redux';
import store from './data/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<h1 className='ui center aligned header' style={{marginBottom: 0}}>Public Liked Songs</h1>
		<div className='ui center aligned container' style={{marginBottom: 20}}>A simple app to share your liked songs with your friends.</div>
		<App />
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
