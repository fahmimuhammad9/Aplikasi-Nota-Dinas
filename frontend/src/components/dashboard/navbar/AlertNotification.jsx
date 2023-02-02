import { Dropdown, Badge, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import '../../../styles/adminlte.css'

const AlertNotification = () =>{
    return (
        <ListGroup as='li' className="nav-item">
            <a href="" className="nav-link">
                <FontAwesomeIcon icon={faBookOpen}/> Draft Baru
            </a>
        </ListGroup>
    )
}

export default AlertNotification