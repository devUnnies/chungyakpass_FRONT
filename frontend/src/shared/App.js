import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    Main,
    Login,
    Signup,
    AllowLogin,
    PersonalInfo,
    GeneralMinyeong,
    GeneralMinyeongApi,
    GeneralMinyeongAptNum,
    GeneralKookminApi,
    GeneralKookminAptNum,
    MultiChildTypeSelect,
    MultiChildMinyeongApi,
    MultiChildKookminApi,
    OldParentTypeSelect,
    OldParentKookminApi,
    OldParentKookminAptNum,
    OldParentMinyeongApi,
    OldParentMinyeongAptNum,
    MultiChildMinyeongAptNum,
    MultiChildKookminAptNum,
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
    MultiChildPointAptNum,
    MultiChildPoint,
    OldParentPoint,
    OneParentPoint,
    NewMarriagePoint,
    AddBankbook,
    SelectHouse,
    AddHouse,
    SeeMember,
    AddMember,
    SeeAssets,
    SeeHistories,
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
                    <Route path="/needLogin" component={AllowLogin} />
                    <Route path="/mypage" component={MyPage} />
                    <Route path="/personalRule" component={PersonalRules} />
                    <Route path="/noEmail" component={NoEmail} />
                    <Route path="/sitemap" component={Sitemap} />
                    <Route path="/addBankbook" component={AddBankbook} />
                    <Route path="/selectHouse" component={SelectHouse} />
                    <Route path="/addHouse" component={AddHouse} />
                    <Route path="/members" component={SeeMember} />
                    <Route path="/addMember" component={AddMember} />
                    <Route path="/histories" component={SeeHistories} />
                    <Route path="/assets" component={SeeAssets} />

                    <Route
                        exact
                        path="/addHouseHolder/assetList"
                        component={List}
                    />
                    <Route exact path="/atAGlance" component={AtAGlance} />

                    <Route
                        path="/generalMinyeong"
                        component={GeneralMinyeongApi}
                    />
                    <Route
                        path="/generalMinyeongAptNum"
                        component={GeneralMinyeongAptNum}
                    />
                    <Route
                        path="/generalKookmin"
                        component={GeneralKookminApi}
                    />
                    <Route
                        path="/generalKookminAptNum"
                        component={GeneralKookminAptNum}
                    />
                    <Route
                        path="/specialMultiChildTypeSelect"
                        component={MultiChildTypeSelect}
                    />
                    <Route
                        path="/specialMultiChildMinyeong"
                        component={MultiChildMinyeongApi}
                    />
                    <Route
                        path="/specialMultiChildMinyeongAptNum"
                        component={MultiChildMinyeongAptNum}
                    />
                    <Route
                        path="/specialMultiChildKookmin"
                        component={MultiChildKookminApi}
                    />
                    <Route
                        path="/specialMultiChildKookminAptNum"
                        component={MultiChildKookminAptNum}
                    />
                    <Route
                        path="/specialOldParentMinyeong"
                        component={OldParentMinyeongApi}
                    />
                    <Route
                        path="/specialOldParentMinyeongAptNum"
                        component={OldParentMinyeongAptNum}
                    />
                    <Route
                        path="/specialOldParentTypeSelect"
                        component={OldParentTypeSelect}
                    />
                    <Route
                        path="/specialOldParentKookmin"
                        component={OldParentKookminApi}
                    />
                    <Route
                        path="/specialOldParentKookminAptNum"
                        component={OldParentKookminAptNum}
                    />

                    {/* 순위 확인 페이지 */}
                    <Route path="/firstRank" component={FirstRank} />
                    <Route path="/secondRank" component={SecondRank} />

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
                        path="/point/multiChildAptNum"
                        component={MultiChildPointAptNum}
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
