import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { categhoryType, isAuthenticate } from '../../api/auth';
import './Card.css';
import house from '../Images/house.png';
import doubleroom from '../Images/doubleroom.png'
import singleroom from '../Images/singleroom.png'


const Card = () => {
    useEffect(() => {
        window.scrollTo(10, 0)
    }, []);
    const navigate = useNavigate();

    const { token } = isAuthenticate();

    const searchRoom = (dataname) => {
        categhoryType(dataname, token)
            .then((data) => {
                return navigate(`/${dataname}`)
            })
    }

    return (
        <>
            <section className='cardSection'>
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="card">
                                <img className="card-img-top" src={house} alt="Single house" />
                                <div className="card-body">
                                    <h5 className="card-title">Single House</h5>
                                    <p className="card-text">Single house are ideal for multiple person. A small family can easily live here.</p>
                                    <button onClick={() => searchRoom('singlehouse')} className="btn">Find Place</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card">
                                <img className="card-img-top" src={singleroom} alt="Card" />
                                <div className="card-body">
                                    <h5 className="card-title">Single Room</h5>
                                    <p className="card-text">It's ideal for one person. Single rooms have a single bed and bathroom with bath and toilet.</p>
                                    <button onClick={() => searchRoom('singleroom')} className="btn">Find Place</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card">
                                <img className="card-img-top" src={doubleroom} alt="Card" />
                                <div className="card-body">
                                    <h5 className="card-title">Double Room</h5>
                                    <p className="card-text">It's ideal for two person. Double rooms have a double bed and bathroom with bath and toilet.</p>
                                    <button onClick={() => searchRoom('doubleroom')} className="btn">Find Place</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Card