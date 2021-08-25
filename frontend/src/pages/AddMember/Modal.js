import React, { useState } from 'react';
import './Addmember.css';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);

    const onCancel = () => {
        handleCancel();
    };

    const onEditChange = (e) => {
        setEdited({
            ...edited,
            [e.target.name]: e.target.value,
            [e.target.birthDate]: e.target.value,
            [e.target.foreignerYn]: e.target.value,
            [e.target.homelessStartDate]: e.target.value,
            [e.target.relationship]: e.target.value,
            [e.target.householderYn]: e.target.value,
            [e.target.soldierYn]: e.target.value,
            [e.target.isMarried]: e.target.value,
            [e.target.marriageDate]: e.target.value,
            [e.target.income]: e.target.value,
            [e.target.asset]: e.target.value,
            [e.target.history]: e.target.value,
        });
    };

    const onSubmitEdit = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    };

    return (
        <div className="modifyWarraper">
            {/* <div className=""> */}
            {/* <div className="modifyHeaderContainer">
          <h3 className="title"> 구성원 정보 수정하기 </h3>
          <i className="cancel" onClick={onCancel}>
            <CloseCircleOutlined className="cancelIcon" />
          </i>
        </div> */}

            <form onSubmit={onSubmitEdit} className="modifyForm">
                <div>
                    <div> ID: {edited.id} </div>
                    {/* 이름 */}
                    <div className="nameContainer">
                        <span className="subTitle">이름</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="nameInput"
                            type="text"
                            name="name"
                            value={edited.name}
                            onChange={onEditChange}
                            required
                        />{' '}
                        <br />
                    </div>

                    {/* 생년월일 */}
                    <div className="birthDateContainer">
                        <span className="subTitle">생년월일</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="birthdateInput"
                            type="date"
                            name="birthDate"
                            value={edited.birthDate}
                            onChange={onEditChange}
                            required
                        />
                    </div>

                    {/* 외국인인지 */}
                    <div className="foreignerContainer">
                        <span className="subTitle">외국인 여부</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="foreignerInput"
                            type="radio"
                            name="foreignerYn"
                            onChange={onEditChange}
                            value="y"
                            checked={edited.foreignerYn === 'y' ? true : false}
                            required
                        />
                        <span className="foreignerInputText">외국인</span>
                        <input
                            className="foreignerInput"
                            type="radio"
                            name="foreignerYn"
                            onChange={onEditChange}
                            value="n"
                            checked={edited.foreignerYn === 'n' ? true : false}
                            required
                        />
                        <span className="foreignerInputText">내국인</span>
                        <br />
                    </div>

                    {/* 신청자와의 관계 */}
                    <div className="relationshipContainer">
                        <span className="subTitle">신청자와의 관계</span>
                        {/* <hr className="Line" /> */}
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
                            <option value="부모">부모</option>
                            <option value="자녀">자녀</option>
                            <option value="배우자의 부모">배우자의 부모</option>
                            <option value="자녀의 배우자">자녀의 배우자</option>
                            <option value="조부모">조부모</option>
                            <option value="손자녀">손자녀</option>
                            <option value="배우자의 조부모">
                                배우자의 조부모
                            </option>
                            <option value="손자녀의 배우자">
                                손자녀의 배우자
                            </option>
                        </select>
                    </div>

                    {/* 본인을 선택했을 때 나오는 속성 */}
                    {edited.relationship === '본인' ? (
                        <div className="isSoldierContainer">
                            <span className="subTitle">장기복무 여부</span>
                            {/* <hr className="Line" /> */}
                            <input
                                className="isSoldierInput"
                                type="radio"
                                name="soldierYn"
                                onChange={onEditChange}
                                value="y"
                                checked={
                                    edited.soldierYn === 'y' ? true : false
                                }
                            />
                            <span className="isSoldierInputText">예</span>
                            <input
                                className="isSoldierInput"
                                type="radio"
                                name="soldierYn"
                                onChange={onEditChange}
                                value="n"
                                checked={
                                    edited.soldierYn === 'n' ? true : false
                                }
                            />
                            <span className="isSoldierInputText">아니오</span>
                        </div>
                    ) : (
                        <></>
                    )}

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

                    {/* 세대주 여부 */}
                    <div className="householderContainer">
                        <span className="subTitle">세대주 여부</span>
                        {/* <hr className="Line" /> */}
                        <input
                            className="householderInput"
                            type="radio"
                            name="householderYn"
                            onChange={onEditChange}
                            value="y"
                            checked={
                                edited.householderYn === 'y' ? true : false
                            }
                            required
                        />
                        <span className="householderInputText">세대주이다</span>
                        <input
                            className="householderInput"
                            type="radio"
                            name="householderYn"
                            onChange={onEditChange}
                            value="n"
                            checked={
                                edited.householderYn === 'n' ? true : false
                            }
                            required
                        />
                        <span className="householderInputText">
                            세대주가 아니다
                        </span>
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
