import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from './api/PrivateRoute';
import AddRoom from './Component/AddRoom/AddRoom';
import BookingInfo from './Component/BookingInfo/BookingInfo';
import CateghoryCard from './Component/Card/CateghoryCard';
import { Chat } from './Component/Chat/Chat';
import Donation from './Component/Donation/Donation';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Registration from './Component/Registration/Registration';
import RoomDetail from './Component/RoomDetail/RoomDetail';
import ThankYou from './Component/ThankYou/ThankYou';
import UserProfile from './Component/UserProfile/UserProfile';

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
         {/*
         <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/addroom' element={<AddRoom />}/>
          </Route>
        */}
        <Route exact path='/addroom' element={<AddRoom />}/>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/:dataname" element={<CateghoryCard />}></Route>
          <Route path="/room/:id" element={<BookingInfo />}></Route>
          <Route path='/room/details/:id' element={<RoomDetail />}/>
          <Route path="/thankyou" element={<ThankYou />}></Route>
          <Route path="/userprofile" element={<UserProfile />}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          <Route path="/donation" element={<Donation/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing