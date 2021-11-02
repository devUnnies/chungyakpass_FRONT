import React, { useState } from 'react';
import HistoriesTd from './HistoriesTd';
import './Histories.css';

const HistoriesTr = ({ data, handleRemove, handleEdit }) => {
    return (
        <tbody className="historiesInfoTbody">
            {data?.map((content, i) => {
                return (
                    <HistoriesTd
                        key={i}
                        item={content}
                        handleEdit={handleEdit}
                        handleRemove={handleRemove}
                    />
                );
            })}
        </tbody>
    );
};

export default HistoriesTr;
