

import { useState, createContext } from 'react'
import NavBar from './NavBar'
import DataContext from './DataContext'

const MainPage = () => {
  const [generatedData, setGeneratedData] =  useState(null)
  const { Provider }  = DataContext

  return (
    <>
      <Provider value={{generatedData, setGeneratedData}}>
        <NavBar />
      </Provider>
    </>
  )
}

export default MainPage
