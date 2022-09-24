import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useForm } from "react-hook-form";
import { addReview, isAuthenticate, roomDetail } from '../../api/auth';
import './Review.css';
import { useNavigate, useParams } from 'react-router';

const Review = () => {
    const navigate = useNavigate();
    const [ratting, setRating] = useState(5);
    const ratingChanged = (newRating) => {
        setRating(newRating);
    }
    const { user, token } = isAuthenticate();
    let { id } = useParams();
    const {
        register,
        handleSubmit,
    } = useForm();


    let onSubmit = (data) => {
        const { text } = data;
        addReview(user._id, token, { text, ratting, roomID: id }).then((data) => {
            if (data.error) {
                console.log('fail');
            } else {
                return navigate(`/room/details/${id}`)
            }
        });
    };


    const [roomreviews, setRoomreviews] = useState([]);

    useEffect(() => {
        roomDetail(id, token).then((data) => {

            setRoomreviews(data.reviews);
        });
    }, []);


    return (
        <>
            <section className='reviewSection'>

                <Container>
                    <div className="card commentsBox">
                        <Row>
                            <Col md={12}>
                                <div className='commentsHeading'>
                                    {roomreviews.length && roomreviews.length ? (<h1>COMMENTS ({roomreviews.length && roomreviews.length})</h1>) : (<div><h1>COMMENTS ({roomreviews.length && roomreviews.length})</h1><p>There are no review yet. Be the first one to give a review.</p></div>)}
                                </div>
                            </Col>
                            <Col md={12} className='reviewSet'>
                                {roomreviews && roomreviews ? (roomreviews.map(data =>
                                    <div key={data._id} className="media">
                                        <img className="mr-3 rounded-circle" alt="Preview" src="https://i.imgur.com/stD0Q19.jpg" />
                                        <div className="media-body">
                                            <Row>
                                                <Col md={8} className="d-flex reviewInfo">
                                                    <h5>{data.author.firstname} {data.author.lastname} </h5>
                                                    <ReactStars
                                                        count={5}
                                                        className='ratingBox'
                                                        edit={false}
                                                        value={data.ratting}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                    />
                                                </Col>
                                            </Row>
                                            <span className='reviewAbout'>{data.text}</span>
                                        </div>
                                    </div>
                                )) : <p className='noData'>No review</p>}
                            </Col>
                        </Row>
                    </div>
                </Container>

                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={12}>
                                <div className='commentsHeading'>
                                    <h1>LEAVE YOUR COMMENT</h1>
                                </div>
                            </Col>
                            <input type="hidden" value={id} {...register("roomID", { required: true })} className="input" />
                            <Col md={12}>
                                <div className='comments'>
                                    <label className="label">Rating feedback</label>
                                    <ReactStars
                                        count={5}
                                        className='ratingBox'
                                        onChange={ratingChanged}
                                        value={ratting}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </Col>

                            <Col md={12}>
                                <div className="comments">
                                    <label htmlFor="description" className="label">Description</label>
                                    <textarea id="description" {...register("text", { required: true })}></textarea>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="comments">
                                    <button type='submit' className='btn'>Leave Comment</button>
                                </div>
                            </Col>
                        </Row>
                    </form>

                </Container>
            </section>
        </>
    )
}

export default Review