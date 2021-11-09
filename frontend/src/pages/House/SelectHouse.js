import React, { useEffect, useState } from 'react';
import './House.css';
import MainButton from '../../components/Button/MainButton';
import NextButton from '../../components/Button/NextButton';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getHouse } from '../../store/actions/commonInfoAction';

const SelectHouse = () => {
    const [house, setHouse] = useState();
    const [checked, setChecked] = useState({
        my: false,
        spouse: false,
    });
    const [url, setUrl] = useState('/addHouse');

    const dispatch = useDispatch();

    const history = useHistory();
    const commonInfoStore = useSelector((state) => state.commonInfo);

    const onChange = (e) => {
        setHouse(e.target.value);
    };

    useEffect(() => {
        dispatch(getHouse());
    }, []);

    useEffect(() => {
        const data = commonInfoStore.getHouse.data;

        // console.log(JSON.stringify(data));
        if (data) {
            if (data.houseResponseDto) {
                setChecked({ ...checked, my: true });
                setHouse('my');
                setUrl('/members', { houseState: house });
            } else if (data.spouseResponseDto) {
                setChecked({ ...checked, spouse: true });
                setHouse('spouse');
                setUrl('/members', { houseState: house });
            } else if (data.houseResponseDto && data.spouseHouseResponseDto) {
                setChecked({ my: false, spouse: false });
                setUrl('/members', { houseState: house });
            }
        }
    }, [commonInfoStore.getHouse]);

    const handleSubmit = (e) => {
        // e.preventDefault();

        // 해당 하우스 값 세대 등록 페이지로 전달하기
        history.push(url, { houseState: house });
    };

    return (
        <div className="selectHouseContainer">
            <div className="selectHouseHeaderContainer">
                <div className="heightBar"></div>
                <span className="listTitle">세대 선택</span>
            </div>

            <div className="selectHouseFormContainer">
                <table className="selectHouseFormTable">
                    <tbody>
                        <tr>
                            <td className="selectHouseFormTableTrTd">
                                <input
                                    className="selectHouseFormInput"
                                    type="radio"
                                    name="house"
                                    onChange={onChange}
                                    value="my"
                                    checked={house === 'my' ? true : false}
                                    required
                                    disabled={checked.my}
                                />

                                <span> 본인 세대</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="selectHouseFormTableTrTd">
                                <input
                                    className="selectHouseFormInput"
                                    type="radio"
                                    name="house"
                                    onChange={onChange}
                                    value="spouse"
                                    checked={house === 'spouse' ? true : false}
                                    required
                                    disabled={checked.spouse}
                                />

                                <span> 배우자 분리 세대</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="selectHouseFormSaveTd">
                                <div className="saveButtonContainer">
                                    <NextButton
                                        width={50}
                                        height={50}
                                        className="selectHouseButton"
                                        type="selectHouse"
                                        fontSize={150}
                                        onClick={() => handleSubmit()}
                                    />
                                    {/* <MainButton
                                        type="submit"
                                        className="save"
                                        width="80"
                                        height="30"
                                        onClick={handleSubmit}
                                    >
                                        다음
                                    </MainButton> */}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <form
                className="selectHouseForm"
                onSubmit={handleSubmit}
                name="selectHouse"
            ></form> */}
        </div>
    );
};

export default SelectHouse;
