import React, { useState, useRef, useEffect } from 'react';
import './Histories.css';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import SubButton from '../../components/Button/SubButton';
import HistoriesTr from './HistoriesTr';
import AddHistory from './AddHistory';
import { useDispatch, useSelector } from 'react-redux';
import AddLimit from './AddLimit';
import { useHistory, useLocation } from 'react-router';
import { addChung, getChung } from '../../store/actions/commonInfoAction';

const SeeHistories = (props) => {
    const [name, setName] = useState();
    const [data, setData] = useState();
    const [history, setHistory] = useState();
    const [histories, setHistories] = useState();
    const [limit, setLimit] = useState();
    const [limits, setLimits] = useState();
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [addLimit, setAddLimit] = useState(false);
    const [modify, setModify] = useState(false);

    const nextId = useRef(0);
    const location = useLocation();
    const memberId = location.state.memberId;
    const haveAssets = location.state.haveAssets;
    const pos = location.state.pos;

    console.log('멤버 아이디 !!!  ' + memberId);

    const commonInfoStore = useSelector((state) => state.commonInfo);
    const _history = useHistory();
    const dispatch = useDispatch();

    // 추가버튼 누르면 추가화면이 아래에 뜨게
    const handleAdd = () => {
        // setAdd(!add);
        // setModify(false);
        _history.push('/addHistory', {
            pos: -1,
            onSaveData: handleHistorySave,
        });
    };

    // 추가 혹은 수정한 값 저장하는 함수
    const handleHistorySave = (data) => {
        // 데이터 수정하기
        if (data.id) {
            // console.log(data.id + '!!!!!');
            // 받아온 데이터 id 가 있을 경우
            setHistory(data);
            setHistories(
                history.map((row) =>
                    data.id === row.id
                        ? {
                              // 가져온 id 가 기존 table id가 같으면
                              // 가져온 데이터 변경
                              id: data.id,
                              houseName: data.houseName,
                              supply: data.supply,
                              specialSupply: data.specialSupply,
                              housingType: data.housingType,
                              ranking: data.ranking,
                              result: data.result,
                              preliminaryNumber: data.preliminaryNumber,
                              winningDate: data.winningDate,
                              raffle: data.raffle,
                              cancelWinYn: data.cancelWinYn,
                              ineligibleYn: data.ineligibleYn,
                              ineligibleDate: data.ineligibleDate,
                          }
                        : row
                )
            );
        } else {
            // console.log(JSON.stringify(data));
            // 기존의 데이터 추가하기
            setHistory(data);
            nextId.current += 1;
        }

        setAdd(false);
    };

    // 추가 혹은 수정한 값 저장하는 함수
    const handleLimitSave = (data) => {
        // 데이터 수정하기
        if (data.id) {
            // console.log(data.id + '!!!!!');
            // 받아온 데이터 id 가 있을 경우
            setLimit(data);
            setLimits(
                limit.map((row) =>
                    data.id === row.id
                        ? {
                              // 가져온 id 가 기존 table id가 같으면
                              // 가져온 데이터 변경
                              reWinningRestrictedDate:
                                  data.reWinningRestrictedDate,
                              specialSupplyRestrictedYn:
                                  data.specialSupplyRestrictedYn,
                              unqualifiedSubscriberRestrictedDate:
                                  data.unqualifiedSubscriberRestrictedDate,
                              requlatedAreaFirstPriorityRestrictedDate:
                                  data.requlatedAreaFirstPriorityRestrictedDate,
                              additionalPointSystemRestrictedDate:
                                  data.additionalPointSystemRestrictedDate,
                          }
                        : row
                )
            );
        } else {
            // console.log(JSON.stringify(data));
            // 기존의 데이터 추가하기
            setLimit(data);
        }

        setAddLimit(false);
        console.log(JSON.stringify(limit));
    };

    useEffect(() => {
        if (memberId) dispatch(getChung(memberId));
    }, []);

    useEffect(() => {
        const temp = commonInfoStore.getChungyak.data;
        if (temp) {
            temp?.map((content, i) => {
                setHistory(content);
                setLimit(content.houseMemberChungyakRestrictionReadDto);
            });
        }
    }, [commonInfoStore.getChungyak]);

    // asset이 변할 때마다 assets에 추가하기
    useEffect(() => {
        if (data && history)
            setData([
                ...data,
                { history: history, limit: null, id: nextId.current },
            ]);
        else if (history)
            setData([{ history: history, limit: null, id: nextId.current }]);
    }, [history]);

    useEffect(() => {
        if (data && limit) {
            const temp = setData((info) =>
                info.filter((item) => item.id !== nextId.current)
            );

            console.log(JSON.stringify(temp));
            if (temp) {
                setData([
                    ...temp,
                    { history: history, limit: limit, id: nextId.current },
                ]);
            } else {
                setData([
                    { history: history, limit: limit, id: nextId.current },
                ]);
            }
        }
    }, [limit]);

    useEffect(() => {
        console.log(JSON.stringify(data), nextId);
    }, [data]);

    useEffect(() => {
        const data = commonInfoStore.addMem.data;
        const modData = commonInfoStore.modMem.data;

        if (data) {
            setName(data.name);
        } else if (modData) {
            setName(modData.name);
        }
    }, [commonInfoStore.addMem, commonInfoStore.modMem]);

    // history 삭제하기
    const handleRemove = (id) => {
        console.log(JSON.stringify(data), id);
        setData((info) => info.filter((item) => item.id !== id));

        nextId.current -= 1;
    };

    // 수정하기
    const handleEdit = (item) => {
        setAdd(false);
        setModify(!modify);
        const selectedData = {
            id: item.id,
            houseName: item.houseName,
            supply: item.supply,
            specialSupply: item.specialSupply,
            housingType: item.housingType,
            ranking: item.ranking,
            result: item.result,
            preliminaryNumber: item.preliminaryNumber,
            winningDate: item.winningDate,
            raffle: item.raffle,
            cancelWinYn: item.cancelWinYn,
            ineligibleYn: item.ineligibleYn,
            ineligibleDate: item.ineligibleDate,
        };
        // console.log(selectedData);
        setSelected(selectedData);
    };

    // 수정 취소하기
    const handleCancel = () => {
        setModify(false);
    };

    // 수정한 값 저장하고 수정 화면 닫기
    const handleHistoryEditSubmit = (item) => {
        // console.log(item);
        handleHistorySave(item);
        setModify(false);
    };

    const handleHistoriesSubmit = () => {
        console.log('이력 목록 !!!! ' + JSON.stringify(histories));
        console.log('자산 있늬 ??? ?' + JSON.stringify(haveAssets));
        // 자산 목록 !!! 으로 !!! 넘겨야 함 !!!!
        if (haveAssets === 'y') {
            _history.push('/assets', {
                ineligibleDate: history.ineligibleDate,
                pos: -3,
            });
        } else {
            _history.goBack(-1);
        }
    };

    return (
        <div className="historiesInfoContainer">
            <div className="menuContainer">
                <div className="oneMenu">
                    <h4 className="oneMenu">세대구성원 등록</h4>
                </div>

                <div className="oneMenuSelect">
                    <h4 className="oneMenuSelect">청약이력 등록</h4>
                </div>

                <div className="oneMenu">
                    <h4 className="oneMenu">자산 등록</h4>
                </div>
            </div>

            <div className="historiesInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">{name}님의 청약 이력 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="historiesInfoThead">
                    <tr className="historiesInfoTheadTr">
                        <th className="historiesInfoTheadTrTh"> 청약이력 </th>
                        <th className="historiesInfoTheadTrTh">
                            {' '}
                            청약제한사항{' '}
                        </th>
                        <th className="historiesInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                {histories !== [] ? (
                    <HistoriesTr
                        data={data}
                        handleRemove={handleRemove}
                        handleEdit={handleEdit}
                    />
                ) : null}
            </table>

            <div className="buttonContainer">
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {histories !== [] ? (
                    <div
                        className="submitButtonContainer"
                        onClick={handleHistoriesSubmit}
                    >
                        <CaretRightOutlined className="submitButton" />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {/* {add && (
                <AddHistory
                    onSaveData={handleHistorySave}
                    setAddLimit={setAddLimit}
                    setAdd={setAdd}
                    memberId={memberId}
                />
            )} */}
            {addLimit && <AddLimit onSaveData={handleLimitSave} />}
            {/* {modify && (
                <ModifyHistory
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleHistoryEditSubmit}
                />
            )} */}

            <div className="backButton">
                <SubButton
                    type="back"
                    className="save"
                    width="80"
                    height="30"
                    onClick={() => {
                        _history.goBack(pos);
                    }}
                >
                    목록으로
                </SubButton>
            </div>
        </div>
    );
};

export default SeeHistories;
