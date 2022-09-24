import React from 'react'
import ShowImage from '../ShowImage/ShowImage';
import Moment from 'react-moment';

const Message = ({ message, own }) => {
    return <>
        <div className="position-relative">
            <div className="chat-messages">



                {own ? (<div className="chat-message-right mb-4">
                    <div className='rightImg'>
                        <div className='d-flex'>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                {message.text}
                            </div>
                            <ShowImage type={'user'} id={message.sender} />
                        </div>
                        <div className="text-muted small text-nowrap text-end"><Moment fromNow>{message.createdAt}</Moment></div>
                    </div>
                </div>) :
                    (<div className="chat-message-left pb-4">
                        <div className='leftImg'>
                            <div className='d-flex'>
                                <ShowImage type={'user'} id={message.sender} />
                                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                    {message.text}
                                </div>
                            </div>
                            <div className="text-muted small text-nowrap"><Moment fromNow>{message.createdAt}</Moment></div>

                        </div>

                    </div>)}


            </div>
        </div>

    </>

}

export default Message