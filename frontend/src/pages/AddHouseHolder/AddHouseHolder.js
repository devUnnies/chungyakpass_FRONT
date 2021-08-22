import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
import data from './data.json';

const AddHouseHolder = () => {
    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        gu: '',
        eupmyeondong: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    const seoul = () => {
        console.log('서울특별시일 때 !!!!!!!!!');
        let result = [];
        data[0].detail.map((content, j) => {
            result.push(
                <option value={content.name} key={j}>
                    {content.name}
                </option>
            );
        });
        return result;
    };

    const incheon = () => {
        console.log('인천광역시일 때 !!!!!!!!!');
        let result = [];
        data[1].detail.map((content, j) => {
            result.push(
                <option value={content.name} key={j}>
                    {content.name}
                </option>
            );
        });
        return result;
    };

    const gyeonggi = () => {
        console.log('경기도일 때 !!!!!!!!!');
        let result = [];
        data[2].detail.map((content, j) => {
            result.push(
                <option value={content.name} key={j}>
                    {content.name}
                </option>
            );
        });
        return result;
    };

    return (
        <div>
            {/* <DaumPostcode style={{ marginTop: 100 }} height={700} /> */}
            <form>
                <select name="sido" value={address.sido} onChange={onChange}>
                    <option value="">시도</option>
                    {data.map((content, i) => {
                        return (
                            <option value={content.name} key={i}>
                                {content.name}
                            </option>
                        );
                    })}
                </select>
                <br />
                <select
                    name="sigungu"
                    value={address.sigungu}
                    onChange={onChange}
                >
                    <option value="">시군구</option>
                    {address.sido === '서울특별시' ? seoul() : null}
                    {address.sido === '인천광역시' ? incheon() : null}
                    {address.sido === '경기도' ? gyeonggi() : null}
                </select>
                <br />
                <select name="gu" value={address.gu} onChange={onChange}>
                    <option value="">구</option>
                </select>
                <br />
                <select
                    name="eupmyeondong"
                    value={address.eupmyeondong}
                    onChange={onChange}
                >
                    <option value="">읍면동</option>
                </select>
            </form>

            {/* 구성원 목록으로 가는 버튼 추가 */}
        </div>
    );
};

export default AddHouseHolder;
