import TopGames from './components/TopGames'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import FindChannels from './components/FindChannels';
import Header from './components/Header';
import ProfileDiv from './components/ProfileDiv';
import LoggingInPage from './components/LoggingInPage';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const loggedIn = useSelector(state => state.isLogged);
  return (
    <Router>
      {loggedIn ? <ProfileDiv /> : null }
      <Switch>
        <Route exact path='/'>
          <Home headerTitle='Welcome!'/>
        </Route>
        <Route path='/getGames'>
          <TopGames headerTitle='Top Viewed Games on Twitch Currently'/>
        </Route>
        <Route path='/getUser'>
          <Header title='Find a Twitch Channel' />
          <FindChannels />
        </Route>
        <Route path='/login'>
          <LoggingInPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;