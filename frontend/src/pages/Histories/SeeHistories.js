import React, { useState, useRef, useEffect } from 'react';
import './Histories.css';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import HistoriesTr from './HistoriesTr';
import AddHistory from './AddHistory';
import { useSelector } from 'react-redux';
import AddLimit from './AddLimit';
import { useHistory, useLocation } from 'react-router';

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
    const members = location.state.members;
    const haveAssets = location.state.haveAssets;

    const commonInfoStore = useSelector((state) => state.commonInfo);
    const _history = useHistory();

    // 추가버튼 누르면 추가화면이 아래에 뜨게
    const handleAdd = () => {
        setAdd(!add);
        setModify(false);
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
                              houseType: data.houseType,
                              ranking: data.ranking,
                              result: data.result,
                              preliminaryNumber: data.preliminaryNumber,
                              winningDate: data.winningDate,
                              raffle: data.raffle,
                              cancelYn: data.cancelYn,
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
        // if (limits && limit) setLimits([...limits, limit]);
        // else if (limit) setLimits([limit]);

        if (data && limit) {
            // setData(
            //     data.map((content, i) => {
            //         console.log(content);
            //         return { ...content, limit: limit };
            //     })
            // );
            // setData((info) => info.filter((item) => item.id !== nextId));
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

        if (data) {
            setName(data.name);
        }
    }, [commonInfoStore.addMem]);

    // asset 삭제하기
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
            houseType: item.houseType,
            ranking: item.ranking,
            result: item.result,
            preliminaryNumber: item.preliminaryNumber,
            winningDate: item.winningDate,
            raffle: item.raffle,
            cancelYn: item.cancelYn,
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
                pos: -2,
                members: members,
            });
        } else {
            _history.goBack(-1);
        }
    };

    return (
        <div className="historiesInfoContainer">
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

            {add && (
                <AddHistory
                    onSaveData={handleHistorySave}
                    setAddLimit={setAddLimit}
                    setAdd={setAdd}
                />
            )}
            {addLimit && <AddLimit onSaveData={handleLimitSave} />}
            {/* {modify && (
                <ModifyHistory
                    selectedData={selected}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleHistoryEditSubmit}
                />
            )} */}
        </div>
    );
};

export default SeeHistories;
