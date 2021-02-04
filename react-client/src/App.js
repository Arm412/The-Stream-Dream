import TopGames from './components/TopGames'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from 'react-bootstrap/Navbar';
import FindChannels from './components/FindChannels';
import Header from './components/Header';

function App() {

  return (
    <Router>
      <div className='container'>
        <Navbar bg='primary'>
          <Navbar.Brand href='/'>TS</Navbar.Brand>
        </Navbar>
        <Switch>
          <Route exact path='/'>
            <Home headerTitle='Welcome to The Twitch Itch!'/>
          </Route>
          <Route path='/getGames'>
            <TopGames headerTitle='Top Viewed Games on Twitch Currently'/>
          </Route>
          <Route path='/getUser'>
            <Header title='Find a Twitch Channel' />
            <FindChannels />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;