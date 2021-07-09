
function MemberHousingInfo() {
    return (
      <form>
          <label>
              주택 소유 여부
              <hr />
              <input type = "radio" name = "house" value = "housing" checked = "checked" /> 소유하고 있다. <br />
              <input type = "radio" name = "house" value = "nonehousing" /> 소유하고 있지 않다.
          </label>
          <br />
          <label> 
              소유 주택 면적
              <hr />
              <input type = "number" name = "area"/> ㎡
          </label>
          <br />
          <label>
              소유 이력 여부
              <hr />
              <input type = "radio" name = "Own" value = "Owned" checked = "checked" /> 소유한 적이 있다. <br />
              <input type = "radio" name = "Own" value = "notOwned" /> 소유한 적이 없다.
          </label>
          <br />
          <label>
              무주택 시작 일
              <hr />
              <input type = "date" name = "Mujutaeg" />
          </label>
          <br />
          <input type = "submit" id = "submit" value = "제출" />
      </form>
    );
  }
  
  export default MemberHousingInfo;
  