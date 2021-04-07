import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import  DataPage from './DataPage/DataPage'
import  HandsontablePage from './HandsontablePage/HandsontablePage'
import  AGGridPage from './AGGridPage/AGGridPage'
import  JSpreadsheetPage from './JSpreadsheetPage/JSpreadsheetPage'
import  D3Page from './D3Page/D3Page'

const NavBar = ()  => {

  return(
    <>
     <Router>
        <div>
          <ul>
            <li>
              <Link exact to="/">Data</Link>
            </li>
            <li>
              <Link to="/handsontable">Handsontable</Link>
            </li>
            <li>
              <Link to="/ag-grid">AG Grid</Link>
            </li>
            <li>
              <Link to="/jspreadsheet">JSpreadsheet</Link>
            </li>
            <li>
              <Link to="/d3">D3</Link>
            </li>
          </ul>
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
        </div>
      </Router>
    </>
  )
}

export  default NavBar