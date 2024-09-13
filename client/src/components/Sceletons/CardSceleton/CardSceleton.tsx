import React from 'react';
import {  Skeleton } from 'antd';


const CardSceleton: React.FC = () => {
    return (
        <div className="pizza-card">
            <div className="image-wrapper">
                <Skeleton.Image active={true} />
            </div>
            <div className="pizza-info">
                <h3 className="pizza-name"><Skeleton /></h3>



            </div>
        </div>
    )
}

export default CardSceleton;