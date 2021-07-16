import { React } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import data from "../../category.json";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-subcontainer">
          <div className="login-buttonArea">
            <button className="login-loginButton">
              <NavLink to="/login" activeClassName="login-loginButton">
                로그인
              </NavLink>
            </button>
            <button className="login-signUpButton">
              <NavLink to="/signup" activeClassName="login-signUpButton">
                회원가입
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
        <NavLink to="/" activeClassName="logo-container">
          <div className="logo-image">
            <img src={logo} alt="logo"></img>
          </div>
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
                <NavLink to={content.link} activeClassName="a">
                  {content.name}
                </NavLink>
                <ul className="nav-subItems">
                  {content.subcategory.map((subcontent, j) => {
                    return (
                      <li className="nav-subItem">
                        <NavLink to={subcontent.link}>
                          {subcontent.name}
                        </NavLink>
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
