import React, { useState, useEffect } from 'react';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import { useDispatch, useSelector } from 'react-redux';
import { addRestr } from '../../store/actions/commonInfoAction';
import { useHistory, useLocation } from 'react-router';

const AddLimit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const ineligibleDate = location.state.ineligibleDate;
    const pos = location.state.pos;
    const houseState = location.state.houseState;
    const commonInfoStore = useSelector((state) => state.commonInfo);

    const [limit, setLimit] = useState({
        houseMemberChungyakId: null,
        reWinningRestrictedDate: null,
        specialSupplyRestrictedYn: null,
        unqualifiedSubscriberRestrictedDate: null,
        requlatedAreaFirstPriorityRestrictedDate: null,
        additionalPointSystemRestrictedDate: null,
    });

    const onLimitChange = (e) => {
        const { name, value } = e.target;
        setLimit({ ...limit, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRestr(limit));
        setLimit({
            houseMemberChungyakId: null,
            reWinningRestrictedDate: null,
            specialSupplyRestrictedYn: null,
            unqualifiedSubscriberRestrictedDate: null,
            requlatedAreaFirstPriorityRestrictedDate: null,
            additionalPointSystemRestrictedDate: null,
        });
    };

    useEffect(() => {
        const data = commonInfoStore.addChungyak.data;
        const data2 = commonInfoStore.modChungyak.data;
        if (data) {
            setLimit({ ...limit, houseMemberChungyakId: data.id });
        } else if (data2) {
            setLimit({ ...limit, houseMemberChungyakId: data2.id });
        }
    }, [commonInfoStore.addChungyak, commonInfoStore.modChungyak]);

    useEffect(() => {
        const data = commonInfoStore.addRestriction.data;
        if (data) {
            history.goBack(pos, {
                ineligibleDate: ineligibleDate ? ineligibleDate : null,
                houseState: houseState,
            });
        }
    }, [commonInfoStore.addRestriction]);

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
                                <span className="subTitle">???????????????</span>
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
                                <span className="subTitle">??????????????????</span>
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
                                <span className="limitInputText">????????????</span>
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
                                <span className="limitInputText">????????????</span>
                            </td>
                        </tr>
                        <tr className="addLimitFormTableTbodyTr">
                            <td className="addLimitFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    ????????????????????????
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
                                    ??????????????????
                                    <br />
                                    ??????????????????
                                    <br />
                                    1????????????
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
                                <span className="subTitle">?????????????????????</span>
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
                                <div className="buttonContainer">
                                    <SubButton
                                        type="back"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={() => {
                                            history.goBack(pos);
                                        }}
                                    >
                                        ????????????
                                    </SubButton>
                                    <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={handleSubmit}
                                    >
                                        ??????
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
