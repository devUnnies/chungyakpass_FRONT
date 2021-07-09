
function PersonalInfo() {
  return (
    <form>
        <label>
            이름
            <hr />
            <input type = "text" name = "name" />
        </label>
        <br />
        <label> 
            생년월일
            <hr />
            <input type = "date" name = "UserBirth" />
        </label>
        <br />
        <label>
            세대주 여부
            <hr />
            <input type = "radio" name = "householde" value = "head" checked = "checked" /> 세대주이다. <br />
            <input type = "radio" name = "householde" value = "member" /> 세대주가 아니다.
        </label>
        <br />
        <label>
            분리세대 여부
            <hr />
            <input type = "radio" name = "seperation" value = "seperated" checked = "checked" /> 분리세대이다. <br />
            <input type = "radio" name = "seperation" value = "Unseperated" /> 분리세대가 아니다.
        </label>
        <br />
        <label>
            거주지역
            <hr />
            <select>
                <option selected value = "Seoul">서울</option>
                <option value = "Gyeongi">경기</option>
                <option value="Incheon">인천</option>
                <option value = "Busan">부산</option>
            </select>
        </label>
        <br />
        <label>
            혼인 여부
            <hr />
            <input type = "radio" name = "marrigae" value = "single" checked = "checked" /> 기혼 <br />
            <input type = "radio" name = "marrigae" value = "married" /> 미혼
        </label>
        <br />
        <label>
            혼인(예정) 일
            <hr />
            <input type = "date" name="UserMarried" />
        </label>
        <br />
        <label>
            내/외국인
            <hr />
            <input type = "radio" name = "nationality" value = "local" checked = "checked" /> 내국인 <br />
            <input type = "radio" name = "nationality" value = "foreigner" /> 외국인
        </label>
        <br />
        <input type = "submit" id = "submit" value = "제출" />
    </form>
  );
}

export default PersonalInfo;
