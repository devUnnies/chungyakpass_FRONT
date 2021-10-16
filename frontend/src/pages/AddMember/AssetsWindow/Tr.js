import React from 'react';
import Td from './Td';
import './AssetsWindow.css';

const Tr = ({ data, handleRemove, handleEdit }) => {
    return (
        <tbody className="allInfoTbody">
            {data?.map((item) => {
                return (
                    <Td
                        key={item.id}
                        item={item}
                        handleRemove={handleRemove}
                        handleEdit={handleEdit}
                    />
                );
            })}
        </tbody>
    );
};

export default Tr;
