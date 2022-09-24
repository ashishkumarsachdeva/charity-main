import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import Layout from '../Layout/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { getConversations, getAllMessages, sendNewMessage } from '../../api/chat';
import { isAuthenticate, userProfile } from '../../api/auth';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';
import { io } from 'socket.io-client'
import { useScrollToBottom } from 'react-scroll-to-bottom';
import ShowImage from '../ShowImage/ShowImage';

export const Chat = () => {


    const { user, token } = isAuthenticate();

    //states
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const [chatUser, setChatUser] = useState()

    //socket
    const socket = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8999');
        socket.current.on("getMessage", data => {
            setArrivalMessage({ sender: data.senderId, text: data.text, createdAt: Date.now() })
        })
    }, [])


    useEffect(() => {
        arrivalMessage && currentChat.members && currentChat.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage])

    }, [arrivalMessage])


    //send user info to socket
    useEffect(() => {
        if (socket) {
            socket.current.emit("addUser", user._id)
            socket.current.on("getUsers", u => {
                // console.log(u)
            })
        }

    }, [user])

    //load data
    useEffect(() => {
        getConversations(user._id, token).then(data => {
            if (data.conversation) {
                setConversation(data.conversation)

            } else {
                console.log("Can't Load Conversation");
            }
        })
    }, [])

    //submit
    const handleClick = (e) => {
        scrollToBottom();
        e.preventDefault();
        const msg = {
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(u => u !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage
        })

        sendNewMessage(user._id, token, msg).then(data => {
            setMessages([...messages, data.result]);
            setNewMessage("")

        }).catch(err => {
            console.log(err)
        })
    }

    //get all messages of a conversation
    useEffect(() => {
        if (currentChat) {

            const friendId = currentChat.members.find((m) => m !== user._id)
            userProfile(friendId, token).then(data => {
                setChatUser(data);
            })

            getAllMessages(token, currentChat._id).then(data => {
                setMessages(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [currentChat]);



    useEffect(() => {
        if (messages.length > 0 && scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])


    // scroll bottom

    const scrollToBottom = useScrollToBottom();



    return (
        <>
            <Layout
                title="Donation"
                description="Donating home"
            >
                <section className="chatBox">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className='chatText'>
                                    <h1>Conversation List</h1>
                                </div>
                            </Col>
                            {conversation.length === 0 ? <Col md={12}>
                                <h1 className='noMsg'>You don't have any conversation yet</h1></Col> :
                                <Col md={12} className='chattingBox'>
                                    <Row>
                                        <Col md={4} className='chatHistory'>
                                            <h2>Chat History</h2>
                                            {conversation.map((con, i) => {
                                                return <div key={`con_${i}`} onClick={() => setCurrentChat(con)}><Conversation conversation={con} userId={user._id} /></div>
                                            })}
                                        </Col>
                                        <Col md={8} >
                                            {currentChat ? <>
                                                <div className='d-flex userInfoChat'>
                                                    <ShowImage id={chatUser ? chatUser._id : ""} type='user' />
                                                    <p>{chatUser && chatUser ? chatUser.firstname : null} {chatUser && chatUser ? chatUser.lastname : null}</p>
                                                </div>
                                                <div className='centerChat'>
                                                    {messages.map((m, i) => {
                                                        return <div ref={scrollRef} key={`msg_${i}`}><Message message={m} own={m.sender === user._id ? true : false} /></div>
                                                    }
                                                    )}

                                                    <div className="flex-grow-0 py-3 px-4 border-top">
                                                        <div className="input-group">
                                                            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className="form-control" placeholder="Type your message" />
                                                            <button className="btn btn-primary" onClick={handleClick}>Send</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <div className="chartHeading"><h1>Please Select a Conversation</h1></div>}



                                        </Col>
                                    </Row>
                                </Col>}

                        </Row>
                    </Container>
                </section>
            </Layout>
        </>
    )
}









