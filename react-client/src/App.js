require('./App.css');
const twitch = require('./twitchapi');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={"twitchlogo.png"} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={twitch.test}>Acquire new access token</button>
      </header>
    </div>
  );
}

export default App;
