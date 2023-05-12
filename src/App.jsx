import './App.css'
import Header from './components/Header'
import Body from './components/Body'

const App=()=> {
  return (
    <>   
        <div className='main'>
          <div className='gradient'/>
        </div>
        <div className='app'>
          <Header/>
          <Body/>
        </div>
    </>
  )
}

export default App
