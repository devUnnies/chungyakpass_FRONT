
function PassbookInfo() {
  return (
    <form>
        <label>
            통장 종류
            <hr />
            <select>
                <option selected value = "Jonghab">주택청약종합저축</option>
                <option value = "Jeochug">청약저축</option>
                <option value="Yegeum">청약예금</option>
                <option value = "Bugeum">청약부금</option>
            </select>
        </label>
        <br />
        <label> 
            가입 일자
            <hr />
            <input type = "date" name = "joindate" />
        </label>
        <br />
        <label>
            납입 횟수
            <hr />
            <input type = "number" name = "number"/> 회
        </label>
        <br />
        <label>
            납입 금액
            <hr />
            <input type = "number" name = "price"/> 원
        </label>
        <br />
        <label>
            청약통장 사용이력 여부
            <hr />
            <input type = "radio" name = "marrigae" value = "single" checked = "checked" /> 사용 이력 존재 <br />
            <input type = "radio" name = "marrigae" value = "married" /> 사용 이력 없음
        </label>
        <br />
        <input type = "submit" id = "submit" value = "제출" />
    </form>
  );
}

export default PassbookInfo;
