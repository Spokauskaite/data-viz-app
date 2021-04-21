import { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import SideBar from './components/sidebar/SideBar'
import Content from './components/content/Content'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  //const [ generating, data ] = useDataGenerator()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
  const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen)

  return (
    <>
      <Router>
      <div className="App wrapper">
        <SideBar 
          sidebarIsOpen = {sidebarIsOpen}
          toggleSidebar = {toggleSidebar}
        />
        <Content 
          sidebarIsOpen = {sidebarIsOpen}
          toggleSidebar = {toggleSidebar}
        />
        </div>
      </Router>

      
    </>
  )
}

export default App
