import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import "./Addmember.css" 

const Board = () => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [modalOn, setModalOn] = useState(false);

    const nextId = useRef(1);

    useEffect(()=> {
        axios.get('http://jsonplaceholder.typeicode.com/users')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleSave = (data) => {
        // 데이터 수정하기
        if (data.id) { // 받아온 데이터 id 가 있을 경우
            setInfo(
                info.map(row => data.id === row.id ? { // 가져온 id 가 기존 table id가 같으면
                    // 가져온 데이터 변셩
                    id: data.id,
                    name: data.name,
                    birth: data.birth,
                    nationality: data.nationality,
                    relationship: data.relationship,
                    owner: data.owner,
                    marriage: data.marriage,
                    income: data.income,
                    asset: data.asset,
                    history: data.history
                } : row ))
        } else {
            // 기존의 데이터 추가하기
            setInfo(info => info.concat(
                {
                    id: nextId.current,
                    name: data.name,
                    birth: data.birth,
                    nationality: data.nationality,
                    relationship: data.relationship,
                    owner: data.owner,
                    marriage: data.marriage,
                    income: data.income,
                    asset: data.asset,
                    history: data.history
                }
            ))
            nextId.current += 1;
        }
    }

    const handleRemove = (id) => {
        setInfo(info => info.filter(item => item.id !== id));
    }

    const handleEdit = (item) => {
        setModalOn(true);
        const selectedData = {
            id: item.id,
            name: item.name,
            birth: item.birth,
            nationality: item.nationality,
            relationship: item.relationship,
            owner: item.owner,
            marriage: item.marriage,
            income: item.income,
            asset: item.asset,
            history: item.history
        };
        console.log(selectedData);
        setSelected(selectedData)
    };

    const handleCancel = () => {
        setModalOn(false);
    }

    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModalOn(false);
    }

    return (
        <div>
            <div> 구성원 정보 입력 리스트 </div>
            <Link to = '/Post'>
                <button type = "submit"> 추가 </button>
            </Link>
            <br />
            <table border = "1">
                <thead>
                    <th> 번호 </th>
                    <th> 이름 </th>
                    <th> 생년월일 </th>
                    <th> 내/외국인 </th>
                    <th> 신청자와의 관계 </th>
                    <th> 세대주 여부 </th>
                    <th> 혼인 여부 </th>
                    <th> 월 평균 소득 </th>
                    <th> 자산 </th>
                    <th> 청약 당첨 이력 </th>
                    <th> 수정 </th>
                    <th> 삭제 </th>
                </thead>
                <Tr info = {info} handleRemove = {handleRemove} handleEdit = {handleEdit} />
            </table>

            <Post onSaveData = {handleSave} />            
            {modalOn && <Modal selectedData = {selected} handleCancel = {handleCancel} handleEditSubmit = {handleEditSubmit} />}
        </div>
    );
};

export default Board;