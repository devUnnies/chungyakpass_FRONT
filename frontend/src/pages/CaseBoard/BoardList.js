import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../components/Table/CommonTable'
import CommonTableColumn from '../../components/Table/CommonTableColumn';
import CommonTableRow from '../../components/Table/CommonTableRow';
import { boardList } from '../../Data';
import './Board.css'
 
const BoardList = props => {
  const [ dataList, setDataList ] = useState([]);
 
  useEffect(() => {
    setDataList(boardList);
  }, [ ])
 
  return (
    <>
      <div class = "search_box">
        <select name = "searchCate" id = "searchCate">
          <option value selected = "selected">제목+내용</option>
          <option value = "title">제목</option>
          <option value = "content">내용</option>
        </select>
        <input name = "keyword" placeholder = "Search" />
        <button type = "button" id = "search_btn"> Search </button>
      </div>
      <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
        {
          dataList ? dataList.map((item, index) => {
            return (
              <CommonTableRow key={index}>
                <CommonTableColumn>{ item.no }</CommonTableColumn>
                <CommonTableColumn>
                  <Link to={`/boardView/${item.no}`}>{ item.title }</Link>
                </CommonTableColumn>
                <CommonTableColumn>{ item.createDate }</CommonTableColumn>
                <CommonTableColumn>{ item.readCount }</CommonTableColumn>
              </CommonTableRow>
            )
          }) : ''
        }
      </CommonTable>
    </>
  )
}
 
export default BoardList;