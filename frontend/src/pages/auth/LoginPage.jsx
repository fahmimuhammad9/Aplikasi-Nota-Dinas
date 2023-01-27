import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap';
import Headers from '../auth/Headers';

function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit =async (event)=>{
        event.preventDefault();
    }
    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type='text' value={username} onChange={(event)=>
                        setUsername(event.target.value)} placeholder='Masukkan User Name' />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type='password' value={password} onChange={(event)=>
                        setPassword(event.target.value)} placeholder='Masukkan Kata Sandi' />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};


export default LoginPage;