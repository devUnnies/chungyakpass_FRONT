import React, { useEffect, useState } from "react";
import MainButton from "../../components/Button/MainButton";
import "./Addmember.css";

const Post = ({ onSaveData }) => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    foreignerYn: "",
    homelessStartDate: "",
    relationship: "",
    householderYn: "",
    soldierYn: "n",
    homelessStartDate: "",
    isMarried: false,
    marriageDate: "",
    income: "",
    asset: "",
    history: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(form);
    console.log(form);
    setForm({
      name: "",
      birthDate: "",
      foreignerYn: "",
      homelessStartDate: "",
      relationship: "",
      householderYn: "",
      soldierYn: "",
      homelessStartDate: "",
      isMarried: false,
      marriageDate: "",
      income: "",
      asset: "",
      history: "",
    });
  };

  useEffect(()=>{
    console.log("결혼햇냐  "+form.isMarriesd)
  }, [form.isMarried])

  return (
    <>
      {/* <div id="addMember" className="text-x1 font-bold mt-5 mb-2 text-center">
        <h3> 구성원 추가하기 </h3>
      </div> */}
      <form onSubmit={handleSubmit} className="addMemberForm">
        <div className="addMemberFormContainer">

          {/* 이름 */}
          <div className="nameContainer">
            <span className="subTitle">이름</span>
            {/* <hr className="Line" /> */}
            <input
              className="nameInput"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          
          {/* 생년월일 */}
          <div className="birthDateContainer">
            <span className="subTitle">생년월일</span>
            {/* <hr className="Line" /> */}
            <input
              className="birthdateInput"
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={onChange}
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
              onChange={onChange}
              value="y"
              checked={form.foreignerYn === "y" ? true : false}
              required
            />
            <span className="foreignerInputText">외국인</span>
            <input
              className="foreignerInput"
              type="radio"
              name="foreignerYn"
              onChange={onChange}
              value="n"
              checked={form.foreignerYn === "n" ? true : false}
              required
            />
            <span className="foreignerInputText">내국인</span>
          </div>
          
          {/* 신청자와의 관계 */}
          <div className="relationshipContainer">
            <span className="subTitle">신청자와의 관계</span>
            {/* <hr className="Line" /> */}
            <select
              className="relationshipSelect"
              name="relationship"
              value={form.relationship}
              onChange={onChange}
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
              <option value="배우자의 조부모">배우자의 조부모</option>
              <option value="손자녀의 배우자">손자녀의 배우자</option>
            </select>
          </div>

          {/* 본인을 선택했을 때 나오는 속성 */}
          {
            form.relationship === '본인'? (
              <div className="isSoldierContainer">
                <span className="subTitle">장기복무 여부</span>
                  {/* <hr className="Line" /> */}
                  <input
                    className="isSoldierInput"
                    type="radio"
                    name="soldierYn"
                    onChange={onChange}
                    value="y"
                    checked={form.soldierYn === "y" ? true : false}
                  />
                  <span className="isSoldierInputText">예</span>
                  <input
                    className="isSoldierInput"
                    type="radio"
                    name="soldierYn"
                    onChange={onChange}
                    value="n"
                    checked={form.soldierYn === "n" ? true : false}
                  />
                  <span className="isSoldierInputText">아니오</span>
              </div>
            ) : <></>
          }

          {/* 무주택 시작일 */}
          <div className="homelessStartDateContainer">
            <span className="subTitle">무주택시작일</span>
            {/* <hr className="Line" /> */}
            <input
              className="homelessStartDateInput"
              type="date"
              name="homelessStartDate"
              value={form.homelessStartDate}
              onChange={onChange}
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
              onChange={onChange}
              value="y"
              checked={form.householderYn === "y" ? true : false}
              required
            />
            <span className="householderInputText">세대주이다</span>
            <input
              className="householderInput"
              type="radio"
              name="householderYn"
              onChange={onChange}
              value="n"
              checked={form.householderYn === "n" ? true : false}
              required
            />
            <span className="householderInputText">세대주가 아니다</span>
          </div>

          {/* 혼인 여부 */}
          <div className="isMarriedContainer">
            <span className="subTitle">혼인 여부</span>
            {/* <hr className="Line" /> */}
            <input
              className="isMarriedInput"
              type="radio"
              name="isMarried"
              onChange={onChange}
              value="n"
              checked={form.isMarried === "n"? true:false}
            />
            <span className="isMarriedInputText">결혼한 상태가 아닙니다</span>
            <input
              className="isMarriedInput"
              type="radio"
              name="isMarried"
              onChange={onChange}
              value="y"
              checked={form.isMarried === "y"? true:false}
            />
            <span className="isMarriedInputText">결혼한 상태입니다</span>
          </div>
          
          {/* 기혼이면 혼인신고일 받아야 함 */}
          {
            form.isMarried === "y"? (
              <div className="marriedDateContainer">
                <span className="subTitle">혼인신고일</span>
                  {/* <hr className="Line" /> */}
                  <input
                    className="marriedDateInput"
                    type="date"
                    name="marriedDate"
                    value={form.marriedDate}
                    onChange={onChange}
                    required
                  />{" "}
                  <br />
              </div>
            ) : <></>
          }

          {/* 월 평균 소득 */}
          <div className="incomeContainer">
            <span className="subTitle">월 평균 소득</span>
            {/* <hr className="Line" /> */}
            <input
              className="incomeInput"
              type="number"
              name="income"
              onChange={onChange}
              value={form.income}
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
              onChange={onChange}
              value={form.asset}
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
              onChange={onChange}
              value="exist"
              checked={form.history === "exist" ? true : false}
              required
            />{" "}
            <span className="historyInputText">있음</span>
            <input
              className="historyInput"
              type="radio"
              name="history"
              onChange={onChange}
              value="none"
              checked={form.history === "none" ? true : false}
              required
            />{" "}
            <span className="historyInputText">없음</span>
            {form.history === "exist" ? 
              <span className="failMsg">!!!!! 부적격 사례가 있습니다 !!!!!</span>
              : null
            }
          </div>
          
        </div>

        

        <div>
          <MainButton type="submit" className="save" width="80" height="30">
            저장
          </MainButton>
        </div>
      </form>
    </>
  );
};

export default Post;
