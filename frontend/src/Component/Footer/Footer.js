import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMessage } from '@fortawesome/free-solid-svg-icons';
 import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
 import logo from '../Images/logo.png'
const Footer = () => {
    return (
        <>
            <footer className="footer-section">
                <Container>
                    <div className="footer-content pt-5 pb-5">
                        <Row>
                            <Col md={4} className="mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                    <Link to="/" className='logo'><img src={logo} alt='logo' /></Link>
                                    </div>
                                    <div className="footer-text">
                                        <p>This organization's website that is home to donation information, details regarding your mission, and the all-important donation form that collects donor data, including financial information, and then processes payments.</p>
                                    </div>
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                       <a href="https://www.facebook.com/Share4U-113112151400764"><FontAwesomeIcon icon={faFacebook} /></a>
                                       <a href="https://twitter.com/Share4U0"><FontAwesomeIcon icon={faTwitter} /></a>
                                       <a href="https://www.youtube.com/channel/UCIQwyWbtWALG4RDW13eNdDg"><FontAwesomeIcon icon={faYoutube} /></a>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} className="mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/chat">Chat</Link></li>
                                        <li><Link to="/userprofile">Profile</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={4} className="mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Contact US</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>If you need any information.</p>
                                    </div>
                                    <div className="subscribe-form">
                                        <form action="#">
                                            <input type="text" placeholder="Email Address" />
                                            <button><FontAwesomeIcon icon={faMessage} /></button>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="copyright-area">
                    <Container>
                        <Row>
                            <Col md={12} className="text-center text-lg-left">
                                <div className="copyright-text">
                                    <p>Copyright &copy; 2022, All Right Reserved <Link to="#">Refuge</Link></p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    )
}

export default Footer