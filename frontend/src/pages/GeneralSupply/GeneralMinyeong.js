import React, { useState } from 'react';

function GeneralMinyeong() {
    return (
        <div className="App">
            <GeneralMinyeongApi />
        </div>
    );
}

const GeneralMinyeongApi = (props) => {
    const [data, setData] = useState('');

    return (
        <>
            <div>{data}</div>
            <GeneralMinyeongAptNum setData={setData} />
        </>
    );
};

const GeneralMinyeongAptNum = (props) => {
    return (
        <>
            <button onClick={() => props.setData('data from child')}>
                send data to parent
            </button>
        </>
    );
};

export default GeneralMinyeong;
