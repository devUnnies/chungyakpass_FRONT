import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import './Addmember.css';
import MainButton from '../../components/Button/MainButton';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';

const Board = () => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);

    const nextId = useRef(1);

    // useEffect(() => {
    //   axios
    //     .get("http://jsonplaceholder.typeicode.com/users")
    //     .then((res) => setInfo(res.data))
    //     .catch((err) => console.log(err));
    // }, []);

    const handleAdd = () => {
        setAdd(!add);
        setModify(false);
    };

    const handleSave = (data) => {
        // 데이터 수정하기
        if (data.id) {
            // 받아온 데이터 id 가 있을 경우
            setInfo(
                info.map((row) =>
                    data.id === row.id
                        ? {
                              // 가져온 id 가 기존 table id가 같으면
                              // 가져온 데이터 변경
                              id: data.id,
                              name: data.name,
                              birthDate: data.birthDate,
                              foreignerYn: data.foreignerYn,
                              relationship: data.relationship,
                              householderYn: data.householderYn,
                              soldierYn: data.soldierYn,
                              homelessStartDate: data.homelessStartDate,
                              isMarried: data.isMarried,
                              marriageDate: data.marriageDate,
                              income: data.income,
                              asset: data.asset,
                              history: data.history,
                          }
                        : row
                )
            );
        } else {
            // 기존의 데이터 추가하기
            setInfo((info) =>
                info.concat({
                    id: nextId.current,
                    name: data.name,
                    birthDate: data.birthDate,
                    foreignerYn: data.foreignerYn,
                    relationship: data.relationship,
                    householderYn: data.householderYn,
                    soldierYn: data.soldierYn,
                    homelessStartDate: data.homelessStartDate,
                    isMarried: data.isMarried,
                    marriageDate: data.marriageDate,
                    income: data.income,
                    asset: data.asset,
                    history: data.history,
                })
            );
            nextId.current += 1;
        }

        setAdd(false);
    };

    const handleRemove = (id) => {
        setInfo((info) => info.filter((item) => item.id !== id));
    };

    const handleEdit = (item) => {
        setAdd(false);
        setModify(true);
        const selectedData = {
            id: item.id,
            name: item.name,
            birthDate: item.birthDate,
            foreignerYn: item.foreignerYn,
            relationship: item.relationship,
            householderYn: item.householderYn,
            soldierYn: item.soldierYn,
            homelessStartDate: item.homelessStartDate,
            isMarried: item.isMarried,
            marriageDate: item.marriageDate,
            income: item.income,
            asset: item.asset,
            history: item.history,
        };
        console.log(selectedData);
        setSelected(selectedData);
    };

    const handleCancel = () => {
        setModify(false);
    };

    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModify(false);
    };

    const handleInfoSubmit = (info) => {
        console.log('api 보내야 함 !!!!!!');
    };

    return (
        <div className="allInfo">
            <div className="allInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">구성원 정보 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="allInfoThead">
                    <tr className="allInfoTheadTr">
                        <th className="allInfoTheadTrTh"> 번호 </th>
                        <th className="allInfoTheadTrTh"> 이름 </th>
                        <th className="allInfoTheadTrTh"> 생년월일 </th>
                        <th className="allInfoTheadTrTh"> 내/외국인 </th>
                        <th className="allInfoTheadTrTh"> 신청자와의 관계 </th>
                        <th className="allInfoTheadTrTh"> 세대주 여부 </th>
                        <th className="allInfoTheadTrTh"> 장기복무 여부 </th>
                        <th className="allInfoTheadTrTh"> 무주택 시작일 </th>
                        <th className="allInfoTheadTrTh"> 혼인 여부 </th>
                        <th className="allInfoTheadTrTh"> 혼인 신고일 </th>
                        <th className="allInfoTheadTrTh"> 월 평균 소득 </th>
                        <th className="allInfoTheadTrTh"> 자산 </th>
                        <th className="allInfoTheadTrTh"> 청약 당첨 이력 </th>
                        <th className="allInfoTheadTrTh"> 수정 </th>
                        <th className="allInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                <Tr
                    info={info}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                />
            </table>

            <div className="buttonContainer">
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {info !== [] ? (
                    <div
                        className="submitButtonContainer"
                        onClick={handleInfoSubmit}
                    >
                        <CaretRightOutlined className="submitButton" />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {/* <div className="addButton"> */}
            {/* <NavLink to="/common/personal/addMember" className="loginArea-loginButton"> */}
            {/* <MainButton width="80" height="40" paddingLeft="10" paddingTop="10" type="add" onClick={handleAdd}>
            추가하기
          </MainButton> */}
            {/* </NavLink> */}
            {/* </div> */}

            {add && <Post onSaveData={handleSave} />}
            {modify && (
                <Modal
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
};

export default Board;
