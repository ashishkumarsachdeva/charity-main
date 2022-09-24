import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticate } from "../../api/auth";
import logo from '../Images/logo.png'

const Navigation = () => {

  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    return navigate("/");

  }
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to="/" className='logo'><img src={logo} alt='logo' /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto navButton" style={{ marginLeft: 'auto' }}>
              <Link to="/">Home</Link>

              {/* Doner profile */}
              {isAuthenticate() && isAuthenticate().user.userType === 'doner' && (
                <>
                <Link to="/chat">Chat</Link>
                <Link to="/addroom">Add Room</Link>
                </>
              )}
              {isAuthenticate() && isAuthenticate().user.userType === 'help' && (
                <>
                <Link to="/chat">Chat</Link>
                </>
              )}
            
              {/* without login */}
              {!isAuthenticate() && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Registration</Link>
                </>
              )}


              {/* with login */}
              {isAuthenticate() && (
                <>
         
                  <Link to="/userprofile">Profile</Link>
                  <button onClick={signout}>Logout</button>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation