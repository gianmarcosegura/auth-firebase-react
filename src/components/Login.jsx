import React from 'react'
import { auth, db } from './../firebase';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState(null);
    const [esRegistro, setEsRegistro] = React.useState(true);

    const procesarDatos = e => {

        e.preventDefault()

        if(!email.trim() || !pass.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }

        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }

        if(pass.length < 6){
            console.log('6 o más carácteres')
            setError('6 o más carácteres en pass')
            return
        }

        setError(null)

        if(esRegistro) {
            registrar()
        } else {
            login()
        }

    }

    const login = React.useCallback(async() => {

        try {

            const response = await auth.signInWithEmailAndPassword(email, pass);
            console.log('response :>> ', response);
            cleanData();
            props.history.push('/admin');

        } catch (error) {
            setError(error.message);
        }

    }, [email, pass, props.history])

    const registrar = React.useCallback(async() => {

        try {

            const response = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection('usuarios').doc(response.user.email).set({
                email: response.user.email,
                uid: response.user.uid
            });
            await db.collection(response.user.uid).add({
                name: 'Ejemplo Tarea',
                fecha: Date.now()
            })
            cleanData();
            props.history.push('/admin');

        } catch (error) {
            setError(error.message);
        }

    }, [email, pass, props.history])

    const cleanData = () => {
        setEmail('');
        setPass('');
        setError(null);
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro' : 'Login'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            { esRegistro ? 'Registrar' : 'Acceder' }
                        </button>
                        <button
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            { esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }
                        </button>
                        {
                            !esRegistro ? (
                                <button
                                    className="btn btn-sm btn-info btn-danger"
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                >
                                    Perdí mi contraseña
                                </button>

                            ): null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)