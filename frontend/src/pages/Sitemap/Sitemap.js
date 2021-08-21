import { React } from "react";
import { Link } from "react-router-dom";
import './Sitemap.css'

function Sitemap() {
  return (
    <div className = "Sitemap_main">
    <div className = "Sitemap_Title">
      <h2 className = "s_title">사이트맵</h2>
    </div>

    <div className = "s_container">
        <span className = "s_contents">
          <p className = "number">1</p>
          <div className = "Eng_title">INTRODUCE</div>
            <div className = "Kor_title">기업 소개</div>
            <div className = "sub_menu"><Link to = ''>청약 pass</Link></div>
        </span>

        <span className = "s_contents">
          <p className = "number">2</p>
          <div className = "Eng_title">SERVICE</div>
            <div className = "Kor_title">청약 서비스</div>
            <div className = "sub_menu"><Link to = '/common'>청약자격 확인</Link></div>
            <div className = "sub_menu"><Link to = ''>가 / 배점 계산</Link></div>
        </span>


        <span className = "s_contents">
          <p className = "number">3</p>
          <div className = "Eng_title">INFORMATION</div>
            <div className = "Kor_title">주요 소식</div>
            <div className = "sub_menu"><Link to = '/case'>부적격 사례</Link></div>
            <div className = "sub_menu"><Link to = '/FAQ'>FAQ</Link></div>
        </span>

        <span className = "s_contents">
          <p className = "number">4</p>
          <div className = "Eng_title">CUSTOMER</div>
            <div className = "Kor_title">회원 서비스</div>
            <div className = "sub_menu"><Link to = ''>마이페이지</Link></div>
            <div className = "sub_menu"><Link to = ''>청약이력점검</Link></div>
            <div className = "sub_menu"><Link to = ''>회원정보수정</Link></div>
            <div className = "sub_menu"><Link to = ''>로그인 / 로그아웃</Link></div>
        </span>
    </div>
    </div>
  );
}

export default Sitemap;
