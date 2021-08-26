import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MemberInfo.css';

function logo() {
    <h3> 구성원 정보 입력 </h3>;
}
function MemberInfo() {
    const [inputs, setInputs] = useState({
        name: '',
        birth: '',
        nationality: '',
        relationship: '',
        owner: '',
        marriage: '',
        income: '',
        asset: '',
        history: '',
        value: '',
    });

    const {
        name,
        birth,
        nationality,
        relationship,
        owner,
        marriage,
        income,
        asset,
        history,
    } = inputs;

    const onChange = (e) => {
        const {
            name,
            birth,
            relationship,
            owner,
            marriage,
            income,
            asset,
            history,
            value,
        } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
            [birth]: value,
            [nationality]: value,
            [owner]: value,
            [relationship]: value,
            [marriage]: value,
            [income]: value,
            [asset]: value,
            [history]: value,
        });
    };

    console.log(inputs);

    return (
        <form>
            이름
            <hr />
            <input
                type="text"
                name="name"
                onChange={onChange}
                value={name}
            />{' '}
            <br />
            생년월일
            <hr />
            <input
                type="date"
                name="birth"
                onChange={onChange}
                value={birth}
            />{' '}
            <br />
            내/외국인
            <hr />
            <input
                type="radio"
                name="nationality"
                onChange={onChange}
                value="local"
                checked={nationality === 'local' ? true : false}
            />{' '}
            내국인 <br />
            <input
                type="radio"
                name="nationality"
                onChange={onChange}
                value="foreigner"
                checked={nationality === 'foreigner' ? true : false}
            />{' '}
            외국인 <br />
            신청자와의 관계
            <hr />
            <select
                name="relationship"
                onChange={onChange}
                value={relationship}
            >
                <option value="none"> ---선택--- </option>
                <option value="Partner">배우자의 부모</option>
                <option value="Parent">부모</option>
                <option value="Child">자녀</option>
                <option value="PartnerParent">배우자의 부모</option>
                <option value="ChildPartner">자녀의 배우자</option>
                <option value="Grandparent">조부모</option>
                <option value="Grandchildren">손자녀</option>
                <option value="PartnerGrandparent">배우자의 조부모</option>
                <option value="GrandchildrenPartner">손자녀의 배우자</option>
            </select>{' '}
            <br />
            세대주 여부
            <hr />
            <input
                type="radio"
                name="owner"
                onChange={onChange}
                value="owner"
                checked={owner === 'owner' ? true : false}
            />{' '}
            세대주 이다 <br />
            <input
                type="radio"
                name="owner"
                onChange={onChange}
                value="noneOwner"
                checked={owner === 'noneOwner' ? true : false}
            />{' '}
            세대주가 아니다 <br />
            혼인 여부
            <hr />
            <input
                type="radio"
                name="marriage"
                onChange={onChange}
                value="noneMarried"
                checked={marriage === 'noneMarried' ? true : false}
            />{' '}
            미혼
            <input
                type="radio"
                name="marriage"
                onChange={onChange}
                value="married"
                checked={marriage === 'married' ? true : false}
            />{' '}
            기혼 <br />
            월 평균 소득
            <hr />
            <input
                type="number"
                name="income"
                onChange={onChange}
                value={income}
            />{' '}
            원 <br />
            자산
            <hr />
            <input
                type="number"
                name="asset"
                onChange={onChange}
                value={asset}
            />{' '}
            ㎡ <br />
            청약 당첨 이력
            <hr />
            <input
                type="radio"
                name="history"
                onChange={onChange}
                value="exist"
                checked={history === 'exist' ? true : false}
            />{' '}
            당첨 이력 존재
            <input
                type="radio"
                name="usage"
                onChange={onChange}
                value="none"
                checked={history === 'none' ? true : false}
            />{' '}
            당첨 이력 전무 <br />
            <Link to="/board">
                <button id="submit" type="reset">
                    {' '}
                    취소{' '}
                </button>
            </Link>
            <Link to="/common/memberHousing">
                <button id="submit" type="submit">
                    {' '}
                    다음{' '}
                </button>
            </Link>
            <div>
                <b> 구성원 정보 </b> <br />
                이름: {name} <br />
                생년월일: {birth} <br />
                내/외국인: {nationality} <br />
                신청자와의 관계: {relationship} <br />
                세대주 여부: {owner} <br />
                혼인 여부: {marriage} <br />월 평균 소득: {income} <br />
                자산: {asset} <br />
                당청 이력 유무 {history}
            </div>
        </form>
    );
}
export default MemberInfo;
