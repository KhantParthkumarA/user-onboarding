import { useRef, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const apiBaseUri = 'http://localhost:5000/api/auth/register'

function Signup() {
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    
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
            email: email.current.value,
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
                    email: body.email,
                    username: body.username,
                    password: body.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                showAlert('Success', 'Registration successfully')
            }

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
                    <label className="form-label" for="form2Example2">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        ref={password}
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" for="email">email</label>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        ref={email}
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
                    <p>Already a member? <Link to={'signin'}>Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
