import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    Main,
    Login,
    Signup,
    AllowLogin,
    PersonalInfo,
    GeneralSupply,
    GeneralMinyeongApi,
    GeneralMinyeongAptNum,
    GeneralKookminApi,
    GeneralKookminAptNum,
    MultiChildMinyeongApi,
    OldParentKookminApi,
    OldParentMinyeongApi,
    MultiChildMinyeongAptNum,
    FirstRank,
    SecondRank,
    PassbookInfo,
    HousingInfo,
    MemberInfo,
    MemberHousingInfo,
    AddHouseHolder,
    AtAGlance,
    Board,
    Post,
    BoardMain,
    BoardView,
    PersonalRules,
    NoEmail,
    Sitemap,
    FAQ,
    MyPage,
    GeneralMinyeoungPoint,
    MultiChildPoint,
    OldParentPoint,
    OneParentPoint,
    NewMarriagePoint,
} from '../pages';
import List from '../pages/AddMember/AssetsWindow/List';
import Header from './header/header';
import Footer from './footer/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route exact path="/needLogin" component={AllowLogin} />
                    <Route exact path="/mypage" component={MyPage} />
                    <Route path="/personalRule" component={PersonalRules} />
                    <Route path="/noEmail" component={NoEmail} />
                    <Route path="/sitemap" component={Sitemap} />
                    <Route
                        exact
                        path="/addHouseHolder"
                        component={AddHouseHolder}
                    />

                    <Route exact path="/addHouseHolder/see" component={Board} />
                    <Route
                        exact
                        path="/addHouseHolder/assetList"
                        component={List}
                    />
                    <Route exact path="/atAGlance" component={AtAGlance} />
                    <Route
                        exact
                        path="/common/passbook"
                        component={PassbookInfo}
                    />
                    <Route
                        exact
                        path="/common/housing"
                        component={HousingInfo}
                    />
                    <Route exact path="/common/member" component={MemberInfo} />
                    <Route
                        exact
                        path="/common/memberHousing"
                        component={MemberHousingInfo}
                    />
                    <Route path="/supply/normal" component={GeneralSupply} />
                    <Route
                        path="/general/minyeong"
                        component={GeneralMinyeongApi}
                    />
                    <Route
                        path="/general/minyeongAptNum"
                        component={GeneralMinyeongAptNum}
                    />
                    <Route
                        path="/general/kookmin"
                        component={GeneralKookminApi}
                    />
                    <Route
                        path="/general/koominAptNum"
                        component={GeneralKookminAptNum}
                    />
                    <Route
                        path="/special/multiChild/minyeong"
                        component={MultiChildMinyeongApi}
                    />
                    <Route
                        path="/special/multiChildMinyeongAptNum"
                        component={MultiChildMinyeongAptNum}
                    />
                    <Route
                        path="/special/oldParent/minyeong"
                        component={OldParentMinyeongApi}
                    />
                    <Route
                        path="/special/oldParent/kookmin"
                        component={OldParentKookminApi}
                    />

                    {/* 순위 확인 페이지 */}
                    <Route path="/rank/first" component={FirstRank} />
                    <Route path="/rank/second" component={SecondRank} />
                    <Route path="/board" component={Board} />
                    <Route path="/common/personal/addMember" component={Post} />
                    <Route exact path="/boardView/:no" component={BoardView} />
                    <Route path="/case" component={BoardMain} />
                    <Route path="/FAQ" component={FAQ} />

                    {/* 가배점 계산기 */}
                    <Route
                        exact
                        path="/point/generalMinyeoung"
                        component={GeneralMinyeoungPoint}
                    />
                    <Route
                        exact
                        path="/point/multiChild"
                        component={MultiChildPoint}
                    />
                    <Route
                        exact
                        path="/point/oneParent"
                        component={OneParentPoint}
                    />
                    <Route
                        exact
                        path="/point/newMarriage"
                        component={NewMarriagePoint}
                    />
                    <Route
                        exact
                        path="/point/oldParent"
                        component={OldParentPoint}
                    />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;
