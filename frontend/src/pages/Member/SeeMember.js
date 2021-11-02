import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Tr from './SeeMemberTr';
import './Member.css';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import {
    modMem,
    delMem,
    addMemDel,
} from '../../store/actions/commonInfoAction';

const SeeMember = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const location = useLocation();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const houseState = location.state.houseState;
    const membersPrev = location.state.members;
    const houseId = commonInfoStore.addHouse.data?.id;
    const [members, setMembers] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        // if (membersPrev !== []) setMembers(membersPrev);
        console.log(JSON.stringify(members));
    }, [members]);

    const handleAdd = () => {
        // console.log('추가 버튼을 눌렀습니다 !!!');
        dispatch(addMemDel());

        history.push('/addMember', {
            houseState: houseState,
            houseId: houseId,
            members: members,
        });
    };

    const handleEdit = (item) => {
        // 선택한 데이터 재정의
        const selectedData = {
            id: item.id,
            name: item.name,
            birthDate: item.birthDate,
            account: item.account,
            foreignerYn: item.foreignerYn,
            relation: item.relation,
            householderYn: item.householderYn,
            soldierYn: item.soldierYn,
            homelessStartDate: item.homelessStartDate,
            isMarried: item.isMarried,
            marriedDate: item.marriedDate,
            transferDate: item.transferDate,
            income: item.income,
        };
        // console.log(selectedData);
        // 선택한 데이터로 바꾸기
        setSelected(selectedData);
        dispatch(modMem(selectedData));
    };

    const handleRemove = (id) => {
        setMembers((info) => info.filter((item) => item.id != id));
        dispatch(delMem(id));
    };

    useEffect(() => {
        const member = commonInfoStore.addMem.data;

        if (member && membersPrev) {
            if (members === []) {
                setMembers([member]);
            } else {
                setMembers([...membersPrev, member]);
            }
        }
    }, [commonInfoStore.addMem]);

    return (
        <div className="membersInfo">
            <div className="membersInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">
                    구성원 정보 목록 -{' '}
                    {houseState === 'my'
                        ? '신청자 본인 세대'
                        : '배우자 분리 세대'}
                </span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="membersInfoThead">
                    <tr className="membersInfoTheadTr">
                        <th className="membersInfoTheadTrTh"> 이름 </th>
                        <th className="membersInfoTheadTrTh"> 생년월일 </th>
                        <th className="membersInfoTheadTrTh"> 국적 </th>
                        <th className="membersInfoTheadTrTh"> 관계 </th>
                        <th className="membersInfoTheadTrTh">
                            {' '}
                            장기복무 여부{' '}
                        </th>
                        <th className="membersInfoTheadTrTh"> 혼인신고일 </th>
                        <th className="membersInfoTheadTrTh"> 무주택시작일 </th>
                        <th className="membersInfoTheadTrTh"> 전입신고일 </th>
                        <th className="membersInfoTheadTrTh"> 월 평균 소득 </th>
                        <th className="membersInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                <tbody className="membersInfoTbody">
                    {members ? (
                        <Tr
                            members={members}
                            handleEdit={handleEdit}
                            handleRemove={handleRemove}
                        />
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
            <div className="addButtonContainer" onClick={handleAdd}>
                <PlusOutlined className="addButton"></PlusOutlined>
            </div>
        </div>
    );
};

export default SeeMember;
