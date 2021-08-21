import React from "react";
import Td from './Td';
import './Addmember.css';

const Tr = ({info, handleRemove, handleEdit}) => {
    return (
        <tbody className="allInfoTbody">
            {
                info.map(item => {
                    return (
                        <Td key = {item.id} item = {item} handleRemove = {handleRemove} handleEdit = {handleEdit} />
                    )
                })
            }
        </tbody>
    );
};

export default Tr;