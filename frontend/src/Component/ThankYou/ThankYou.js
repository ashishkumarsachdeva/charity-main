import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './ThankYou.css'

const ThankYou = () => {
    useEffect(() => {
		window.scrollTo(0, 0)
	  }, []);
    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                <Container>
                    <Row>
                        <Col md={12} className='thankPage'>
                            <div className='content'>
                                <div className="wrapper-1">
                                    <div className="wrapper-2">
                                        <h1>Thank you !</h1>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        <Link to="/" className="go-home">
                                            go home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}

export default ThankYou