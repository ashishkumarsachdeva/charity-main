
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { bookingHistory, isAuthenticate, ownerHistory, upadetUserImg, upadetUserInfo, updateLocalStorageUser, userProfile } from '../../api/auth';
import Layout from '../Layout/Layout';
import ShowImage from '../ShowImage/ShowImage';
import './UserProfile.css';
import Moment from 'react-moment';
import ReactStars from 'react-rating-stars-component';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { createConversations } from '../../api/chat';
const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  const {
    handleSubmit,
  } = useForm();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    about: "",
    error: false,
    success: false,
  });

  const [profileUpdate, setProfileUpdate] = useState(false);
  const [profileInfo, setProfileInfo] = useState();
  const updateProfile = () => {
    setProfileUpdate(true);
  }
  const [roomBookingInfo, setRoomBookingInfo] = useState([]);

  const [imgUrlBlob, setImgUrlBlob] = useState("");
  const { user, token } = isAuthenticate();
  const [ownerBookingHistory, setOwnerBookingHistory] = useState([]);
  const [userInfo, setUserInfo] = useState(user);

  const navigate = useNavigate()
  const form = useRef(null);
  //get user info
  const dataLoad = () => {
    userProfile(user._id, token).then((data) => {
      setProfileInfo(data);
      setValues({
        error: false,
        success: false,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        about: data.about,
      })

    });
  }
  useEffect(() => {
    dataLoad()
  }, []);

  //handel change
  const handelChnage = key => e => {
    setValues({ ...values, error: false, [key]: e.target.value })
  };
  // update user info
  const clickSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, about } = values;
    upadetUserInfo(user._id, token, { firstname, lastname, email, about }).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        updateLocalStorageUser(data, () => {
          setValues({ ...values, firstname: data.firstname, lastname: data.lastname, email: data.email, success: true });
        })
        userProfile(user._id, token).then((data) => {
          setProfileInfo(data);
          setProfileUpdate(false);
        });

      }
    })



  };



  useEffect(() => {
    bookingHistory(user._id, token).then((data) => {
      setRoomBookingInfo(data.bookingHistory);
    });
  }, []);



  // ser image update
  const onSubmit = () => {
    const userImg = new FormData(form.current);
    upadetUserImg(user._id, token, userImg).then(data => {
      userProfile(user._id, token).then((data) => {
        setProfileInfo(data);
        setProfileUpdate(false);
      });
    })
  }

  useEffect(() => {

  }, [userInfo]);



  // preview image

  const blobImageHandler = e => {
    const fileList = e.target.files;
    const blobUrl = window.URL.createObjectURL(fileList[0]);
    setImgUrlBlob(blobUrl);
  };


  // owner booking history

  const [bookingUser, setBookingUser] = useState()

  useEffect(() => {
    ownerHistory(user._id, token).then((data) => {
      setOwnerBookingHistory(data.bookingHistory);
      for (let i = 0; i < data.bookingHistory.length; i++) {
        userProfile(data.bookingHistory[i].bookingUserID, token).then((userdata) => {
          setBookingUser(userdata)
        });
      }
    });



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
        {isAuthenticate() && isAuthenticate().user.userType === 'help' && (
          <section className='profileSection'>
            <Container>
              <Row>

                <Col md={6}>
                  <div className='userProfile'>
                    {profileUpdate ? (<div className="card">

                      <div className="img">
                        <div className="uploadBox">

                          <form ref={form} onSubmit={handleSubmit(onSubmit)}>

                            <div className="image-item__btn-wrapper">
                              <div className="product-img">
                                <img className="styled-img" src={imgUrlBlob} alt="" />
                              </div>

                              <label className="custom-file-upload updateBtn">
                                <input type="file" name="photo" id="photo" onChange={blobImageHandler} required />
                                upload image
                              </label>
                              <span>OR</span>
                              <button type='submit' className='saveBtn'>Save Image</button>
                            </div>


                          </form>

                        </div>
                      </div>

                      <form>
                        <div className="infos">
                          <div className="name profileEdit">
                            <div className="mb-3 row">
                              <label htmlFor="userfirstname" className="col-sm-3 username">First Name:</label>
                              <div className="col-sm-9">
                                <input type="text" onChange={handelChnage("firstname")} value={values.firstname} className="form-control" id="userfirstname" />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="userlastname" className="col-sm-3 username">Last Name:</label>
                              <div className="col-sm-9">
                                <input type="text" onChange={handelChnage("lastname")} value={values.lastname} className="form-control" id="userlastname" />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="useremail" className="col-sm-3 useremail">Email:</label>
                              <div className="col-sm-9">
                                <input type="email" onChange={handelChnage("email")} value={values.email} className="form-control" id="useremail" required />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="userabout" className="col-sm-3 userabout">Description:</label>
                              <div className="col-sm-9">
                                <textarea className="form-control" id="userabout" rows="3" required onChange={handelChnage("about")} value={values.about}></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="links">
                            <button onClick={clickSubmit} className="view btn">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>) : (<div className="card">
                      <div className="img">
                        <ShowImage id={user._id} type='user' />
                      </div>
                      <div className="infos">
                        <div className="name">
                          <h2>Name:   {profileInfo && profileInfo.firstname ? profileInfo.firstname : ""} {profileInfo && profileInfo.lastname ? profileInfo.lastname : ""}</h2>
                          <h4>E-mail: {profileInfo && profileInfo.email ? profileInfo.email : ""}</h4>
                        </div>
                        <p className="text">
                          <span>Description:</span>   {profileInfo && profileInfo.about ? profileInfo.about : ""}
                        </p>
                        <div className="links">
                          <button className="view btn" onClick={updateProfile}>Update</button>
                        </div>
                      </div>
                    </div>)}
                  </div>
                </Col>
                <Col md={6}>
                  <div className='bookingHistory'>
                    <h3 className=''>Booking List</h3>
                    {roomBookingInfo.length && roomBookingInfo.length ? roomBookingInfo.map((data, i) =>
                      <div key={i} className="bookingBox">
                        <h1><span>Room type:</span> {data.roomID.type === "Singleroom" ? "single room" : data.roomID.type === "doubleroom" ? "Double room" : data.roomID.type === "singlehouse" ? "Single house" : ""}</h1>
                        <h1><span>Adult:</span> {data.adult} and <span>Child:</span> {data.child}</h1>
                        <h1><span>Booking time:</span> <Moment format="DD/MM/YYYY">{data.bookingDateStart}</Moment></h1>
                        <h1><span>Location:</span> {data.roomID.location}</h1>
                        <h6><span>Review:</span> <ReactStars
                          edit={false}
                          value={data.roomID.ratting}
                          size={24}
                          isHalf={true}
                          activeColor="#ffd700"
                        /> ({data.roomID.noOfRatting})</h6>
                        <div className="ribbon"><span>Booked</span></div>
                      </div>
                    ) : <p className='noBooking'>There is no booking information</p>}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        )}

        {isAuthenticate() && isAuthenticate().user.userType === 'doner' && (
          <section>
            <Container>
              <Row>
                <Col md={5}>
                  {profileUpdate ? (<div className='userProfile alignBody'>
                    <div className="card">
                      <div className="img">
                        <div className="uploadBox">

                          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                            <div className="image-item__btn-wrapper">
                              <div className="product-img">
                                <img className="styled-img" src={imgUrlBlob} alt="" />
                              </div>
                              <label className="custom-file-upload updateBtn">
                                <input type="file" name="photo" id="photo" onChange={blobImageHandler} required />
                                Upload image
                              </label>
                              <span>OR</span>
                              <button type='submit' className='saveBtn'>Save Image</button>
                            </div>
                          </form>

                        </div>
                      </div>
                      <form>
                        <div className="infos">
                          <div className="name profileEdit">
                            <div className="mb-3 row">
                              <label htmlFor="userfirstname" className="col-sm-3 username">First Name:</label>
                              <div className="col-sm-9">
                                <input type="text" onChange={handelChnage("firstname")} value={values.firstname} className="form-control" id="userfirstname" />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="userlastname" className="col-sm-3 username">Last Name:</label>
                              <div className="col-sm-9">
                                <input type="text" onChange={handelChnage("lastname")} value={values.lastname} className="form-control" id="userlastname" />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="useremail" className="col-sm-3 useremail">Email:</label>
                              <div className="col-sm-9">
                                <input type="email" onChange={handelChnage("email")} value={values.email} className="form-control" id="useremail" required />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label htmlFor="userabout" className="col-sm-3 userabout">Description:</label>
                              <div className="col-sm-9">
                                <textarea className="form-control" id="userabout" rows="3" required onChange={handelChnage("about")} value={values.about}></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="links">
                            <button onClick={clickSubmit} className="view btn">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>) : (<div className='userProfile alignBody'>
                    <div className="card">
                      <div className="img">
                        <ShowImage id={user._id} type='user' />
                      </div>
                      <div className="infos">
                        <div className="name">
                          <h2>Name:   {profileInfo && profileInfo.firstname ? profileInfo.firstname : ""} {profileInfo && profileInfo.lastname ? profileInfo.lastname : ""}</h2>
                          <h4>E-mail: {profileInfo && profileInfo.email ? profileInfo.email : ""}</h4>
                        </div>

                        <p className="text">
                          <span>Description:</span>   {profileInfo && profileInfo.about ? profileInfo.about : ""}
                        </p>
                        <div className="links">
                          <button className="view btn" onClick={updateProfile}>Update</button>
                        </div>
                      </div>
                    </div>
                  </div>)}
                </Col>
                <Col md={7}>
                  <div className='adminBooking'>
                    <h3 className=''>Booking List</h3>
                    {ownerBookingHistory.length && ownerBookingHistory.length ? ownerBookingHistory.map((data, i) =>
                      <div key={i} className="bookingBox">
                        <div className='userImage'>
                          <ShowImage id={data.bookingUserID} type='user' />
                          <button onClick={() => contact(data.bookingUserID)} className='btn contatBtn'>Contact</button>
                        </div>
                        <div className='userRight'>
                          <h1><span>Name:</span> {bookingUser && bookingUser.firstname ? bookingUser.firstname : ''} {bookingUser && bookingUser.lastname ? bookingUser.lastname : ''}</h1>
                          <h1><span>Email:</span> {bookingUser && bookingUser.email ? bookingUser.email : ''}</h1>
                          <h1><span>Room type:</span> {data.roomID.type === "Singleroom" ? "single room" : data.roomID.type === "doubleroom" ? "Double room" : data.roomID.type === "singlehouse" ? "Single house" : ""}</h1>
                          <h1><span>Adult:</span> {data.adult} and <span>Child:</span> {data.child}</h1>
                          <h1><span>Booking time:</span> <Moment format="DD/MM/YYYY">{data.bookingDateStart}</Moment></h1>
                        </div>
                        <div className="ribbon"><span>Booked</span></div>
                      </div>
                    ) : <p className='noBooking'>There is no booking information</p>}


                  </div>
                </Col>
              </Row>
            </Container>

          </section>
        )}



      </Layout>

    </>
  )
}

export default UserProfile

