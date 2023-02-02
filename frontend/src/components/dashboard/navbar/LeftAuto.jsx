import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faBars } from "@fortawesome/free-solid-svg-icons"
import '../../../styles/adminlte.css'

const LeftAuto = () =>{
    return (
        <ListGroup as='ul' className='navbar-nav'>
            <ListGroup as='li' className='nav-item'>
                <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                    <FontAwesomeIcon icon={faBars}/>
                </a>
            </ListGroup>
            <ListGroup as='li' className='nav-item'>
                <a href="index3.html" class="nav-link">Home</a>
            </ListGroup>
            <ListGroup as='li' className='nav-item'>
                <a href="#" class="nav-link">Contact</a>
            </ListGroup>
        </ListGroup>
    )
}

export default LeftAuto