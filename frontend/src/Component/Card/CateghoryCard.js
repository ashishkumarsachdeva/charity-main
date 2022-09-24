import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { useNavigate } from 'react-router-dom';
import { categhoryType, isAuthenticate } from '../../api/auth'
import Filter from '../Filter/Filter'
import Layout from '../Layout/Layout';
import './Card.css';
import banner from '../Images/banner.jpg'
import ShowImage from '../ShowImage/ShowImage'

const CateghoryCard = () => {
    useState(() => {
        window.scrollTo(0, 0)
    }, []);


    const [roomInfo, setRoomInfo] = useState([]);
    const { token } = isAuthenticate();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        categhoryType(window.location.pathname, token).then((data) => {
            setRoomInfo(data.result);
        });
    }, []);


    const bookNow = (id) => {
        return navigate(`/room/${id}`)
    }
    const viewNow = (id) => {
        return navigate(`/room/details/${id}`)
    }


    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                <section>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className='nammerImg'>
                                    <img src={banner} alt='banner' />
                                </div>
                               {/*  <input type="search" name="search" onChange={e => setSearchTerm(e.target.value)} />*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className='categhoryHeading'>
                                    <h1>{roomInfo.length && roomInfo.lenght ? (roomInfo.slice(0, 1).map(data =>
                                        <p key={data._id}>{data.type === "Singleroom" ? "single room" : data.type === "doubleroom" ? "Double room" : data.type === "singlehouse" ? "Single house" : ""}</p>)) : null}
                                    </h1>
                                </div>
                            </Col>
                            <Col md={3}>
                                <Filter />
                            </Col>
                            <Col md={9}>
                                {roomInfo.length && roomInfo.length ? (roomInfo.filter((data) => {
                                    if (searchTerm === "") {
                                        return data
                                    }
                                    else if (data.location.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return data;
                                    }
                                }).map(data =>
                                    <div key={data._id} className='roomCard'>
                                        <div className='leftSide'>
                                            <div className="wsk-cp-product">
                                                <div className="wsk-cp-img">
                                                    <ShowImage id={data._id} type='room' />
                                                </div>
                                                <div className="wsk-cp-text">
                                                    <div className="category">
                                                        <span>{data.type === "singleroom" ? "Single room" : data.type === "doubleroom" ? "Double room" : data.type === "singlehouse" ? "Single house" : ""}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='rightSide'>
                                            <div className="wsk-cp-product">
                                                <div className="wsk-cp-text">
                                                    <div className="title-product">
                                                        <h3><FontAwesomeIcon icon={faLocationArrow} /> {data.location}</h3>
                                                       <h1>Name: {data.owner.firstname} {data.owner.lastname}</h1> 
                                                    </div>
                                                    <div className='ratingBox'>
                                                        <div className="rating-stars">
                                                            <ReactStars
                                                                count={5}
                                                                className='ratingBox'
                                                                edit={false}
                                                                isHalf={true}
                                                                value={data.ratting}
                                                                size={24}
                                                                activeColor="#ffd700"
                                                            />
                                                        </div>
                                                        <div className='rating-review'> <p>{data.noOfRatting} Review</p></div>
                                                    </div>
                                                    <div className="description-prod">
                                                        <p>{data.roomInfo}</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        {/* without login */}
                                                        {!isAuthenticate() && (
                                                            <>
                                                                <div className="wcf-right"><button onClick={() => viewNow(data._id)} className="viewBtn">View</button></div>
                                                            </>
                                                        )}


                                                        {/* with login */}
                                                        {isAuthenticate() && (
                                                            <>
                                                                <div className="wcf-left"><button onClick={() => bookNow(data._id)} className="bookBtn">Book Now</button></div>
                                                                <div className="wcf-right"><button onClick={() => viewNow(data._id)} className="viewBtn">View</button></div>

                                                            </>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (<p className='noData'>There is no service available in this section</p>)}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>

        </>
    )
}

export default CateghoryCard;

