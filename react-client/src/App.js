import TopGames from './components/TopGames'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <Home headerTitle='Welcome to Twitch Statistics!'/>
          </Route>
          <Route path='/getGames'>
            <TopGames headerTitle='Top Viewed Games on Twitch Currently'/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;