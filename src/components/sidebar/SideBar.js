import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";

const SideBar = ()  => {

  return(
    <>
      <div className={classNames("sidebar", { "is-open": true })}>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <NavItem>
              <Link exact to="/">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                Data            
              </Link>
            </NavItem>    
            <NavItem>
              <Link to="/handsontable">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                Handsontable            
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/ag-grid">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                AG Grid            
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/jspreadsheet">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                JSpreadsheet            
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/d3">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                D3            
              </Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  )
}

export  default SideBar