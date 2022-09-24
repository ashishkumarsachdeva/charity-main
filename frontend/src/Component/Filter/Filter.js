import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Filter.css';



const Filter = () => {
    return (
        <>

            <div className='searching'>
                <h1>Searching</h1>
                <div className="search-bar">
                    <input type="search" name="search" />
                    <button className="search-btn" type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className='checkboxFilter'>
                    <h1>Filter by Room type</h1>
                    <ul>
                        <li>
                            <input id='singleroom' type="checkbox" />
                            <label htmlFor="singleroom">Single Room</label>
                        </li>
                        <li>
                            <input id='doubleroom' type="checkbox" />
                            <label htmlFor="doubleroom">Double Room</label>
                        </li>
                        <li>
                            <input id='singlehouse' type="checkbox" />
                            <label htmlFor="singlehouse">Single House</label>
                        </li>
                    </ul>
                </div>
                <div className='checkboxFilter'>
                    <h1>Filter by Room location</h1>
                    <ul>
                        <li>
                            <input id='usa' type="checkbox" />
                            <label htmlFor="usa">USA</label>
                        </li>
                        <li>
                            <input id='england' type="checkbox" />
                            <label htmlFor="england">England</label>
                        </li>
                        <li>
                            <input id='india' type="checkbox" />
                            <label htmlFor="india">India</label>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Filter