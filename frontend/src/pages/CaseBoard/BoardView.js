import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostByNo } from './Data';
import './Board.css';

const BoardView = ({ history, location, match }) => {
    const [data, setData] = useState({});

    const { no } = match.params;

    useEffect(() => {
        setData(getPostByNo(no));
    }, []);

    return (
        <>
            <div className="board_title">
                <h3 className="board_mainTitle">
                    {' '}
                    부적격 사례{' '}
                    <span className="board_subTitle"> | 게시글 상세 </span>
                </h3>
            </div>
            <div className="postView_wrapper">
                {data ? (
                    <>
                        <div className="postView_row">
                            <label>게시글 번호</label>
                            <label>{data.no}</label>
                        </div>
                        <div className="postView_row">
                            <label>제목</label>
                            <label>{data.title}</label>
                        </div>
                        <div className="postView_row">
                            <label>작성일</label>
                            <label>{data.createDate}</label>
                        </div>
                        <div className="postView_row">
                            <label>작성자</label>
                            <label>{data.writer}</label>
                        </div>
                        <div className="postView_row">
                            <label>내용</label>
                            <Link to="content">
                                <div>{data.content}</div>
                            </Link>
                        </div>
                    </>
                ) : (
                    '해당 게시글을 찾을 수 없습니다.'
                )}
                <button className="goList_btn" onClick={() => history.goBack()}>
                    목록
                </button>
            </div>
        </>
    );
};

export default BoardView;
