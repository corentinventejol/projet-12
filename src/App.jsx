import './app.css'
import Header from './components/header/header'
import SideBar from './components/sideBar/sideBar'
import Main from './components/main/main'

function App() {

  return (
    <>
      <Header />
      <div className='main-container'>
        <SideBar />
        <Main />
      </div>
    </>
  )
}

export default App
