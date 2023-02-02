import FormLogin from './FormLogin';

const Login = () => {
    return (
        <div className='login-page hold-transition'>
            <div className='login-box'>
                <div className='login-logo'>
                    Aplikasi Nota Dinas <br /> 
                    PT Pesonna Optima Jasa
                </div>
                <div className='card'>
                    <div className="card-body login-card-body">
                        <p className='login-box-msg'>
                            Masuk Aplikasi Nota Dinas POJ
                        </p>
                        <FormLogin />                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login