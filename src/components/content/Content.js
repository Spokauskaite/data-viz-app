

import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import DataContext from '../../utils/DataContext'
import DataPage from './pages/data/DataPage'
import HandsontablePage from './pages/handsontable/HandsontablePage'
import AGGridPage from './pages/aggrid/AGGridPage'
import JSpreadsheetPage from './pages/jspreadsheet/JSpreadsheetPage'
import D3Page from './pages/d3/D3Page'
import { Container } from 'reactstrap'
import classNames from 'classnames'

const Content = ({sidebarIsOpen,toggleSidebar}) => {
  const [generatedData, setGeneratedData] =  useState(null)
  const { Provider }  = DataContext

  return (
    <>
      <div className={classNames("content", { "is-open": sidebarIsOpen })} >
        <div>
          <svg 
            height='32px' 
            id='menu-btn' 
            className={classNames('open', { 'is-invisible': sidebarIsOpen })}
            viewBox='0 0 32 32'
            onClick={toggleSidebar}
          >
            <path fill='black' d='M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z'/>
          </svg>
        </div>
        <Provider value={{generatedData, setGeneratedData}}>
          <Switch>
            <Route exact path='/'>
              <DataPage />
            </Route>
            <Route path='/handsontable'>
              <HandsontablePage />
            </Route>
            <Route path='/ag-grid'>
              <AGGridPage />
            </Route>
            <Route path='/jspreadsheet'>
              <JSpreadsheetPage />
            </Route>
            <Route path='/d3'>
              <D3Page />
            </Route>
          </Switch>
        </Provider>
      </div>
    </>
  )
}

export default Content
