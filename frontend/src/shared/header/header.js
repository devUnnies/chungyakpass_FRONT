import { React, useEffect } from 'react';
import './header.css';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import storage from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { signoutWithToken } from '../../store/actions/tokenAction';

const data = {
    category: [
        {
            idx: 0,
            name: '청약자격확인',
            link: '',
            subcategory: [
                {
                    idx: 0,
                    name: '공통정보입력',
                    link: '/addHouseHolder',
                },
                {
                    idx: 1,
                    name: '한눈에보기',
                    link: '',
                },
                {
                    idx: 2,
                    name: '유형별',
                    link: '',
                    subcategory: [
                        {
                            idx: 0,
                            name: '일반공급',
                            link: '/supply/normal',
                            subcategory: [
                                {
                                    idx: 0,
                                    name: '국민주택',
                                    link: '/supply/normal/nation',
                                },
                                {
                                    idx: 1,
                                    name: '민영주택',
                                    link: '/supply/normal/private',
                                },
                            ],
                        },
                        {
                            idx: 1,
                            name: '특별공급',
                            link: '/supply/special',
                        },
                    ],
                },
            ],
        },
        {
            idx: 1,
            name: '계산기',
            link: '',
            subcategory: [
                {
                    idx: 0,
                    name: '가점계산기',
                    link: '',
                },
                {
                    idx: 1,
                    name: '배점계산기',
                    link: '',
                },
            ],
        },
        {
            idx: 2,
            name: '부적격사례',
            link: '/case',
            subcategory: [],
        },
        {
            idx: 3,
            name: 'FAQ',
            link: '/FAQ',
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
                            <NavLink
                                to="/signup"
                                className="login-signUpButton"
                            >
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
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(signoutWithToken());
        history.push('/');
    };

    return (
        <div className="logout">
            <div className="logout-container">
                <div className="logout-subcontainer">
                    <div className="logout-buttonArea">
                        <button
                            className="logout-loginButton"
                            onClick={handleLogout}
                        >
                            <NavLink to="/" className="logout-logoutButton">
                                로그아웃
                            </NavLink>
                        </button>
                        <button className="logout-mypageButton">
                            <NavLink
                                to="/mypage"
                                className="logout-mypageButton"
                            >
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
                            <li className="nav-item" key={i}>
                                <NavLink to={content.link} className="a">
                                    {content.name}
                                </NavLink>
                                <ul className="nav-subItems">
                                    {content.subcategory.map(
                                        (subcontent, j) => {
                                            return (
                                                <li
                                                    className="nav-subItem"
                                                    key={j}
                                                >
                                                    <NavLink
                                                        to={subcontent.link}
                                                        className="a"
                                                    >
                                                        {subcontent.name}
                                                    </NavLink>
                                                    <ul className="nav-subsubItems">
                                                        {subcontent.subcategory
                                                            ? subcontent.subcategory.map(
                                                                  (
                                                                      subcontent,
                                                                      k
                                                                  ) => {
                                                                      return (
                                                                          <li
                                                                              className="nav-subsubItem"
                                                                              key={
                                                                                  k
                                                                              }
                                                                          >
                                                                              <NavLink
                                                                                  to={
                                                                                      subcontent.link
                                                                                  }
                                                                                  className="a"
                                                                              >
                                                                                  {
                                                                                      subcontent.name
                                                                                  }
                                                                              </NavLink>
                                                                              <ul className="nav-subsubsubItems">
                                                                                  {subcontent.subcategory
                                                                                      ? subcontent.subcategory.map(
                                                                                            (
                                                                                                subcontent,
                                                                                                m
                                                                                            ) => {
                                                                                                return (
                                                                                                    <li
                                                                                                        className="nav-subsubsubItem"
                                                                                                        key={
                                                                                                            m
                                                                                                        }
                                                                                                    >
                                                                                                        <NavLink
                                                                                                            to={
                                                                                                                subcontent.link
                                                                                                            }
                                                                                                            className="a"
                                                                                                        >
                                                                                                            {
                                                                                                                subcontent.name
                                                                                                            }
                                                                                                        </NavLink>
                                                                                                    </li>
                                                                                                );
                                                                                            }
                                                                                        )
                                                                                      : null}
                                                                              </ul>
                                                                          </li>
                                                                      );
                                                                  }
                                                              )
                                                            : null}
                                                    </ul>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

const Header = (props) => {
    const tokenStore = useSelector((state) => state.token);

    return (
        <div className="header">
            {tokenStore.token ? <Logout /> : <Login />}
            <Logo></Logo>
            <Nav></Nav>
        </div>
    );
};

export default Header;
