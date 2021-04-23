import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavItem, Nav,Row, Col } from 'reactstrap';
import classNames from 'classnames';

const SideBar = ({sidebarIsOpen,toggleSidebar})  => {

  return(
    <>
      <div className={classNames('sidebar', { 'is-open': sidebarIsOpen })}>
        <Row >
          <Col>
            <svg 
              viewBox='0 0 24 24' 
              id='exit-btn' 
              className='exit'
              onClick={toggleSidebar}
            >
              <path
                id='exit'
                fill='white'
                d='M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z'
              />
            </svg>
          </Col>
        </Row>
        <div className='side-menu'>
          <div className='sidebar-header'>
            <h3>Menu Title</h3>
          </div>
          <Nav vertical className='list-unstyled pb-3'>
            <h6>DATA</h6>
            <NavItem>
              <NavLink exact to='/' activeStyle={{color: '#ff7f0e'}}>
                Generate Data            
              </NavLink>
            </NavItem>  
            <h6>TABLES</h6>  
            <NavItem>
              <NavLink to='/handsontable' activeStyle={{color: '#ff7f0e'}}>
                Handsontable            
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/ag-grid' activeStyle={{color: '#ff7f0e'}}>
                AG Grid            
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/jspreadsheet' activeStyle={{color: '#ff7f0e'}}>
                JSpreadsheet            
              </NavLink>
            </NavItem>
            <h6>GRAPHS</h6>
            <NavItem>
              <NavLink to='/d3' activeStyle={{color: '#ff7f0e'}}>
                D3            
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  )
}

export  default SideBar