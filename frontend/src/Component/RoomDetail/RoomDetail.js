import { faArrowRight, faLocationArrow, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ReactStars from "react-rating-stars-component";
import './RoomDetail.css'
import Review from '../Review/Review';
import { categhoryType, isAuthenticate, roomDetail } from '../../api/auth';
import banner2 from '../Images/banner2.jpg'
import ShowImage from '../ShowImage/ShowImage';
import { createConversations } from '../../api/chat'

const RoomDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const { user, token } = isAuthenticate();
    const { id } = useParams();
    let navigate = useNavigate();



    const [roomDetails, setRoomDetails] = useState([]);
    const [ownerInfo, setOwnerInfo] = useState();
    const [related, setRelated] = useState([]);
    // const [rattingShow, setRattingShow] = useState();

    useEffect(() => {
        roomDetail(id, token).then((data) => {
            setRoomDetails(data.roomInfo);
            setOwnerInfo(data.roomInfo.owner);
            // setRattingShow(data.roomInfo.ratting);
            categhoryType(data.roomInfo.type, token).then((dataOne) => {
                setRelated(dataOne.result);
            })
        })

            ;
    }, []);


    //contact
    const contact = async (receiverId) => {
        createConversations(user._id, token, receiverId).then(data => {
            return navigate('/chat')
        }).catch(err => {
            console.log(err);
        })
    }




    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                <section className='roomDetailSection'>
                    <Container>
                        <Row>
                            <Col md={8}>

                                <div className='roomDetails'>
                                    <div className='topImage'>
                                        <ShowImage id={roomDetails && roomDetails._id ? roomDetails._id : ""} type='room' />
                                    </div>
                                    <Row>
                                        <Col md={8}>
                                            <h1>{roomDetails && roomDetails.type === "singleroom" ? "Single room" : roomDetails.type === "doubleroom" ? "Double room" : roomDetails.type === "singlehouse" ? "Single house" : ""}
                                               
                                            </h1>
                                        </Col>
                                        <Col md={4} className='userRight'>
                                            <h6><span className='userImg'><ShowImage id={ownerInfo && ownerInfo._id ? ownerInfo._id : ""} type='user' /> <span>{ownerInfo && ownerInfo.firstname ? ownerInfo.firstname : ""} {ownerInfo && ownerInfo.lastname ? ownerInfo.lastname : ""}</span></span></h6>

                                            {isAuthenticate() && ownerInfo && ownerInfo._id !== user._id && (
                                                <>
                                                    <Button className='contactBtn' onClick={() => contact(ownerInfo._id)}>Contact</Button>
                                                </>
                                            )}
                                        </Col>
                                    </Row>

                                    <h2><FontAwesomeIcon icon={faLocationArrow} /> Address: <span>{roomDetails && roomDetails.location ? roomDetails.location : ""}</span></h2>
                                    <p>{roomDetails && roomDetails.roomInfo ? roomDetails.roomInfo : ""}</p>
                                </div>

                                <div className='roomService'>
                                    <h1>Room Services</h1>
                                    <div className="float-container">
                                        {roomDetails.service && roomDetails.service.length ?
                                            roomDetails.service.map((data, i) => {
                                                if (i % 2 === 0) {
                                                    return <div key={i} className="float-child">
                                                        <div className="green"><FontAwesomeIcon icon={faArrowRight} /> {data}</div>
                                                    </div>
                                                }
                                                else {
                                                    return <div key={i} className="float-child">
                                                        <div className="blue"><FontAwesomeIcon icon={faArrowRight} /> {data}</div>
                                                    </div>
                                                }
                                            }
                                            ) : ""}
                                    </div>

                                </div>
                                <div className='bookNow'>
                                    <Link to={`/room/${id}`} className='btn'>Book Now</Link>
                                </div>
                                <Review />
                            </Col>

                            <Col md={4}>
                                <div className='adsBanner'>
                                    <img src={banner2} alt='banner' />
                                </div>
                                <div className='shortCard'>
                                    {related.length && related.length ? (related.slice(0, 3).map(data =>
                                        <div key={data._id} className="place-card place-card--small">
                                            <div className="place-card__img">
                                                <img src="https://preview.eagle-themes.com/html/zante/images/rooms/double1.jpg" className="place-card__img-thumbnail" alt="Thumbnail" />
                                            </div>
                                            <div className="place-card__content">
                                                <h5 className="place-card__content_header"><Link to="#" className="text-dark place-title">{data.type}</Link></h5>
                                                <p className="mb-0"><FontAwesomeIcon icon={faLocationDot} /> <span className="text-muted">{data.location}</span></p>
                                                <div className="rating-box">
                                                    <div className="rating-box__items">
                                                        <ReactStars
                                                            edit={false}
                                                            value={data.ratting}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                        />
                                                       <Link to={`/room/details/${data._id}`}>Read more</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )) : ''}


                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </>
    )
}

export default RoomDetail