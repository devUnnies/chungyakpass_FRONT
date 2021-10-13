import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import './Addmember.css';
import MainButton from '../../components/Button/MainButton';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { delBank, delMem } from '../../store/actions/commonInfoAction';

const Board = (props) => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);

    const [houseId, setHouseId] = useState({
        my: 0,
        spouse: 0,
    });

    const [members, setMembers] = useState([]);

    const [memberId, setMemberId] = useState();

    // console.log('멤버 !! ' + JSON.stringify(members));

    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        detail: '',
        postcode: '',
    });

    const [bankBookId, setBankBookId] = useState();

    const nextId = useRef(1);

    const dispatch = useDispatch();

    const commonInfoStore = useSelector((state) => state.commonInfo);

    useEffect(() => {
        setMembers([commonInfoStore.addMem?.data]);
        setBankBookId([commonInfoStore.addBank?.data]);
    }, []);

    useEffect(() => {
        setMembers([...members, commonInfoStore.addMem?.data]);
    }, [commonInfoStore.addMem?.data]);

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
                              account: data.account,
                              foreignerYn: data.foreignerYn,
                              relationship: data.relationship,
                              householderYn: data.householderYn,
                              spouseYn: data.spouseYn,
                              spouseAddress: data.spouseAddress,
                              spousePostcode: data.spousePostcode,
                              soldierYn: data.soldierYn,
                              homelessStartDate: data.homelessStartDate,
                              isMarried: data.isMarried,
                              marriedDate: data.marriedDate,
                              transferDate: data.transferDate,
                              income: data.income,
                              assets: data.assets,
                              histories: data.histories,
                              limits: data.limits,
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
                    account: data.account,
                    foreignerYn: data.foreignerYn,
                    relationship: data.relationship,
                    householderYn: data.householderYn,
                    spouseYn: data.spouseYn,
                    spouseAddress: data.spouseAddress,
                    spousePostcode: data.spousePostcode,
                    soldierYn: data.soldierYn,
                    homelessStartDate: data.homelessStartDate,
                    isMarried: data.isMarried,
                    marriedDate: data.marriedDate,
                    transferDate: data.transferDate,
                    income: data.income,
                    assets: data.assets,
                    histories: data.histories,
                    limits: data.limits,
                })
            );
            nextId.current += 1;
        }

        setAdd(false);
    };

    const handleRemove = (id) => {
        setInfo((info) => {
            info.filter((item) => item.id !== id);
        });
        nextId.current -= 1;

        dispatch(delBank(bankBookId));
        dispatch(delMem(members.id));
    };

    const handleEdit = (item) => {
        setAdd(false);
        setModify(!modify);
        const selectedData = {
            id: item.id,
            name: item.name,
            birthDate: item.birthDate,
            account: item.account,
            foreignerYn: item.foreignerYn,
            relationship: item.relationship,
            householderYn: item.householderYn,
            spouseYn: item.spouseYn,
            spouseAddress: item.spouseAddress,
            spousePostcode: item.spousePostcode,
            soldierYn: item.soldierYn,
            homelessStartDate: item.homelessStartDate,
            isMarried: item.isMarried,
            marriedDate: item.marriedDate,
            transferDate: item.transferDate,
            income: item.income,
            assets: item.assets,
            histories: item.histories,
            limits: item.limits,
        };
        // console.log(selectedData);
        members.map((content, i) => {
            if (content.name === selectedData.name) setMemberId(content.id);
        });
        setSelected(selectedData);
    };

    const handleCancel = () => {
        setModify(false);
    };

    const handleEditSubmit = (item) => {
        // console.log(item);
        handleSave(item);
        setModify(false);
    };

    useEffect(() => {
        setHouseId({
            ...houseId,
            my: commonInfoStore?.addHouse.data?.houseId,
        });
    }, []);

    useEffect(() => {
        setHouseId({
            ...houseId,
            spouse: commonInfoStore?.addHouse.data?.houseId,
        });
    }, [commonInfoStore.addHouse?.data]);

    const handleInfoSubmit = (info) => {
        // alert('입력이 모두 완료되었습니다 !');
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
                        <th className="allInfoTheadTrTh"> 이름 </th>
                        <th className="allInfoTheadTrTh"> 청약통장정보</th>
                        <th className="allInfoTheadTrTh"> 생년월일 </th>
                        <th className="allInfoTheadTrTh"> 내/외국인 </th>
                        <th className="allInfoTheadTrTh"> 신청자와의 관계 </th>
                        <th className="allInfoTheadTrTh"> 세대주 여부 </th>
                        <th className="allInfoTheadTrTh"> 장기복무 여부 </th>
                        <th className="allInfoTheadTrTh"> 무주택 시작일 </th>
                        <th className="allInfoTheadTrTh"> 전입 신고일 </th>
                        <th className="allInfoTheadTrTh"> 혼인 여부 </th>
                        <th className="allInfoTheadTrTh"> 혼인 신고일 </th>
                        <th className="allInfoTheadTrTh"> 월 평균 소득 </th>
                        <th className="allInfoTheadTrTh"> 자산 </th>
                        <th className="allInfoTheadTrTh"> 청약 당첨 이력 </th>
                        <th className="allInfoTheadTrTh"> 청약 제한 사항 </th>
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
                        onClick={() => handleInfoSubmit(info)}
                    >
                        <CaretRightOutlined className="submitButton" />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {add && (
                <Post
                    onSaveData={handleSave}
                    houseId={houseId}
                    setHouseId={setHouseId}
                    members={members}
                />
            )}
            {modify && (
                <Modal
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleEditSubmit}
                    memberId={memberId}
                />
            )}
        </div>
    );
};

export default Board;
