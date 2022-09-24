import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../Layout/Layout'
import './Donation.css'
import { postDonate } from '../../api/donate'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Donation = () => {
    useEffect(() => {
        window.scrollTo(10, 0)
    }, []);

    const navigate = useNavigate();

    //use form
    const {
        register,
        handleSubmit,
    } = useForm();


    //form submit
    const onSubmit = (data) => {

        postDonate(data).then(res => {
            return navigate("/thankyou")
        })
    }

    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                <section className='paymentSection'>
                    <Container>
                        <Row>
                            <Col md={6} className='cardBox'>
                                <Row>
                                    <Col md={4}>
                                        <h1 className="header">Payment</h1>
                                    </Col>
                                    <Col md={8}>
                                        <div className="icons">
                                            <img src="https://img.icons8.com/color/48/000000/visa.png" alt='card' />
                                            <img src="https://img.icons8.com/color/48/000000/maestro.png" alt='card' />
                                            <img src="https://i.imgur.com/W1vtnOV.png" alt='card' />
                                            <img src="https://i.imgur.com/35tC99g.png" alt='card' />
                                            <img src="https://i.imgur.com/2ISgYja.png" alt='card' />
                                        </div>
                                    </Col>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Col md={12}>
                                            <span>Cardholder's name:</span>
                                            <input placeholder="Enter your name" {...register("cardHolderName", { required: true })} />
                                        </Col>
                                        <Col md={12}>
                                            <span>Card Number:</span>
                                            <input maxLength={16} placeholder="0125 6780 4567 9909"  {...register("cardNo", { required: true })} />
                                        </Col>
                                        <Col md={6}>
                                            <span>Expiry date:</span>
                                            <input maxLength={4} placeholder="YY/MM" {...register("expDate", { required: true })} />
                                        </Col>
                                        <Col md={6}>
                                            <span>CVV:</span>
                                            <input maxLength={4} id="cvv" {...register("cvv", { required: true })} />
                                        </Col>
                                        <Col md={12}>
                                            <input type="checkbox" id="save_card" className="align-left" />
                                            <label htmlFor="save_card"> Save card details to wallet</label>
                                        </Col>
                                        <Col md={12}>
                                            <div className='paymentBtn'>
                                                <button className='btn' type='submit'>Confirm</button>
                                            </div>
                                        </Col>
                                    </form>

                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>

        </>
    )
}

export default Donation