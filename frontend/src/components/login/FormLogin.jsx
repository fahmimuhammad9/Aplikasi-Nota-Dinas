import '../../styles/adminLte.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const FormLogin = () => {
    const navigate = useNavigate();

    return (
        <Form method='post'>
            <Form.Group className='input-group mb-3'>                                
                <Form.Control type='text' placeholder='Masukkan Username' />
                <div className='input-group-append'>
                    <div className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
            </Form.Group>
            <Form.Group className='input-group mb-3'>                                
                <Form.Control type='password' placeholder='Masukkan Password' />
                <div className='input-group-append'>
                    <div className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Ingat Saya" />
            </Form.Group>
            <Button variant='btn btn-primary btn-block' onClick={()=>navigate('/')}>
                Masuk
            </Button>
        </Form>
    )
}

export default FormLogin