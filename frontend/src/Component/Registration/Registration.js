import { faBorderAll, faEnvelope, faHandshakeAlt, faLock, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { registerForm } from '../../api/auth';
import Layout from '../Layout/Layout';
import './Registration.css'
const Registration = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const navigate = useNavigate();
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);
    const form = useRef(null);
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();


    //form on submit
    let onSubmit = () => {
        const userRegister = new FormData(form.current);
        registerForm(userRegister).then((data) => {
            if (data.error) {
                setError(data.error);
                setSuccess(0);
            } else {
                setSuccess(1);
                setError(0);
                setValue("firstname", "", { shouldValidate: false });
                setValue("lastname", "", { shouldValidate: false });
                setValue("email", "", { shouldValidate: false });
                setValue("password", "", { shouldValidate: false });
                setValue("about", "", { shouldValidate: false });
                setValue("userType", "", { shouldValidate: false });
                setValue("phone", "", { shouldValidate: false });
                setValue("photo", "", { shouldValidate: false });
                return navigate("/login")
            }
        });
    };
    // Registration form input
    const registrationForm = () => (
        <section className='registrationSection'>
            <Container>
                <Row className="py-5 mt-4 align-items-center">

                    <Col md={6}>
                        <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                        <h1>Create an Account</h1>
                       
                    </Col>


                    <Col md={6} className="ml-auto">
                        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6} className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faUserAlt} />
                                        </span>
                                    </div>
                                    <input id="firstName" type="text" name="firstname" placeholder="First Name" className="form-control bg-white border-left-0 border-md" {...register("firstname", { required: true, maxLength: 32 })} required />
                                </Col>


                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faUserAlt} />
                                        </span>
                                    </div>
                                    <input id="lastName" type="text" name="lastname" placeholder="Last Name" className="form-control bg-white border-left-0 border-md" {...register("lastname", { required: true, maxLength: 32 })} required />
                                </div>


                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                    </div>
                                    <input id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" {...register("email", { required: true })} required />
                                </div>


                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                    </div>
                                    <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3" {...register("phone", { required: true, maxLength: 32 })} />
                                </div>



                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faHandshakeAlt} />
                                        </span>
                                    </div>
                                    <select defaultValue={'DEFAULT'} id="job" name="jobtitle" className="form-control custom-select bg-white border-left-0 border-md" {...register("userType", { required: true })} required>
                                        <option value="DEFAULT">Choose option</option>
                                        <option value="help">I need a help</option>
                                        <option value="doner">I want to Donate</option>
                                    </select>
                                </div>


                                <div className="input-group col-lg-6 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                    </div>
                                    <input id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" {...register("password", { required: true })} required />
                                </div>

                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faBorderAll} />
                                        </span>
                                    </div>
                                    <input id="about" type="textarea" name="about" placeholder="Description" className="form-control bg-white border-md border-left-0 pl-3" {...register("about", { required: true })} required />
                                </div>


                                <div className="input-group col-lg-6 mb-4">
                                    <input id="photo" type="file" name="photo" className="form-control" {...register("photo", { required: true })} required />
                                </div>

                                <div className="form-group col-lg-12 registerBtn mx-auto mb-0 text-center">
                                    <button type='submit' className="btn btn-primary btn-block py-2">
                                        <span className="font-weight-bold">Register</span>
                                    </button>
                                </div>

                                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                    <div className="border-bottom w-100 ml-5"></div>
                                    <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                    <div className="border-bottom w-100 mr-5"></div>
                                </div>


                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold">Already Registered? <Link to="/login" className="text-primary ml-2">Login</Link></p>
                                </div>

                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>




        </section>
    );


    // Successfully register
    const showSuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? "" : "none" }}
            >
                Account Create Successfully. Please <Link to="/login">Login</Link>
            </div>
        );
    };
    //show error msg
    const showError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
        );
    };

    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                {showSuccess()}
                {showError()}
                {registrationForm()}
            </Layout>
        </>
    )
}

export default Registration