import React, { useState } from 'react';
import HistoriesTd from './HistoriesTd';
import './Histories.css';

const HistoriesTr = ({ data, handleRemove, handleHistoryEdit }) => {
    return (
        <tbody className="historiesInfoTbody">
            {data?.map((content, i) => {
                return (
                    <HistoriesTd
                        key={i}
                        item={content}
                        handleHistoryEdit={handleHistoryEdit}
                        handleRemove={handleRemove}
                    />
                );
            })}
        </tbody>
    );
};

export default HistoriesTr;
