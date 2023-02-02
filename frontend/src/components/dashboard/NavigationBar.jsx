import {Navbar, Button, ListGroup, Form, Badge, Dropdown, DropdownButton} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOut} from '@fortawesome/free-solid-svg-icons'

import LeftAuto from './navbar/LeftAuto';
import Search from './navbar/Search';
import ProgressNotification from './navbar/ProgressNotification';
import AlertNotification from './navbar/AlertNotification';

const NavigationBar = () => {
    return (
    <Navbar className='main-header navbar navbar-expand navbar-white navbar-light'>
        <LeftAuto />
        <ListGroup as='ul' className='navbar-nav ml-auto'>
            <Search></Search>
            <ProgressNotification />
            <AlertNotification />
            <ListGroup as='li' className='nav-item mr-2'>
                <Button variant='outline-danger'>Logout <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon></Button>
            </ListGroup>
        </ListGroup>
    </Navbar>
    )
}

export default NavigationBar
