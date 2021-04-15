import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import SideBar from './components/sidebar/SideBar'
import Content from './components/content/Content'

const App = () => {
  //const [ generating, data ] = useDataGenerator()

  return (
    <>
      <div className='main-page'>
        <Router>
          <SideBar />
          <Content />
        </Router>
      </div>
    </>
  )
}

export default App
