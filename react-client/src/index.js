import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import allReducers from './helpers/redux/reducers/index';
import { Provider } from 'react-redux';
import axios from 'axios';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const myStore = createStore(
	persistedReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(myStore);

// Ping backend and determine if this is a new session and logout
axios
	.get('http://localhost:3001/', { withCredentials: true })
	.then((newUser) => {
		let newSession = newUser.data;
		if (newSession) {
			myStore.dispatch({ type: 'LOGOUT' });
			localStorage.clear();
		}
	})
	.catch((err) => {
		console.log('Error connecting to server');
	});

ReactDOM.render(
	<Provider store={myStore}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
