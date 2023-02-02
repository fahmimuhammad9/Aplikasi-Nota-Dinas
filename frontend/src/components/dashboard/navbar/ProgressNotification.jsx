import { Dropdown, Badge, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import '../../../styles/adminlte.css'

const ProgressNotification = () =>{
    return (
        <ListGroup as='li' className="nav-item">
            <a href="" className="nav-link">
                <FontAwesomeIcon icon={faBook}/> Draft Saya
            </a>
        </ListGroup>
    )
}

export default ProgressNotification