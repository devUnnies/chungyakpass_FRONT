import React, { useState, useRef, useEffect } from 'react';
import './BankBook.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    delBank,
    getBank,
    modBankDel,
} from '../../store/actions/commonInfoAction';
import SubButton from '../../components/Button/SubButton';
import MainButton from '../../components/Button/MainButton';

const SeeHouse = () => {
    const dispatch = useDispatch();
    const commonInfoStore = useSelector((state) => state.commonInfo);
    const history = useHistory();

    const [account, setAccount] = useState({
        bank: '',
        bankbook: '',
        joinDate: '',
        deposit: 0,
        paymentsCount: 0,
    });

    const handleEdit = () => {
        dispatch(modBankDel());
        history.push('/modBankbook', { item: account });
    };

    const handleRemove = () => {
        if (account.id) {
            if (window.confirm('정말 삭제하시겠습니까?')) {
                alert('삭제가 완료되었습니다.');
            } else {
                return;
            }
            dispatch(delBank(account.id));
        }
    };

    useEffect(() => {
        dispatch(getBank());
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getBank.data;
        if (data) {
            if (data.status === 404) {
                alert(data.message + '\n 통장 정보를 등록해주세요 !');
                history.push('/addBankbook');
            } else {
                setAccount(data);
            }
        }
    }, [commonInfoStore.getBank]);

    return (
        <div className="getBankbookContainer">
            <div className="getBankbookHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">청약통장 조회</span>
            </div>

            <table className="getBankbookTable">
                <tbody className="getBankbookTableTbody">
                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTdSubTitle">
                            <span className="subTitle">개설은행</span>
                        </td>
                        <td className="getBankbookTableTbodyTrTd">
                            <span className="getBankbookTableTbodyTrTdText">
                                {account.bank ? account.bank : null}
                            </span>
                        </td>
                    </tr>
                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTdSubTitle">
                            <span className="subTitle">청약통장종류</span>
                        </td>
                        <td className="getBankbookTableTbodyTrTd">
                            <span className="getBankbookTableTbodyTrTdText">
                                {account.bankbook ? account.bankbook : null}
                            </span>
                        </td>
                    </tr>
                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTdSubTitle">
                            <span className="subTitle">가입일</span>
                        </td>
                        <td className="getBankbookTableTbodyTrTd">
                            <span className="getBankbookTableTbodyTrTdText">
                                {account.joinDate ? account.joinDate : null}
                            </span>
                        </td>
                    </tr>
                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTdSubTitle">
                            <span className="subTitle">예치금액</span>
                        </td>
                        <td className="getBankbookTableTbodyTrTd">
                            <span className="getBankbookTableTbodyTrTdText">
                                {account.deposit ? account.deposit : null}
                            </span>
                            <span> 원</span>
                        </td>
                    </tr>
                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTdSubTitle">
                            <span className="subTitle">납입횟수</span>
                        </td>
                        <td className="">
                            <span className="getBankbookTableTbodyTrTdText">
                                {account.paymentsCount
                                    ? account.paymentsCount
                                    : null}
                            </span>
                            <span> 회</span>
                        </td>
                    </tr>

                    <tr className="getBankbookTableTbodyTr">
                        <td className="getBankbookTableTbodyTrTd" colSpan="2">
                            <div className="saveButtonContainer">
                                {/* 수정 */}
                                <EditFilled
                                    className="modify"
                                    onClick={handleEdit}
                                />
                                {/* 삭제 */}
                                <DeleteFilled
                                    className="delete"
                                    onClick={handleRemove}
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SeeHouse;
