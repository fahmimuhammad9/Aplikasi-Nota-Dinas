import { Image, Nav, ListGroup, Accordion } from "react-bootstrap"
import { faTachometerAlt, faBookJournalWhills } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SideBar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4" >
            <a href="" className="brand-link">
                <Image className="brand-image img-circle"></Image>
                <span className="brand-text font-weight-light">Aplikasi Nota Dinas</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <Image></Image>
                    </div>
                    <div className="info">
                        <a href="">Fahmi Muhammad</a>
                    </div>
                </div>
                <Nav className="mt-2">
                    <Nav.Item as="ul" className="nav nav-pills nav-sidebar flex-column">
                        <ListGroup as='li' className="nav-item">
                            <a href="" className="nav-link active">
                                <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon>
                                <p> Dashboard</p>
                            </a>
                        </ListGroup>
                        <ListGroup as='li' className="nav-item">
                            <a href="" className="nav-link">
                                <FontAwesomeIcon icon={faBookJournalWhills}></FontAwesomeIcon>
                                <p> Record Nota Dinas</p>
                            </a>
                        </ListGroup>
                    </Nav.Item>
                </Nav>
            </div>
        </aside>
    )
}

export default SideBar