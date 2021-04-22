import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';

const SideBar = ({sidebarIsOpen,toggleSidebar})  => {

  return(
    <>
      <div className={classNames('sidebar', { 'is-open': sidebarIsOpen })}>
        <div className='side-menu'>
          <div className='sidebar-header'>
            <svg 
              viewBox='0 0 24 24' 
              id='exit-btn' 
              className={classNames('exit', { 'is-invisible': !sidebarIsOpen })}
              onClick={toggleSidebar}
            >
              <path
                id='exit'
                fill='white'
                d='M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z'
              />
            </svg>
            <h3>Menu Title</h3>
          </div>
          <Nav vertical className='list-unstyled pb-3'>
            <NavItem>
              <Link exact to='/'>
                <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                Data            
              </Link>
            </NavItem>    
            <NavItem>
              <Link to='/handsontable'>
                <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                Handsontable            
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/ag-grid'>
                <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                AG Grid            
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/jspreadsheet'>
                <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                JSpreadsheet            
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/d3'>
                <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
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