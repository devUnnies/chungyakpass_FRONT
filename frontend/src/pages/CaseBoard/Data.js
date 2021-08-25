const boardList = [
    {
        no: 1,
        title: "유학 간 자녀 부양가족 포함했다가 '청약 취소' 날벼락",
        content:
            'http://realty.chosun.com/site/data/html_dir/2020/02/06/2020020601839.html',
        createDate: '2021-08-04',
        writer: '관리자',
    },
    {
        no: 2,
        title: '당첨 포기하면 가족이 10년간 청약금지',
        content: 'https://www.hankyung.com/realestate/article/202107271857i',
        createDate: '2021-08-04',
        writer: '관리자',
    },
    {
        no: 3,
        title: '청약열기 뜨겁던 별내자이, 부적격자 쏟아져',
        content: 'https://www.mk.co.kr/news/realestate/view/2020/11/1209107/',
        createDate: '2021-08-04',
        writer: '관리자',
    },
    {
        no: 4,
        title: '친모 아니라서 아파트 청약당첨 취소',
        content: 'https://www.mk.co.kr/news/realestate/view/2021/03/216959/',
        createDate: '2021-08-04',
        writer: '관리자',
    },
    {
        no: 5,
        title: "수원에도 청약 부적격자 우수수…영통자이도 '줍줍'",
        content: 'https://www.mk.co.kr/news/realestate/view/2020/05/556296/',
        createDate: '2021-08-04',
        writer: '관리자',
    },
];

const getPostByNo = (no) => {
    const array = boardList.filter((x) => x.no == no);
    if (array.length == 1) {
        return array[0];
    }
    return null;
};

export { boardList, getPostByNo };
