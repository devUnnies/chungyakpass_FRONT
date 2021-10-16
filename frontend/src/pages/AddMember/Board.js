import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import './Addmember.css';
import MainButton from '../../components/Button/MainButton';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    delBank,
    delMem,
    patHolder,
    addAsse,
    addChung,
    addRestr,
    modAsse,
    modChung,
    modRestr,
} from '../../store/actions/commonInfoAction';

const Board = (props) => {
    const history = useHistory();
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);

    const [houseId, setHouseId] = useState({
        my: 0,
        spouse: 0,
    });

    const nextId = useRef(0);

    const dispatch = useDispatch();

    const commonInfoStore = useSelector((state) => state.commonInfo);

    // 프론트에서 관리 되는 id 변수
    const [_id, set_id] = useState(0);
    // 구성원 등록 후 구성원을 관리하면서 id를 구해야해서 만든 변수
    const [members, setMembers] = useState([]);
    // 구성원 id를 하나씩 관리하기 위한 변수
    const [memberId, setMemberId] = useState();
    // 통장 등록 후 통장 id를 하나씩 관리하기 위한 변수
    const [bankBookId, setBankBookId] = useState(
        commonInfoStore.addBank?.data?.id
    );
    // 자산 등록 후 자산 id를 하나씩 관리하기 위한 변수
    const [propertyId, setPropertyId] = useState(
        commonInfoStore.addProperty?.data?.id
    );
    // 청약이력 등록 후 청약이력 id를 하나씩 관리하기 위한 변수
    const [chungyakId, setChungyakId] = useState(
        commonInfoStore.addChungyak?.data?.id
    );
    // 청약제한사한 등록 후 청약제한사항 id를 하나씩 관리하기 위한 변수
    const [restrictId, setRestrictId] = useState(
        commonInfoStore.addRestriction?.data?.id
    );

    // 세대주 지정을 위해 만든 변수
    const [userTmp, setUserTmp] = useState({});
    // 자산을 등록 혹은 수정하기 위해 만든 임시 배열 변수
    const [assetsTmp, setAssetsTmp] = useState([]);
    // 청약이력을 등록 혹은 수정하기 위해 만든 임시 배열 변수
    const [historyTmp, setHistoryTmp] = useState([]);
    // 제한사항을 등록 혹은 수정하기 위해 만든 임시 배열 변수
    const [limitsTmp, setLimitsTmp] = useState([]);
    // info에서 관리하기 편하게 일부 변수를 배열로 저장
    const [houseInfo, setHouseInfo] = useState({
        relationship: '',
        householderYn: '',
        spouseLive: '',
    });

    const [isEnd, setIsEnd] = useState(false);

    // 세대주 지정
    const onHolderSendValue = () => {
        // 만약 구성원 등록 혹은 수정 액션이 실행돼서 data가 받아진 게 있다면
        if (commonInfoStore.addMem?.data) {
            // 그리고 userTmp가 null이나 undefined이 아니고 빈 리스트도 아니고 세대주로 지정했다면
            if (
                userTmp &&
                userTmp !== {} &&
                houseInfo.householderYn === 'y' &&
                memberId
            ) {
                // 해당 구성원을 세대주로 지정
                return dispatch(patHolder(userTmp));
            }
        }
    };

    useEffect(() => {
        setHouseInfo({ relationship: '', householderYn: '', spouseLive: '' });
    }, [commonInfoStore.patHolder.data]);

    // 자산 등록
    const onAssetsSendValue = () => {
        // 만약 구성원 등록 액션이 실행돼서 data가 받아진 게 있다면
        if (commonInfoStore.addMem?.data && !commonInfoStore.addAsse?.data) {
            // 그리고 assetsTmp가 null이나 undefined이 아니고 빈 리스트도 아니면
            if (assetsTmp && assetsTmp !== []) {
                // 해당 자산을 구성원의 자산으로 등록
                return dispatch(addAsse(assetsTmp));
            }
        }
    };

    // 이력 등록 및 수정
    const onHistorySendValue = () => {
        // 만약 구성원 등록 액션이 실행돼서 data가 받아진 게 있다면
        if (
            commonInfoStore.addMem?.data &&
            !commonInfoStore.addChungyak?.data
        ) {
            // 그리고 historyTmp가 null이나 undefined이 아니고 빈 리스트도 아니면
            if (historyTmp && historyTmp !== []) {
                // 해당 이력을 구성원의 청약이력으로 등록
                return dispatch(addChung(historyTmp));
            }
        }
    };

    // 제한사항 등록
    const onLimitsSendValue = () => {
        // 만약 이력 등록 액션이 실행돼서 data가 받아진 게 있다면
        if (commonInfoStore.addChungyak?.data) {
            // 그리고 limitsTmp가 null이나 undefined이 아니고 빈 리스트도 아니면
            if (limitsTmp && limitsTmp !== []) {
                // 해당 제한사항을 구성원의 제한사항으로 등록
                dispatch(addRestr(limitsTmp));
            }
        }
    };

    // 통장정보 등록 리듀서가 변하면
    useEffect(() => {
        if (commonInfoStore.addBank.data) {
            // 통장정보 id 저장
            setBankBookId(commonInfoStore.addBank.data?.id);
        }
    }, [commonInfoStore.addBank.data]);

    // 구성원이 등록되고 세대주지정 변수가 변하면
    useEffect(() => {
        // 세대주 지정
        onHolderSendValue();
    }, [commonInfoStore.addMem?.data, userTmp, houseInfo]);

    // 자산 변수가 변하면
    useEffect(() => {
        // 자산 등록
        if (isEnd) {
            onAssetsSendValue();
        }
    }, [assetsTmp]);

    // 이력 변수가 변하면
    useEffect(() => {
        // 이력 등록
        onHistorySendValue();
    }, [historyTmp]);

    // 청약이력이 등록되고 제한사항 변수가 변하면
    useEffect(() => {
        // 제한사항 등록
        onLimitsSendValue();
    }, [
        commonInfoStore.addChungyak.data,
        commonInfoStore.modChungyak.data,
        limitsTmp,
    ]);

    // 구성원이 등록돼서 리듀서가 변경되면
    useEffect(() => {
        if (commonInfoStore.addMem.data) {
            // console.log(Object.keys(members).length);
            // members의 길이가 0보다 큰지
            if (Object.keys(members).length > 0) {
                // 0보다 크면 계속해서 뒤에 붙이는 식 (nextId로 접근하기 쉽게 뒤로 붙였음)
                setMembers([...members, commonInfoStore.addMem.data]);
            } else if (Object.keys(members).length === 0) {
                // 0인지 판단
                // 0이라면 하나의 리스트로 저장
                setMembers([commonInfoStore.addMem.data]);
            }
        }
    }, [commonInfoStore.addMem.data]);

    // 멤버 추가되면 자산, 청약신청이력 순으로 저장
    useEffect(() => {
        if (commonInfoStore.addMem.data) {
            // id를 구성원 id로 지정
            setMemberId(commonInfoStore.addMem.data?.id);
            // 세대주 지정을 위해 house id와 member id 지정
            setUserTmp({
                houseId:
                    commonInfoStore.addMem?.data?.relation === '본인'
                        ? houseId.my
                        : houseId.spouse,
                memberId: commonInfoStore.addMem.data?.id,
            });

            info?.map((content, i) => {
                setHouseInfo({
                    relationship: content.relationship,
                    householderYn: content.householderYn,
                    spouseLive: content.spouseLive,
                });
            });

            // 자산 등록을 위해 info 배열 속에서 assets을 찾아
            info?.map((content, i) => {
                content.assets.map((content2, j) => {
                    // console.log(JSON.stringify(content2));
                    // assetsTmp가 빈 리스트이면
                    if (content2.length === 1 && assetsTmp === []) {
                        // 바로 배열을 리스트로 저장
                        setAssetsTmp([
                            {
                                houseMemberId: commonInfoStore.addMem.data?.id,
                                property: content2[j]?.property,
                                saleRightYn: content2[j]?.saleRightYn,
                                residentialBuildingYn:
                                    content2[j]?.residentialBuildingYn,
                                residentialBuilding:
                                    content2[j]?.residentialBuilding,
                                nonResidentialBuilding:
                                    content2[j]?.nonResidentialBuilding,
                                metropolitanBuildingYn:
                                    content2[j]?.metropolitanBuildingYn,
                                exceptionHouseYn: content2[j]?.exceptionHouseYn,
                                acquisitionDate: content2[j]?.acquistionDate,
                                dispositionDate: content2[j]?.dispositionDate,
                                exclusiveArea: content2[j]?.exclusiveArea,
                                amount: content2[j]?.amount,
                                taxBaseDate: content2[j]?.taxBaseDate,
                            },
                        ]);
                    } else if (content2.length > 1) {
                        // 그게 아니면
                        // 역시나 뒤로 붙이는 방식으로 저장
                        setAssetsTmp([
                            ...assetsTmp,
                            {
                                houseMemberId: commonInfoStore.addMem.data?.id,
                                property: content2[j]?.property,
                                saleRightYn: content2[j]?.saleRightYn,
                                residentialBuildingYn:
                                    content2[j]?.residentialBuildingYn,
                                residentialBuilding:
                                    content2[j]?.residentialBuilding,
                                nonResidentialBuilding:
                                    content2[j]?.nonResidentialBuilding,
                                metropolitanBuildingYn:
                                    content2[j]?.metropolitanBuildingYn,
                                exceptionHouseYn: content2[j]?.exceptionHouseYn,
                                acquisitionDate: content2[j]?.acquistionDate,
                                dispositionDate: content2[j]?.dispositionDate,
                                exclusiveArea: content2[j]?.exclusiveArea,
                                amount: content2[j]?.amount,
                                taxBaseDate: content2[j]?.taxBaseDate,
                            },
                        ]);
                    }
                    // console.log(content2.length + assetsTmp.length);
                    if (content2.length === assetsTmp.length) {
                        setAssetsTmp([...new Set(assetsTmp)]);
                        setIsEnd(true);
                    }
                });
            });

            // 이력 등록을 위해 info 배열 속에서 histories를 찾아!!
            info?.map((content, i) => {
                content.histories.map((content2, j) => {
                    // 만약 historyTmp가 빈 리스트이면
                    if (historyTmp === []) {
                        // 배열 자체를 리스트로 저장
                        setHistoryTmp([
                            {
                                houseMemberId: commonInfoStore.addMem.data.id,
                                houseName: content2?.houseName,
                                supply: content2?.supply,
                                specialSupply:
                                    content2?.supply !== '일반공급'
                                        ? content2?.specialSupply
                                        : null,
                                housingType: content2?.housingType,
                                ranking: content2?.ranking,
                                result: content2?.result,
                                preliminaryNumber:
                                    content2?.preliminaryNumber.toString(),
                                winningDate: content2?.winningDate,
                                raffle: content2?.raffle,
                                cancelWinYn: content2?.exclusiveArea,
                            },
                        ]);
                    } else {
                        // 그게 아니면
                        // 뒤로 이어붙이기
                        setHistoryTmp([
                            ...historyTmp,
                            {
                                houseMemberId: commonInfoStore.addMem.data.id,
                                houseName: content2?.houseName,
                                supply: content2?.supply,
                                specialSupply:
                                    content2?.supply !== '일반공급'
                                        ? content2?.specialSupply
                                        : null,
                                housingType: content2?.housingType,
                                ranking: content2?.ranking,
                                result: content2?.result,
                                preliminaryNumber:
                                    content2?.preliminaryNumber.toString(),
                                winningDate: content2?.winningDate,
                                raffle: content2?.raffle,
                                cancelWinYn: content2?.exclusiveArea,
                            },
                        ]);
                    }
                });
            });
        } else {
            // 구성원이 저장되지 않았으면 초기화
            setAssetsTmp([]);
            setHistoryTmp([]);
        }
    }, [commonInfoStore.addMem.data]);

    // 등록한 자산 아이디 저장
    useEffect(() => {
        commonInfoStore?.addProperty?.data?.map((content, i) => {
            setPropertyId(content?.id);
        });
    }, [commonInfoStore?.addProperty?.data]);

    // 등록한 청약 이력 아이디 저장
    useEffect(() => {
        commonInfoStore?.addChungyak?.data?.map((content, i) => {
            setChungyakId(content[i]?.id);
        });
    }, [commonInfoStore?.addChungyak?.data]);

    // 등록한 청약 제한사항 아이디 저장
    useEffect(() => {
        commonInfoStore?.addRestriction?.data?.map((content, i) => {
            setRestrictId(content[i]?.id);
        });
    }, [commonInfoStore?.addRestriction?.data]);

    // 청약신청이력이 저장되고 나면 제한사항 저장
    useEffect(() => {
        info?.map((content, i) => {
            content.limits.map((content2, j) => {
                if (commonInfoStore.addChungyak.data) {
                    if (limitsTmp === []) {
                        setLimitsTmp([
                            {
                                houseMemberChungyakId:
                                    commonInfoStore.addChungyak.data[0].id,
                                reWinningRestrictedDate:
                                    content2?.reWinningRestrictedDate,
                                specialSupplyRestrictedYn:
                                    content2?.specialSupplyRestrictedYn,
                                unqualifiedSubscriberRestrictedDate:
                                    content2?.unqualifiedSubscriberRestrictedDate,
                                regulatedAreaFirstPriorityRestrictedDate:
                                    content2?.requlatedAreaFirstPriorityRestrictedDate,
                                additionalPointSystemRestrictedDate:
                                    content2?.additionalPointSystemRestrictedDate,
                            },
                        ]);
                    } else {
                        setLimitsTmp([
                            ...limitsTmp,
                            {
                                houseMemberChungyakId:
                                    commonInfoStore.addChungyak.data[0].id,
                                reWinningRestrictedDate:
                                    content2?.reWinningRestrictedDate,
                                specialSupplyRestrictedYn:
                                    content2?.specialSupplyRestrictedYn,
                                unqualifiedSubscriberRestrictedDate:
                                    content2?.unqualifiedSubscriberRestrictedDate,
                                regulatedAreaFirstPriorityRestrictedDate:
                                    content2?.requlatedAreaFirstPriorityRestrictedDate,
                                additionalPointSystemRestrictedDate:
                                    content2?.additionalPointSystemRestrictedDate,
                            },
                        ]);
                    }
                } else {
                    setLimitsTmp([]);
                }
            });
        });
    }, [commonInfoStore.addChungyak.data]);

    // info가 변하면
    useEffect(() => {
        // info가 빈 리스트이면
        if (info === []) {
            // 구성원 배열 역시 빈 리스트로 초기화
            setMembers([]);
        }
    }, [info]);

    // add 화면을 열기 위한 함수
    const handleAdd = () => {
        setAdd(!add);
        setModify(false);
    };

    // 저장하기 위한 함수
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
                              spouseLive: data.spouseLive,
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

            set_id(data.id);
        } else {
            // 기존의 데이터 추가하기
            setInfo((info) =>
                info?.concat({
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
                    spouseLive: data.spouseLive,
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
            set_id(nextId.current);
            nextId.current = nextId.current + 1;
        }

        // 저장하고 나면 add 화면 숨기기
        setAdd(false);
    };

    // 삭제하기 위한 함수
    const handleRemove = (id) => {
        // info 배열에서 해당 id를 제외
        setInfo((info) => info.filter((item) => item.id != id));
        // members 배열에서 해당 인덱스의 배열 역시 제외
        setMembers((members) =>
            members.filter((item) => item != members[id - 1])
        );
        // 한개씩 삭제하는 시스템이므로 nextId 역시 1씩 줄어듦
        nextId.current = nextId.current - 1;

        // console.log(JSON.stringify(members[Object.keys(members).length - 2]));

        // 만약 members 배열의 길이가 2보다 크거나 같다면
        if (Object.keys(members).length >= 2)
            setMemberId(members[Object.keys(members).length - 2].id);
        // 1과 같다면
        else if (Object.keys(members).length == 1)
            setMemberId(members[Object.keys(members).length - 1].id);
        // 그외는 0뿐이므로
        else setMemberId(members[Object.keys(members).length]?.id);

        // 통장 id가 존재한다면 통장 삭제
        if (bankBookId) dispatch(delBank(bankBookId));
        // members가 빈 리스트가 아니라면 memberId로 구성원 삭제
        if (members !== []) dispatch(delMem(memberId));
        // 모든 임시 변수들 초기화
        setUserTmp();
        setAssetsTmp();
        setHistoryTmp();
        setLimitsTmp();
    };

    // 수정을 위한 함수
    const handleEdit = (item) => {
        // add 화면 안보이게 하고
        setAdd(false);
        // modify 화면 보이게 하기
        setModify(!modify);

        // 선택한 데이터 재정의
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
            spouseLive: item.spouseLive,
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
        // 선택한 데이터로 바꾸기
        setSelected(selectedData);
    };

    // 수정 화면 안보이게
    const handleCancel = () => {
        setModify(false);
    };

    // 수정 제출 버튼을 위한 함수
    const handleEditSubmit = (item) => {
        handleSave(item);
        setModify(false);
    };

    // 처음에 세대 등록을 하고 이 화면으로 진입하기 때문에
    // houseId 배열에서 본인 세대의 houseId를 지정 가능
    useEffect(() => {
        setHouseId({
            ...houseId,
            my: commonInfoStore?.addHouse.data?.houseId,
        });
    }, []);

    // 만약에 이 화면에서 addHouse 리듀서가 변한다면
    // 그것은 분리세대일 것이다. 그렇기 때문에
    // houseId 배열에서 분리 세대의 houseId를 지정 가능
    useEffect(() => {
        setHouseId({
            ...houseId,
            spouse: commonInfoStore?.addHouse.data?.houseId,
        });
    }, [commonInfoStore.addHouse?.data]);

    // 이 화면에서 다음 버튼을 누르면 메인 화면으로 진입함
    const handleInfoSubmit = (info) => {
        alert('입력이 모두 완료되었습니다 !');
        history.push('/');
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
                {info != [] ? (
                    <Tr
                        info={info}
                        handleRemove={handleRemove}
                        handleEdit={handleEdit}
                    />
                ) : (
                    <></>
                )}
            </table>

            <div className="buttonContainer">
                {/* 멤버 추가 버튼 */}
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {/* 다음 버튼 */}
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

            {/* 추가 화면 */}
            {add && (
                <Post
                    onSaveData={handleSave}
                    houseId={houseId}
                    setHouseId={setHouseId}
                    members={members}
                    setUserFm={setUserTmp}
                    setAssetsFm={setAssetsTmp}
                    setHistoryFm={setHistoryTmp}
                    setHouseInfo={setHouseInfo}
                />
            )}
            {/* 수정 화면 */}
            {modify && (
                <Modal
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleEditSubmit}
                    memberId={memberId}
                    setMemberId={setMemberId}
                    houseId={houseId}
                    setHouseId={setHouseId}
                    bankBookId={bankBookId}
                    setBankBookId={setBankBookId}
                    members={members}
                />
            )}
        </div>
    );
};

export default Board;
