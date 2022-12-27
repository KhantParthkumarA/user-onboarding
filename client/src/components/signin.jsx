import { useRef, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const apiBaseUri = 'http://localhost:5000/api/auth/login'

function Signin() {
    const username = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const goHome = () => { navigate('/'); }

    const [isLoading, setIsLoading] = useState(false)

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title,
            text,
            icon, // "success",
            confirmButtonText: "OK",
        });
    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log(username.current.value)
        handleClick({
            username: username.current.value,
            password: password.current.value
        })
    }

    const handleClick = async (body) => {
        setIsLoading(true);
        try {
            const response = await fetch(apiBaseUri, {
                method: 'POST',
                body: JSON.stringify({
                    username: body.username,
                    password: body.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const { data: { _id, token } } = await response.json();

            localStorage.setItem('user', _id);
            localStorage.setItem('token', token);
            // showAlert('Success', 'Login successfully')
            goHome()

        } catch (err) {
            showAlert(
                'error',
                'Oops...',
                'Something went wrong!'
            )
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App container mt-5">
            <form method="post" onSubmit={submitForm}>


                <div className="form-outline mb-4">
                    <label className="form-label" for="username">username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        ref={username}
                    />
                </div>


                <div className="form-outline mb-4">
                    <label className="form-label" for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        ref={password}
                    />
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">

                        <div className="form-check">
                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>


                <button disabled={isLoading} className="btn btn-primary btn-block mb-4">
                    Sign in
                    <FallingLines
                        color="#4fa94d"
                        width="100"
                        visible={isLoading}
                        ariaLabel='falling-lines-loading'
                    />
                </button>

                <div className="text-center">
                    <p>Not a member? <Link to={'signup'}>Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Signin;
