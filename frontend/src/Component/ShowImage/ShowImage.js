import React from 'react';
import { API } from '../../config';

const ShowImage = ({ type, id, cssClassName = "" }) => {

    let cls = cssClassName.length > 0 ? `${cssClassName}` : "product-img";
    return (
        <div className={cls}>
            <img src={`${API}/api/${type}/photo/${id}`} alt='user' className="mb-3" ></img>
        </div>
    )
}

export default ShowImage;