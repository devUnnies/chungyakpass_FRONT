import { React } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

const data = {
  category: [
    {
      idx: 0,
      name: "청약자격확인",
      link: "",
      subcategory: [
        {
          idx: 0,
          name: "한눈에보기",
          link: "/common/personal",
        },
        {
          idx: 1,
          name: "유형별",
          link: "",
          subcategory: [
            {
              idx: 0,
              name: "일반공급",
              link: "/supply/apartmentInfo",
              subcategory: [
                {
                  idx: 0,
                  name: "국민주택",
                  link: "/supply/normal/nation"
                },
                {
                  idx: 1,
                  name: "민영주택",
                  link: "/supply/normal/private"
                }
              ]
            },
            {
              idx: 1,
              name: "특별공급",
              link: "/supply/special",
              // subcategory: [
              //   {
              //     idx: 0,
              //     name: "신혼부부",
              //     link: "/supply/special/newlymarried",
              //   },
              //   {
              //     idx: 1,
              //     name: "다자녀가구",
              //     link: "/supply/special/multiplechildren",
              //   },
              //   {
              //     idx: 2,
              //     name: "노부모부양",
              //     link: "/supply/special/oldparentsupport",
              //   },
              //   {
              //     idx: 3,
              //     name: "생애최초 주택구입",
              //     link: "/supply/special/firsthomepurchase",
              //   },
              //   {
              //     idx: 4,
              //     name: "이전기관종사자 등",
              //     link: "/supply/special/formeragencyworker",
              //   },
              //   {
              //     idx: 5,
              //     name: "외국인",
              //     link: "/supply/special/foreigner",
              //   },
              // ],
            },
          ],
        },
      ],
    },
    {
      idx: 1,
      name: "계산기",
      link: "/signup/member",
      subcategory: [
        {
          idx: 0,
          name: "가점계산기",
          link: "",
        },
        {
          idx: 1,
          name: "배점계산기",
          link: "",
        },
      ],
    },
    {
      idx: 2,
      name: "부적격사례",
      link: "/case",
      subcategory: [],
    },
    {
      idx: 3,
      name: "FAQ",
      link: "/FAQ",
      subcategory: [],
    },
  ],
};

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-subcontainer">
          <div className="login-buttonArea">
            <button className="login-loginButton">
              <NavLink to="/login" className="login-loginButton">
                로그인
              </NavLink>
            </button>
            <button className="login-signUpButton">
              <NavLink to="/signup" className="login-signUpButton">
                회원가입
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logout() {
  return (
    <div className="logout">
      <div className="logout-container">
        <div className="logout-subcontainer">
          <div className="logout-buttonArea">
            <button className="logout-loginButton">
              <NavLink to="/" className="logout-logoutButton">
                로그아웃
              </NavLink>
            </button>
            <button className="logout-mypageButton">
              <NavLink to="/mypage" className="logout-mypageButton">
                마이페이지
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <div className="logo-container">
        <NavLink to="/" className="logo-container">
          <img src={logo} alt="logo" className="logo-image"></img>
          <div className="logo-name">
            청약<i>pass</i>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="nav">
      <div className="nav-container">
        {/** 여러 개의 카테고리를 관리 */}
        <ul className="nav-items">
          {data.category.map((content, i) => {
            return (
              <li className="nav-item">
                <NavLink to={content.link} className="a">
                  {content.name}
                </NavLink>
                <ul className="nav-subItems">
                  {content.subcategory.map((subcontent, j) => {
                    return (
                      <li className="nav-subItem">
                        <NavLink to={subcontent.link} className="a">
                          {subcontent.name}
                        </NavLink>
                        <ul className="nav-subsubItems">
                          {subcontent.subcategory
                            ? subcontent.subcategory.map((subcontent, j) => {
                                return (
                                  <li className="nav-subsubItem">
                                    <NavLink to={subcontent.link} className="a">
                                      {subcontent.name}
                                    </NavLink>
                                    <ul className="nav-subsubsubItems">
                                      {subcontent.subcategory
                                        ? subcontent.subcategory.map(
                                            (subcontent, j) => {
                                              return (
                                                <li className="nav-subsubsubItem">
                                                  <NavLink
                                                    to={subcontent.link}
                                                    className="a"
                                                  >
                                                    {subcontent.name}
                                                  </NavLink>
                                                </li>
                                              );
                                            }
                                          )
                                        : null}
                                    </ul>
                                  </li>
                                );
                              })
                            : null}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const header = () => {
  return (
    <div className="header">
      <Login></Login>
      <Logo></Logo>
      <Nav></Nav>
    </div>
  );
};

export default header;
