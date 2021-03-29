import TopGames from './components/TopGames';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import FindChannels from './components/FindChannels';
import ProfileDiv from './components/ProfileDiv';
import LoggingInPage from './components/LoggingInPage';
import MediaPage from './components/SearchMedia';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	const loggedIn = useSelector((state) => state.isLogged);
	return (
		<Router>
			<Link to="/">
				<h2 className="home-btn">TSD</h2>
			</Link>
			{loggedIn ? <ProfileDiv /> : null}
			<Switch>
				<Route exact path="/">
					<Home headerTitle="Welcome!" />
				</Route>
				<Route path="/getGames">
					<TopGames headerTitle="Top Viewed Games on Twitch Currently" />
				</Route>
				<Route path="/getUser">
					<FindChannels />
				</Route>
				<Route path="/login">
					<LoggingInPage />
				</Route>
				<Route path="/getMedia">
					<MediaPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
