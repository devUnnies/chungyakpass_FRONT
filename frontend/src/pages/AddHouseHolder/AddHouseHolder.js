import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import './AddHouseHolder.css';
import { NavLink, useHistory } from 'react-router-dom';
import MainButton from '../../components/Button/MainButton';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import NextButton from '../../components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { addHouseHolder } from '../../store/actions/commonInfoAction';

const AddHouseHolder = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const tokenStore = useSelector((state) => state.token);
    const commonInfoStore = useSelector((state) => state.commonInfo);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    const [fullAddress, setFullAddress] = useState();
    const [postcode, setPostcode] = useState('');

    const [address, setAddress] = useState({
        sido: '',
        sigungu: '',
        detail: '',
        postcode: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    // useEffect(() => {
    //     // 세대 등록 성공시
    //     if (commonInfoStore.addHouseHolder) {
    //         const data = commonInfoStore.addHouseHolder?.data;
    //         if (data !== null) {
    //             history.push('/addHouseHolder/see');
    //         }
    //     }
    // }, [commonInfoStore.addHouseHolder]);

    // 세대 등록하는 api 연결 예정
    const handleSubmit = useCallback(
        (event) => {
            event.preventDafault();

            const userForm = {
                spouseHouseYn: 'n',
                addressLevel1: address.sido,
                addressLevel2: address.sigungu,
                addressDetail: address.detail,
                zipcode: address.postcode,
            };
            dispatch(addHouseHolder(userForm));
        },
        [address]
    );

    useEffect(() => {
        setAddress({
            ...address,
            sido: fullAddress?.split(' ')[0],
            sigungu: fullAddress?.split(' ')[1],
            detail:
                fullAddress?.split(' ')[1].length === 3
                    ? fullAddress?.substring(7)
                    : fullAddress?.substring(8),
        });
    }, [fullAddress]);

    useEffect(() => {
        setAddress({
            ...address,
            postcode: postcode,
        });
    }, [postcode]);

    return (
        <div className="addHouseHolderView">
            <div className="addHouseHolderHeaderContainer">
                <div className="heightBar"></div>
                <span className="addAddressTitle">세대등록</span>
            </div>

            <br />
            <div className="findAddressButtonWrapper">
                <MainButton
                    width={80}
                    height={30}
                    paddingLeft={10}
                    onClick={openPostCode}
                >
                    주소 찾기
                </MainButton>
            </div>
            <div id="popupDom" className="popupDomContainer">
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode
                            address={fullAddress}
                            setAddress={setFullAddress}
                            postcode={postcode}
                            setPostcode={setPostcode}
                            onClose={closePostCode}
                        />
                    </PopupDom>
                )}
            </div>
            <div className="addHouseHolderContainer">
                <form className="addressFormContainer" onSubmit={handleSubmit}>
                    <table className="addressFormTable">
                        <tbody>
                            <tr>
                                <td className="addressFormLabel">
                                    <label className="addressFormLabel">
                                        우편번호
                                    </label>
                                </td>
                                <td className="addressFormInputPostcode">
                                    <input
                                        className="addressFormInputPostcode"
                                        type="number"
                                        name="postcode"
                                        value={address.postcode}
                                        onChange={onChange}
                                        required
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="addressFormLabel">
                                    <label className="addressFormLabel">
                                        주소
                                    </label>
                                </td>
                                <td className="addressFormInputAddress">
                                    <input
                                        className="addressFormInputAddress"
                                        type="text"
                                        name="detail"
                                        value={fullAddress}
                                        onChange={onChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* 구성원 목록으로 가는 버튼 추가 */}
                    <div className="submitButtonWrapper">
                        <NextButton
                            width={50}
                            height={50}
                            type="submit"
                            fontSize={150}
                            onClick={() => {
                                history.push('/addHouseHolder/see');
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHouseHolder;
