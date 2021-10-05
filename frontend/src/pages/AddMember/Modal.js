import React, { useEffect, useState } from 'react';
import PopupDom from '../AddHouseHolder/PopupDom';
import PopupPostCode from '../AddHouseHolder/PopupPostCode';
import MainButton from '../../components/Button/MainButton';
import './Addmember.css';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);
    const [account, setAccount] = useState(selectedData.account);
    const [address, setAddress] = useState(selectedData.spouseAddress);
    const [assets, setAssets] = useState(selectedData.assets);
    const [historyArr, setHistoryArr] = useState(selectedData.histories);
    const [limitArr, setLimitArr] = useState(selectedData.limits);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');

    const onCancel = () => {
        handleCancel();
    };

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    const onAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const onHistoryArrChange = (e) => {
        const { name, value } = e.target;
        setHistoryArr({
            ...historyArr,
            [name]: value,
        });
    };

    const onLimitArrChange = (e) => {
        const { name, value } = e.target;
        setLimitArr({
            ...limitArr,
            [name]: value,
        });
    };

    const onEditChange = (e) => {
        const { name, value } = e.target;
        setEdited({
            ...edited,
            [name]: value,
        });

        // setEdited({
        //     ...edited,
        //     [e.target.name]: e.target.value,
        //     [e.target.birthDate]: e.target.value,
        //     [e.target.foreignerYn]: e.target.value,
        //     [e.target.homelessStartDate]: e.target.value,
        //     [e.target.relationship]: e.target.value,
        //     [e.target.householderYn]: e.target.value,
        //     [e.target.soldierYn]: e.target.value,
        //     [e.target.assets]: assets,
        //     [e.target.isMarried]: e.target.value,
        //     [e.target.marriedDate]:
        //         [e.target.isMarried] === '미혼' ? null : e.target.value,
        //     [e.target.transferDate]: e.target.value,
        //     [e.target.income]: e.target.value,
        // });
    };

    const onSubmitEdit = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    };

    return (
        <div className="modifyWarraper">
            <form onSubmit={onSubmitEdit} className="modifyForm">
                {/* 현버전 수정 화면 !!! */}
                <table className="addMemberFormTable">
                    <tbody className="addMemberFormTableTbody">
                        <tr className="addMemberFormTableTbodyTr">
                            <td colSpan="2">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        기본정보입력
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">이름</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="nameInput"
                                    name="name"
                                    value={edited.name}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTd"></td>
                            <td className="addMemberFormTableTbodyTrTd"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">생년월일</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="birthdateInput"
                                    type="date"
                                    name="birthDate"
                                    value={edited.birthDate}
                                    onChange={onEditChange}
                                    required
                                />
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">외국인 여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onEditChange}
                                    value="y"
                                    checked={
                                        edited.foreignerYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    외국인
                                </span>
                                <input
                                    className="foreignerInput"
                                    type="radio"
                                    name="foreignerYn"
                                    onChange={onEditChange}
                                    value="n"
                                    checked={
                                        edited.foreignerYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="foreignerInputText">
                                    내국인
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTrSpace"></tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td colSpan="3">
                                <div className="normalTitleContainer">
                                    <span className="normalTitle">
                                        구성원 관계 정보 입력
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">
                                    신청자와의 관계
                                </span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <select
                                    className="relationshipSelect"
                                    name="relationship"
                                    value={edited.relationship}
                                    onChange={onEditChange}
                                    required
                                >
                                    <option value=""> ---선택--- </option>
                                    <option value="본인">본인</option>
                                    <option value="배우자">배우자</option>
                                    <option value="모">모</option>
                                    <option value="부">부</option>
                                    <option value="자녀_일반">자녀_일반</option>
                                    <option value="자녀_태아">자녀_태아</option>
                                    <option value="배우자의 모">
                                        배우자의 모
                                    </option>
                                    <option value="배우자의 부">
                                        배우자의 부
                                    </option>
                                    <option value="자녀의 배우자">
                                        자녀의 배우자
                                    </option>
                                    <option value="조모">조모</option>
                                    <option value="조부">조부</option>
                                    <option value="손자녀">손자녀</option>
                                    <option value="손자녀의 배우자">
                                        손자녀의 배우자
                                    </option>
                                    <option value="배우자의 조모">
                                        배우자의 조모
                                    </option>
                                    <option value="배우자의 조부">
                                        배우자의 조부
                                    </option>
                                </select>
                            </td>
                            <td className="addMemberFormTableTbodyTrTdError"></td>
                        </tr>
                        <tr className="addMemberFormTableTbodyTr">
                            <td className="addMemberFormTableTbodyTrTdSubTitle">
                                <span className="subTitle">세대주 여부</span>
                            </td>
                            <td className="addMemberFormTableTbodyTrTd">
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onEditChange}
                                    value="y"
                                    checked={
                                        edited.householderYn === 'y'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    세대주이다
                                </span>
                                <input
                                    className="householderInput"
                                    type="radio"
                                    name="householderYn"
                                    onChange={onEditChange}
                                    value="n"
                                    checked={
                                        edited.householderYn === 'n'
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <span className="householderInputText">
                                    세대주가 아니다
                                </span>
                            </td>
                        </tr>
                        {edited.relationship === '본인' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        장기복무 여부
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.soldierYn === 'y'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        예
                                    </span>
                                    <input
                                        className="isSoldierInput"
                                        type="radio"
                                        name="soldierYn"
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.soldierYn === 'n'
                                                ? true
                                                : false
                                        }
                                    />
                                    <span className="isSoldierInputText">
                                        아니오
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError">
                                    {/* {form.soldierYn === 'n' ? (
                                            <span className="failMsg">
                                                {failMsg}
                                            </span>
                                        ) : null} */}
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '배우자' ? (
                            <tr className="addMemberFormTableTbodyTr">
                                <td className="addMemberFormTableTbodyTrTdSubTitle">
                                    <span className="subTitle">
                                        배우자 분리세대 여부
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTd">
                                    <input
                                        className="isSpouseInput"
                                        type="radio"
                                        name="spouseYn"
                                        onChange={onEditChange}
                                        value="y"
                                        checked={
                                            edited.spouseYn === 'y'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="isSpouseInputText">
                                        예
                                    </span>
                                    <input
                                        className="isSpouseInput"
                                        type="radio"
                                        name="spouseYn"
                                        onChange={onEditChange}
                                        value="n"
                                        checked={
                                            edited.spouseYn === 'n'
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <span className="isSpouseInputText">
                                        아니오
                                    </span>
                                </td>
                                <td className="addMemberFormTableTbodyTrTdError"></td>
                            </tr>
                        ) : null}
                        {edited.relationship === '배우자' &&
                        edited.spouseYn === 'y' ? (
                            <tr
                                className="addMemberFormTableTbodyTr"
                                rowSpan="1"
                            >
                                <td
                                    className="addMemberFormTableTbodyTrTd"
                                    colSpan="3"
                                >
                                    <tr className="addMemberFormTableTbodyTrSpouse">
                                        <td colSpan="3">
                                            <div className="normalTitleContainer">
                                                <span className="normalTitle">
                                                    배우자 분리세대 등록
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="addMemberFormTableTbodyTrSpouseButton">
                                        <td colSpan="3">
                                            <MainButton
                                                width={80}
                                                height={30}
                                                paddingLeft={10}
                                                onClick={openPostCode}
                                            >
                                                주소 찾기
                                            </MainButton>
                                        </td>
                                    </tr>
                                    <tr className="addMemberFormTableTbodyTrSpouse">
                                        <td
                                            className="addMemberFormTableTbodyTrTdSpouse"
                                            colSpan="3"
                                        >
                                            <div
                                                id="popupDom"
                                                className="spousePopupDomContainer"
                                            >
                                                {isPopupOpen && (
                                                    <PopupDom>
                                                        <PopupPostCode
                                                            address={
                                                                fullAddress
                                                            }
                                                            setAddress={
                                                                setFullAddress
                                                            }
                                                            postcode={postcode}
                                                            setPostcode={
                                                                setPostcode
                                                            }
                                                            onClose={
                                                                closePostCode
                                                            }
                                                        />
                                                    </PopupDom>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="addMemberFormTableTbodyTr">
                                        <td className="addMemberFormTableTbodyTrTdSubTitle">
                                            <span className="subTitle">
                                                우편번호
                                            </span>
                                        </td>
                                        <td className="addMemberFormTableTbodyTrTd">
                                            <input
                                                className="postcodeInput"
                                                type="number"
                                                name="postcode"
                                                value={edited.spousePostcode}
                                                onChange={onEditChange}
                                                readOnly
                                            />
                                        </td>
                                        <td className="addMemberFormTableTbodyTrTdError"></td>
                                    </tr>
                                    <tr className="addMemberFormTableTbodyTr">
                                        <td className="addMemberFormTableTbodyTrTdSubTitle">
                                            <span className="subTitle">
                                                주소
                                            </span>
                                        </td>
                                        <td className="addMemberFormTableTbodyTrTd">
                                            <input
                                                className="addressInput"
                                                type="text"
                                                name="address"
                                                value={edited.spouseAddress}
                                                onChange={onEditChange}
                                            />
                                        </td>
                                        <td className="addMemberFormTableTbodyTrTdError"></td>
                                    </tr>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
                {/* 구버전 수정 화면 !!! */}
                <div>
                    {/* 무주택 시작일 */}
                    <div className="homelessStartDateContainer">
                        <span className="subTitle">무주택시작일</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="homelessStartDateInput"
                            type="date"
                            name="homelessStartDate"
                            value={edited.homelessStartDate}
                            onChange={onEditChange}
                            required
                        />
                    </div>

                    {/* 전입신고일 */}
                    <div className="transferDateContainer">
                        <span className="subTitle">전입신고일</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="transferDateInput"
                            type="date"
                            name="transferDate"
                            value={edited.transferDate}
                            onChange={onEditChange}
                            required
                        />
                    </div>

                    {/* 혼인 여부 */}
                    <div className="isMarriedContainer">
                        <span className="subTitle">혼인 여부</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="isMarriedInput"
                            type="radio"
                            name="isMarried"
                            onChange={onEditChange}
                            value="n"
                            checked={edited.isMarried === 'n' ? true : false}
                        />
                        <span className="isMarriedInputText">
                            결혼한 상태가 아닙니다
                        </span>
                        <input
                            className="isMarriedInput"
                            type="radio"
                            name="isMarried"
                            onChange={onEditChange}
                            value="y"
                            checked={edited.isMarried === 'y' ? true : false}
                        />
                        <span className="isMarriedInputText">
                            결혼한 상태입니다
                        </span>
                    </div>

                    {/* 기혼이면 혼인신고일 받아야 함 */}
                    {edited.isMarried === 'y' ? (
                        <div className="marriedDateContainer">
                            <span className="subTitle">혼인신고일</span>
                            {/* <hr className="Line" /> */}
                            <input
                                className="marriedDateInput"
                                type="date"
                                name="marriedDate"
                                value={edited.marriedDate}
                                onChange={onEditChange}
                                required
                            />{' '}
                            <br />
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* 월 평균 소득 */}
                    <div className="incomeContainer">
                        <span className="subTitle">월 평균 소득</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="incomeInput"
                            type="number"
                            name="income"
                            onChange={onEditChange}
                            value={edited.income}
                            required
                        />
                        <span className="incomeUnitText">원</span>
                    </div>

                    {/* 자산 */}
                    <div className="assetContainer">
                        <span className="subTitle">자산</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="assetInput"
                            type="number"
                            name="asset"
                            onChange={onEditChange}
                            value={edited.asset}
                            required
                        />
                        <span className="assetUnitText">㎡</span>
                    </div>

                    {/* 청약당첨이력 */}
                    <div className="historyContainer">
                        <span className="subTitle">청약 당첨 이력</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="historyInput"
                            type="radio"
                            name="history"
                            onChange={onEditChange}
                            value="exist"
                            checked={edited.history === 'exist' ? true : false}
                            required
                        />{' '}
                        <span className="historyInputText">있음</span>
                        <input
                            className="historyInput"
                            type="radio"
                            name="history"
                            onChange={onEditChange}
                            value="none"
                            checked={edited.history === 'none' ? true : false}
                            required
                        />{' '}
                        <span className="historyInputText">없음</span>
                        <br />
                        {edited.history === 'exist' ? (
                            <span className="failMsg">
                                !!!!! 부적격 사례가 있습니다 !!!!!
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="buttonWrapper">
                    {/* <button onClick={onCancel} className="cancelButton"> */}
                    <CloseCircleOutlined
                        onClick={onCancel}
                        className="cancelIcon"
                    />
                    {/* </button> */}
                    {/* <button type="submit" className="submitButton"> */}
                    <CheckCircleOutlined
                        onClick={onSubmitEdit}
                        className="submitIcon"
                    />
                    {/* </button> */}
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};

export default Modal;
