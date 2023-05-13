// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, TabContent, TabPane,NavLink } from 'reactstrap'

// ** Icons Imports
import { Book } from 'react-feather'

// ** User Components


import Tratamientos from './Tratamientos'
import Alumnos from './Alumnos'


const toggle = (tab) => {
  if (active !== tab) {
    setActive(tab);
  }
  handleReset();
};

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav tabs className='mb-2'> 

        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1');
            }}
          >
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Alumnos</span>
          </NavLink>

        </NavItem>


        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2');
            }}
          >
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Tratamientos</span>
          </NavLink>

        </NavItem>
      </Nav>
      <TabContent activeTab={active}>

      <TabPane tabId='1'>
          <Alumnos />
        </TabPane>
        <TabPane tabId='2'>
          <Tratamientos />
        </TabPane>
      
      </TabContent>
    </Fragment>
  )
}
export default UserTabs