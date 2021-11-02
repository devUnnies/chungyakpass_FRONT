import React from 'react';
import { useHistory } from 'react-router';
import MainButton from '../../../components/Button/MainButton';

const NewlyMarriedTypeSelect = () => {
    const history = useHistory();

    return (
        <div className="specialTypeSelect">
            <div className="specialType_title">
                <h3 className="specialType_mainTitle">
                    특별공급
                    <div className="specialType_subTitle">신혼부부 유형</div>
                </h3>
            </div>
            <hr className="gubun" />

            <div className="typeContainer">
                <MainButton
                    type="button"
                    width="100"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialNewlyMarriedKookminAptNum');
                    }}
                >
                    국민주택
                </MainButton>

                <MainButton
                    type="button"
                    width="100"
                    height="40"
                    fontSize="15"
                    onClick={() => {
                        history.push('/specialNewlyMarriedMinyeongAptNum');
                    }}
                >
                    민영주택
                </MainButton>
            </div>
        </div>
    );
};

export default NewlyMarriedTypeSelect;
