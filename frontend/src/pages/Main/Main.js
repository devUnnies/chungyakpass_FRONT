import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useWindowWidth from '../../components/WindowSize/useWindowWidth';
import './Main.css';
import MainButton from '../../components/Button/MainButton';
import SubButton from '../../components/Button/SubButton';
import TopButton from '../../components/TopButton/TopButton';
import slider1img from '../../assets/slider/slider1.png';
import slider2img from '../../assets/slider/slider2.png';
import slider3img from '../../assets/slider/slider3.png';

const SliderImage = () => {
    const delay = 2500;
    const sources = [slider1img, slider2img, slider3img];
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const windowWidth = useWindowWidth();

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === sources.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {sources.map((content, index) => (
                    <div className="slide" key={index}>
                        <img
                            src={content}
                            alt="sliderimage"
                            width={windowWidth}
                        ></img>
                    </div>
                ))}
            </div>

            <div className="slideshowDots">
                {sources.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${
                            index === idx ? ' active' : ''
                        }`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const LoginArea = () => {
    return (
        <div className="loginArea">
            <NavLink to="/login" className="loginArea-loginButton">
                <MainButton
                    width="100"
                    height="45"
                    paddingLeft="27"
                    paddingTop="10"
                >
                    로그인
                </MainButton>
            </NavLink>
            <NavLink to="/signup" className="loginArea-signupButton">
                <MainButton
                    width="100"
                    height="45"
                    paddingLeft="20"
                    paddingTop="10"
                >
                    회원가입
                </MainButton>
            </NavLink>
            <SubButton
                width="80"
                height="20"
                paddingLeft="8"
                paddingTop="0"
                fontSize="16"
            >
                아이디찾기
            </SubButton>
            <SubButton
                width="100"
                height="20"
                paddingLeft="12"
                paddingTop="0"
                fontSize="16"
            >
                비밀번호찾기
            </SubButton>
        </div>
    );
};

const Tiles = () => {
    return (
        <div className="tiles">
            <div className="title">
                <div className="titleRect"></div>
                주요메뉴
            </div>
            <div className="tile">
                <div className="firstRow">
                    <div className="tile1">
                        <NavLink to="/common" className="tile1Button">
                            <MainButton width="80" height="30" fontSize="13">
                                바로가기
                            </MainButton>
                        </NavLink>
                    </div>
                    <div className="box"></div>
                    <div className="tile2">
                        <NavLink to="" className="tile2Button">
                            <MainButton width="80" height="30" fontSize="13">
                                바로가기
                            </MainButton>
                        </NavLink>
                    </div>
                </div>
                <div className="secondRow">
                    <div className="box"></div>
                    <div className="tile3">
                        <NavLink to="/case" className="tile3Button">
                            <MainButton width="80" height="30" fontSize="13">
                                바로가기
                            </MainButton>
                        </NavLink>
                    </div>
                    <div className="tile4">
                        <NavLink to="/FAQ" className="tile4Button">
                            <MainButton width="80" height="30" fontSize="13">
                                바로가기
                            </MainButton>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Main = () => {
    return (
        <div className="main">
            <SliderImage />
            <div className="container">
                <LoginArea />
                <Tiles />
            </div>
            <TopButton />
        </div>
    );
};

export default Main;
