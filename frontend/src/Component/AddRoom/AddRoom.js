import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {  useNavigate } from 'react-router';
import { addRoom, isAuthenticate } from '../../api/auth';
import Layout from '../Layout/Layout';
import './AddRoom.css'

const AddRoom = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);
    const form = useRef(null);
    const { user, token } = isAuthenticate();

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    


    const onSubmit = (data) => {

        const createAddRoom = new FormData(form.current);
        addRoom(user._id, token, createAddRoom)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setSuccess(0);
                } else {
                    setSuccess(1);
                    setError(0);
                    setValue("location", "", { shouldValidate: false });
                    setValue("type", "", { shouldValidate: false });
                    setValue("photo", "", { shouldValidate: false });
                    setValue("service", "", { shouldValidate: false });
                    setValue("roomInfo", "", { shouldValidate: false });
                    return navigate(`/room/details/${data.result._id}`)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const roomAdd = () => {
        return (
            <Container>
                <Row>
                    <Col md={9} className='AddCenterPosition'>
                        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={12}>
                                    <div className='addHeading'>
                                        <h1>Add Room Information</h1>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="addRoom">
                                        <label htmlFor="location" className="label">Location</label>
                                        <input id="location" type="text" className="input"  {...register("location", { required: true })} required />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="addRoom">
                                        <label htmlFor="type" className="label">Room Type</label>
                                        <select defaultValue={'DEFAULT'} id='type' aria-label="Default select example" {...register("type", { required: true })} required>
                                            <option value="DEFAULT">Select room type</option>
                                            <option value="singleroom">Single Room</option>
                                            <option value="doubleroom">Double Room</option>
                                            <option value="singlehouse">Single House</option>
                                        </select>
                                    </div>

                                </Col>
                                <Col md={6}>
                                    <div className="addRoom">
                                        <label htmlFor="photo" className="label">Room Images</label>
                                        <input id="photo" type="file" className="input" {...register("photo", { required: true })} required />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="addRoom">
                                        <label htmlFor="service" className="label">Room Service</label>
                                        <input id="service" type="text" className="input" {...register("service", { required: true })} required />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="addRoom">
                                        <label htmlFor="roomInfo" className="label">Description</label>
                                        <textarea id="roomInfo" {...register("roomInfo", { required: true })} required></textarea>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="addRoom">
                                        <button className='btn' type='submit'>Save</button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }

    // Successfully register
    const showSuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? "" : "none" }}
            >
                Room add successfully
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

                {showError()}
                {showSuccess()}
                {roomAdd()}
            </Layout>
        </>
    )
}

export default AddRoom