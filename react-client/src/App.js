import Header from './components/Header'
import Button from './components/Button'

function App() {
  return (
    <div className='container'>
      <Header />
      <div className='btnContainer'>
        <Button btnName='Find Twitch User'/>
        <Button btnName='View Top Twitch Games'/>
      </div>
    </div>
  )
}

export default App;