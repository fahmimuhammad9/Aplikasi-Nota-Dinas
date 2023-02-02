import { ListGroup, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import '../../../styles/adminlte.css'

const Search = () =>{
    return (
        <ListGroup as='li' className='nav-item'>
                <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                    <FontAwesomeIcon icon={faSearch} />                
                </a>
                <div className='navbar-search-block'>
                    <Form className='form-inline'>
                        <Form.Group className='input-group input-group-sm'>
                            <div className='input-group-append'>
                                <Button className='btn btn-navbar' type='submit'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                                <Button className='btn btn-navbar'>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </ListGroup>
    )
}

export default Search