import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GeneralSupply.css';

const AptNum = ({ onSaveData }) => {
    const [form, setForm] = useState({
        name: '',
        aptNumInfo: '',
        aptTypeInfo: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(form);
        console.log(form);
        setForm({
            name: '',
            aptNumInfo: '',
            aptTypeInfo: '',
        });
    };

    return (
        <>
            <table className="general_table">
                <tr className="general_phase">
                    <td className="qulificaiton">공고번호</td>
                    <span>
                        <input
                            className="aptNumInput"
                            type="number" // string 타입으로 받음.
                            name="aptNumInfo"
                            value={form.aptNumInfo}
                            onChange={onChange}
                            required
                        />
                    </span>
                </tr>
                <tr className="general_phase">
                    <td className="qulificaiton">주택형</td>
                    <span>
                        <input
                            className="aptTypeInput"
                            type="text" // string 타입으로 받음.
                            name="aptTypeInfo"
                            value={form.aptTypeInfo}
                            onChange={onChange}
                            required
                        />
                    </span>
                </tr>
            </table>
            <Link to="/supply/normal">
                <button type="button"> 다음 </button>
            </Link>
        </>
    );
};

export default AptNum;
