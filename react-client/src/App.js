import TopGames from './components/TopGames'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import FindChannels from './components/FindChannels';
import Header from './components/Header';
import Login from './components/Login';

function App() {

  return (
    <Router>
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
            <Header title='Log In with Twitch Channel' />
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;