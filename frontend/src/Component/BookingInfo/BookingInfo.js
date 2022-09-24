import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { addBooking, isAuthenticate, userProfile } from '../../api/auth';
import Layout from '../Layout/Layout';
import './BookingInfo.css'

const BookingInfo = () => {
    useEffect(() => {
        window.scrollTo(10, 0)
    }, []);


    const [profileInfo, setProfileInfo] = useState();
    const form = useRef(null);
    const { user, token } = isAuthenticate();
    const navigate = useNavigate();
    let { id } = useParams();



    // user info load
    const dataLoad = () => {
        userProfile(user._id, token).then((data) => {
            setProfileInfo(data);
        });
    }
    useEffect(() => {
        dataLoad()
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const { bookingDateStart, adult, child, roomID } = data;
    
        addBooking(user._id, token, { bookingDateStart, adult, child, roomID })
            .then((data) => {
              
                if (data.error) {
                    console.log(data.error);
                } else {
                    return navigate("/thankyou")
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >



                <section className='bookingSection'>
                    <div className="section-center">
                        <Container>
                            <Row>
                                <div className="booking-form">
                                    <div className="booking-bg">
                                        <div className="form-header">
                                            <h2>Make your reservation</h2>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam numquam at</p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="hidden" value={id} {...register("roomID", { required: true })} />
                                        <Row>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <span className="form-label">First name</span>
                                                    <input className='form-control' type="text" value={profileInfo && profileInfo.firstname ? profileInfo.firstname : ""} name="firstname" readOnly />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <span className="form-label">Last name</span>
                                                    <input className='form-control' type="text" name="last" value={profileInfo && profileInfo.lastname ? profileInfo.lastname : ""} readOnly />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className="form-group">
                                                    <span className="form-label">E-mail</span>
                                                    <input className='form-control' type="email" name="email" value={profileInfo && profileInfo.email ? profileInfo.email : ""} readOnly />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                            <div className="form-group">
                                                <span className="form-label">Phone</span>
                                                <input className='form-control' type="text" name="phone" value={profileInfo && profileInfo.phone ? profileInfo.phone : ""} readOnly />
                                            </div>
                                        </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <span className="form-label">Arrival time</span>
                                                    <input className='form-control' type="date" name="date" {...register("bookingDateStart", { required: true })} />
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div className="form-group">
                                                    <span className="form-label">Adult</span>
                                                    <input className='form-control' type="number" name="adult" {...register("adult", { required: true })} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <span className="form-label">Children</span>
                                                    <input className='form-control' type="number" name="child" {...register("child", { required: true })} />
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="form-btn">
                                            <button type='submit' className="submit-btn">Booking Now</button>
                                        </div>
                                    </form>
                                </div>
                            </Row>
                        </Container>
                    </div>
                </section>

            </Layout>
        </>
    )
}

export default BookingInfo