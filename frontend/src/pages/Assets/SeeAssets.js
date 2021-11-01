import React, { useState, useRef, useEffect } from 'react';
import './Assets.css';
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import AssetsTr from './AssetsTr';
import AddAsset from './AddAsset';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { addAsse, patStart } from '../../store/actions/commonInfoAction';

const SeeAssets = () => {
    const [name, setName] = useState();
    const [asset, setAsset] = useState();
    const [assets, setAssets] = useState();
    const [memberId, setMemberId] = useState();
    const [birthDate, setBirthDate] = useState(new Date('1500/01/01'));
    const [startDate, setStartDate] = useState({
        id: 0,
        startDate: birthDate,
    });
    const [startDates, setStartDates] = useState([startDate]);
    const [selected, setSelected] = useState('');
    const [add, setAdd] = useState(false);
    const [modify, setModify] = useState(false);
    const location = useLocation();

    const ineligibleDate = location.state.ineligibleDate;
    const pos = location.state.pos;
    const members = location.state.members;

    const nextId = useRef(1);
    const history = useHistory();
    const dispatch = useDispatch();

    const commonInfoStore = useSelector((state) => state.commonInfo);

    // 자산 각각의 무주택 시작일을 계산해서 가장 나중의 무주택 시작일을 넘겨줘야 함
    const calStartDate = () => {
        setStartDates(
            startDates?.sort((a, b) => {
                return (
                    new Date(Date.parse(b?.startDate)) -
                    new Date(Date.parse(a?.startDate))
                );
            })
        );

        if (startDates) {
            setStartDate({ ...startDate, startDate: startDates[0]?.startDate });
        } else {
            setStartDate(null);
        }

        console.log('마지막에 넘기는 무주택시작일 ~~~ ' + startDate?.startDate);
        // props.getStartDate(startDate);
    };

    // 추가버튼 누르면 추가화면이 아래에 뜨게
    const handleAdd = () => {
        setAdd(!add);
        setStartDate({
            id: 0,
            startDate: birthDate,
        });
        setStartDates([startDate]);
        setModify(false);
    };

    // 추가 혹은 수정한 값 저장하는 함수
    const handleSave = (data) => {
        // 데이터 수정하기
        if (data.id) {
            // console.log(data.id + '!!!!!');
            // 받아온 데이터 id 가 있을 경우
            setAsset(data);
            setAssets(
                assets.map((row) =>
                    data.id === row.id
                        ? {
                              // 가져온 id 가 기존 table id가 같으면
                              // 가져온 데이터 변경
                              id: data.id,
                              property: data.property,
                              saleRightYn: data.saleRightYn,
                              residentialBuildingYn: data.residentialBuildingYn,
                              residentialBuilding: data.residentialBuilding,
                              nonResidentialBuilding:
                                  data.nonResidentialBuilding,
                              metropolitanBuildingYn:
                                  data.metropolitanBuildingYn,
                              exceptionHouseYn: data.exceptionHouseYn,
                              acquistionDate: data.acquistionDate,
                              dispositionDate: data.dispositionDate,
                              exclusiveArea: data.exclusiveArea,
                              amount: data.amount,
                              taxBaseDate: data.taxBaseDate,
                          }
                        : row
                )
            );
        } else {
            // console.log(JSON.stringify(data));
            // 기존의 데이터 추가하기
            setAsset({ ...data, id: nextId.current });

            nextId.current += 1;
        }

        setAdd(false);
    };

    // 멤버 데이터가 있을 경우
    useEffect(() => {
        const member = commonInfoStore.addMem.data;
        // 미리 값 연결해두기
        if (member) {
            setName(member.name);
            setStartDate(member.homelessStartDate);
            setBirthDate(member.birthDay);
            setStartDates([{ id: 0, startDate: startDate }]);
        }
    }, [commonInfoStore.addMem]);

    // asset이 변할 때마다 assets에 추가하기
    useEffect(() => {
        if (assets && asset)
            setAssets([
                ...assets,
                {
                    houseMemberId: memberId,
                    property: asset.property,
                    saleRightYn: asset.saleRightYn,
                    residentialBuildingYn: asset.residentialBuildingYn,
                    residentialBuilding: asset.residentialBuilding,
                    nonResidentialBuilding: asset.nonResidentialBuilding,
                    metropolitanBuildingYn: asset.metropolitanBuildingYn,
                    exceptionHouseYn: asset.exceptionHouseYn,
                    acquistionDate: asset.acquistionDate,
                    dispositionDate: asset.dispositionDate,
                    exclusiveArea: asset.exclusiveArea,
                    amount: asset.amount,
                    taxBaseDate: asset.taxBaseDate,
                },
            ]);
        else if (asset)
            setAssets([
                {
                    houseMemberId: memberId,
                    property: asset.property,
                    saleRightYn: asset.saleRightYn,
                    residentialBuildingYn: asset.residentialBuildingYn,
                    residentialBuilding: asset.residentialBuilding,
                    nonResidentialBuilding: asset.nonResidentialBuilding,
                    metropolitanBuildingYn: asset.metropolitanBuildingYn,
                    exceptionHouseYn: asset.exceptionHouseYn,
                    acquistionDate: asset.acquistionDate,
                    dispositionDate: asset.dispositionDate,
                    exclusiveArea: asset.exclusiveArea,
                    amount: asset.amount,
                    taxBaseDate: asset.taxBaseDate,
                },
            ]);
    }, [asset]);

    // asset 삭제하기
    const handleRemove = (id) => {
        setAssets((info) => info.filter((item) => item.id !== id));
        setStartDates((info) => info.filter((item) => item.id !== id));
        nextId.current -= 1;
    };

    // 수정하기
    const handleEdit = (item) => {
        setAdd(false);
        setModify(!modify);
        const selectedData = {
            id: item.id,
            property: item.property,
            saleRightYn: item.saleRightYn,
            residentialBuildingYn: item.residentialBuildingYn,
            residentialBuilding: item.residentialBuilding,
            nonResidentialBuilding: item.nonResidentialBuilding,
            metropolitanBuildingYn: item.metropolitanBuildingYn,
            exceptionHouseYn: item.exceptionHouseYn,
            acquistionDate: item.acquistionDate,
            dispositionDate: item.dispositionDate,
            exclusiveArea: item.exclusiveArea,
            amount: item.amount,
            taxBaseDate: item.taxBaseDate,
        };
        // console.log(selectedData);
        setSelected(selectedData);
    };

    // 수정 취소하기
    const handleCancel = () => {
        setModify(false);
    };

    // 수정한 값 저장하고 수정 화면 닫기
    const handleEditSubmit = (item) => {
        // console.log(item);
        handleSave(item);
        setModify(false);
    };

    // 자산 목록 api로 넘기기
    const handleAssetsSubmit = () => {
        console.log('자산 목록 !!!! ' + JSON.stringify(assets));
        dispatch(addAsse(assets));

        // 무주택 시작일만 변경하여 수정 요청
        const userStartDate = {
            memberId: memberId,
            homelessStartDate: startDate.startDate,
        };
        dispatch(patStart(userStartDate));

        history.goBack(pos, { members: members });
    };

    useEffect(() => {
        const data = commonInfoStore.addMem.data;
        if (data) {
            setMemberId(data.id);
        }
    }, [commonInfoStore.addMem]);

    useEffect(() => {
        // if (memberId && startDates[0].startDate !== new Date('1500/01/01'))
        calStartDate();
        console.log('목록 ~~~' + JSON.stringify(startDates));
    }, [startDates]);

    return (
        <div className="assetsInfoContainer">
            <div className="assetsInfoHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">{name}님의 자산 정보 목록</span>
            </div>
            <br />
            <table className="tableContainer">
                <thead className="assetsInfoThead">
                    <tr className="assetsInfoTheadTr">
                        <th className="assetsInfoTheadTrTh"> 자산유형 </th>
                        <th className="assetsInfoTheadTrTh"> 분양권유무 </th>
                        <th className="assetsInfoTheadTrTh"> 건물유형 </th>
                        <th className="assetsInfoTheadTrTh"> 수도권여부 </th>
                        <th className="assetsInfoTheadTrTh"> 취득일 </th>
                        <th className="assetsInfoTheadTrTh"> 처분일 </th>
                        <th className="assetsInfoTheadTrTh"> 전용면적 </th>
                        <th className="assetsInfoTheadTrTh"> 금액 </th>
                        <th className="assetsInfoTheadTrTh"> 과세기준일 </th>
                        <th className="assetsInfoTheadTrTh"> 수정 </th>
                        <th className="assetsInfoTheadTrTh"> 삭제 </th>
                    </tr>
                </thead>
                <AssetsTr
                    data={assets}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                />
            </table>

            <div className="buttonContainer">
                <div className="addButtonContainer" onClick={handleAdd}>
                    <PlusOutlined className="addButton"></PlusOutlined>
                </div>

                {assets !== [] ? (
                    <div
                        className="submitButtonContainer"
                        onClick={handleAssetsSubmit}
                    >
                        <CaretRightOutlined className="submitButton" />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {add && (
                <AddAsset
                    onSaveData={handleSave}
                    startDates={startDates}
                    setStartDates={setStartDates}
                    birthDate={birthDate}
                    nextId={nextId}
                    ineligibleDate={ineligibleDate}
                />
            )}
            {/* {modify && (
                <ModifyAsset
                    selectedData={selected}
                    startDates={startDates}
                    setStartDates={setStartDates}
                    handleCancel={handleCancel}
                    handleEditSubmit={handleEditSubmit}
                    birthDate={birthDate}
                    ineligibleDate={ineligibleDate}
                />
            )} */}
        </div>
    );
};

export default SeeAssets;
