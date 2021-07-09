
function MemberInfo() {
  return (
    <form>
        <label>
            이름
            <hr />
            <input type = "text" name = "name" />
        </label>
        <br />
        <label> 
            신청자와의 관계
            <hr />
            <select>
                <option selected value = "Seoul">배우자</option>
                <option value = "Gyeongi">자녀</option>
                <option value = "Busan">부모</option>
                <option value = "Busan">배우자의 자녀</option>
            </select>
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
            <input type = "radio" id = "radio" name = "marrigae" value = "single" checked = "checked" /> 기혼 <br />
            <input type = "radio" id = "radio" name = "marrigae" value = "married" /> 미혼
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

export default MemberInfo;
