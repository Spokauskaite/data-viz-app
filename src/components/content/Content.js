

import { useState } from 'react'
import { Switch, Route } from "react-router-dom"
import DataContext from '../../utils/DataContext'
import DataPage from './pages/data/DataPage'
import HandsontablePage from './pages/handsontable/HandsontablePage'
import AGGridPage from './pages/aggrid/AGGridPage'
import JSpreadsheetPage from './pages/jspreadsheet/JSpreadsheetPage'
import D3Page from './pages/d3/D3Page'

const Content = () => {
  const [generatedData, setGeneratedData] =  useState(null)
  const { Provider }  = DataContext

  return (
    <>
      <Provider value={{generatedData, setGeneratedData}}>
        <Switch>
          <Route exact path="/">
            <DataPage />
          </Route>
          <Route path="/handsontable">
            <HandsontablePage />
          </Route>
          <Route path="/ag-grid">
            <AGGridPage />
          </Route>
          <Route path="/jspreadsheet">
            <JSpreadsheetPage />
          </Route>
          <Route path="/d3">
            <D3Page />
          </Route>
        </Switch>
      </Provider>
    </>
  )
}

export default Content
