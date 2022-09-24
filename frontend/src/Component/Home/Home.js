import React, { useEffect } from 'react';
import './Home.css'
import Layout from '../Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import { ImageViewer } from "react-image-viewer-dv"
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import banner from '../Images/banner.jpg';


const Home = () => {
  useEffect(() => {
    window.scrollTo(10, 0)
  }, []);

  return (
    <>
      <Layout
        title="Donation"
        description="Donating home"
      >
        <section className='headingSection'>


          <Container>
            <Row>
              <Col md={6} className="left">
                <div className='leftHeading'>
                  <h1>Share4U</h1>
                  <p>Here you can donate the homeless people. Help the people when they need you. Your donation others inspiration. This site is free for the people.</p>
                </div>
              </Col>
              <Col md={6} className="right">
                <div className='rightImage'>
                  <img src='https://media.istockphoto.com/vectors/refugees-vector-id502962810?k=20&m=502962810&s=612x612&w=0&h=_liiWH9ZUBA2R30aA0oC-kXrM_1sPO1qlEfxxbtbg2U=' alt='Heading' />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className='paragraphSection'>
          <Container>
            <Row>
              <Col md={4}>
                <div className="card text-center">
                  <img className="" src="./feature-icon-01.svg" alt="icon" />

                  <div className="card-body">
                    <h5 className="card-title">About website</h5>
                    <p className="card-text">Having a professionally built website for your nonprofit can emphasize your efforts, which results in more awareness, more support, and more donations from your audience. All of this can bring the nonprofit closer.</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card text-center">
                  <img className="" src="./feature-icon-02.svg" alt="icon" />
                  <div className="card-body">
                    <h5 className="card-title">Communicate with us</h5>
                    <p className="card-text">Donating is a selfless act, so giving to charity will improve your self-esteem and self-worth. By donating money to charity, you will achieve a greater sense of satisfaction and growth as it feels good to help others and provide them..</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card text-center">
                  <img className="" src="./feature-icon-04.svg" alt="icon" />
                  <div className="card-body">
                    <h5 className="card-title">Free Website</h5>
                    <p className="card-text">Non-profit websites don't aim to sell products or services to their visitors, but they still need to convince people to support their cause. Websites are one of the primary ways the charity organisations.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className='charitySection'>
          <Container className='charityHeading'>
            <Row>
              <Col md={8} className='centerDiv'>
                <div className='middleBox'>
                  <h1>Please raise your hand & Save world </h1>
                  <p>Refugees International is a global, independent advocacy organization that successfully challenges governments, policymakers, and administrations to improve the lives of displaced people around the world. </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Card />
        <Container>
          <Row>
            <Col md={12}>
              <div className='nammerImg'>
                <img src={banner} alt='banner' />
              </div>
            </Col>
          </Row>
        </Container>
        <section>
          <Container>
            <Row>
              <Col md={12}>
                <div className='galleryImage'>
                  <h1>Gallery</h1>
                  <ul>
                    <li><ImageViewer>
                      <img src='https://preview.colorlib.com/theme/charitee/assets/img/gallery/class-img1.jpg.webp' alt="gallery" />
                    </ImageViewer>

                    </li>
                    <li><ImageViewer>
                      <img src='https://preview.colorlib.com/theme/charitee/assets/img/gallery/class-img2.jpg.webp' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://preview.colorlib.com/theme/charitee/assets/img/gallery/blog2.jpg.webp' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://preview.colorlib.com/theme/charitee/assets/img/gallery/about1.jpg.webp' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://chooselove.org/wp-content/uploads/2021/08/get-involved-img1.jpg' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://ichef.bbci.co.uk/news/976/cpsprodpb/3191/production/_111998621_1_overall-winner_k-m-asad_after-exodus_hi-res.jpg' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://foreignpolicy.com/wp-content/uploads/2016/02/syrian_small.jpg?w=800&h=514&quality=90' alt="gallery" />
                    </ImageViewer></li>
                    <li><ImageViewer>
                      <img src='https://api.time.com/wp-content/uploads/2015/09/syrian-refugees2.jpg' alt="gallery" />
                    </ImageViewer></li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className='bottomSection'>
          <Container>
            <Row>
              <Col md={6} className='bottomLeft'>
                <div className='leftHeading'>
                  <h1>Wellcome to our Charity</h1>
                  <p>The Smallest Act of Kindness is Worth More Than the Grandest Intention.</p>
                </div>
              </Col>
              <Col md={6} className='bottomRight'>
                <div className='rightImage'>
                  <img src='https://st2.depositphotos.com/4753237/7227/i/600/depositphotos_72270371-stock-photo-portrait-of-refugees.jpg' alt='Heading' />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className='healpingSection'>
          <Container className='helpingLine'>
            <Row>
              <Col md={9}>
                <div className='helpingHeading'>
                  <h1>Helping the Homeless, Hungry, and Hurtings Children</h1>
                </div>
              </Col>
              <Col md={3}>
                <Link to="/donation">Donate Now</Link>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default Home