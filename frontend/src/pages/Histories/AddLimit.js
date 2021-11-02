import React, { useState, useEffect } from 'react';
import MainButton from '../../components/Button/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { addRestr } from '../../store/actions/commonInfoAction';

const AddLimit = ({ onSaveData }) => {
    const [limit, setLimit] = useState({
        reWinningRestrictedDate: null,
        specialSupplyRestrictedYn: null,
        unqualifiedSubscriberRestrictedDate: null,
        requlatedAreaFirstPriorityRestrictedDate: null,
        additionalPointSystemRestrictedDate: null,
    });

    const dispatch = useDispatch();
    const commonInfoStore = useSelector((state) => state.commonInfo);

    const onLimitChange = (e) => {
        const { name, value } = e.target;
        setLimit({ ...limit, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(limit);
        dispatch(addRestr([limit]));
        setLimit({
            houseMemberChungyakId: '',
            reWinningRestrictedDate: '',
            specialSupplyRestrictedYn: '',
            unqualifiedSubscriberRestrictedDate: '',
            requlatedAreaFirstPriorityRestrictedDate: '',
            additionalPointSystemRestrictedDate: '',
        });
        // console.log('제한사항 저장 버튼 누름 !!');
    };

    useEffect(() => {
        const data = commonInfoStore.addChungyak.data;
        if (data) {
            setLimit({ ...limit, houseMemberChungyakId: data[0].id });
        }
    }, [commonInfoStore.addChungyak]);

    return (
        <div id="addLimit" className="addLimitFormContainer">
            <form
                onSubmit={handleSubmit}
                className="addLimitForm"
                name="addLimit"
            >
                <table className="addLimitFormTable">
                    <tbody className="addLimitFormTableTbody">
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">재당첨제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="reWinDateInput"
                                    type="date"
                                    name="reWinningRestrictedDate"
                                    value={limit.reWinningRestrictedDate}
                                    onChange={onLimitChange}
                                />
                            </td>
                            <td className="addLimitFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">특별공급제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="limitInput"
                                    type="radio"
                                    name="specialSupplyRestrictedYn"
                                    onChange={onLimitChange}
                                    value="y"
                                    checked={
                                        limit.specialSupplyRestrictedYn === 'y'
                                            ? true
                                            : false
                                    }
                                />{' '}
                                <span className="limitInputText">청약불가</span>
                                <input
                                    className="limitInput"
                                    type="radio"
                                    name="specialSupplyRestrictedYn"
                                    onChange={onLimitChange}
                                    value="n"
                                    checked={
                                        limit.specialSupplyRestrictedYn === 'n'
                                            ? true
                                            : false
                                    }
                                />
                                <span className="limitInputText">청약가능</span>
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    부적격당첨자제한
                                </span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="unSubResDateInput"
                                    type="date"
                                    name="unqualifiedSubscriberRestrictedDate"
                                    value={
                                        limit.unqualifiedSubscriberRestrictedDate
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    투기과열지구
                                    <br />
                                    청약과열지구
                                    <br />
                                    1순위제한
                                </span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="reAreaFirPriRestDateInput"
                                    type="date"
                                    name="requlatedAreaFirstPriorityRestrictedDate"
                                    value={
                                        limit.requlatedAreaFirstPriorityRestrictedDate
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">가점제당첨제한</span>
                            </td>
                            <td className="addLimitFormTableTbodyTrTd">
                                <input
                                    className="addPointSysRestDateInput"
                                    type="date"
                                    name="additionalPointSystemRestrictedDate"
                                    value={
                                        limit.additionalPointSystemRestrictedDate
                                    }
                                    onChange={onLimitChange}
                                />
                            </td>
                        </tr>

                        <tr className="addLimitFormTableTbodyTr">
                            <td
                                colSpan="3"
                                className="addLimitFormTableTbodyTrTd"
                            >
                                <div className="saveButtonContainer">
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={handleSubmit}
                                    >
                                        저장
                                    </MainButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AddLimit;
