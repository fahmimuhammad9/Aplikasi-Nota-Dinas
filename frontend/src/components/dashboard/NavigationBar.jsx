import '../../styles/adminLte.css'
import {Navbar, ListGroup, Nav} from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <div className='hold-transition sidebar-mini layout-fixed'>
            <div className="wrapper">
                <div className="preloader flex-column justify-content align-items-center">
                    <img src="" alt="" />
                </div>
                <Navbar className='main-header navbar navbar-expand navbar-white navbar-white'>
                    <Nav>
                        <ListGroup as='ul' className='navbar-nav'>
                            <ListGroup.Item as='li' className='nav-item'>
                                <Nav.Link></Nav.Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}

export default NavigationBar