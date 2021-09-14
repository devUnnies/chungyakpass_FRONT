import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    Main,
    Login,
    Signup,
    AllowLogin,
    PersonalInfo,
    AptNum,
    GeneralSupply,
    GeneralPrivateApi,
    GeneralNationApi,
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
    FirstRank,
    SecondRank,
} from '../pages';
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
                    <Route path="/personalRule" component={PersonalRules} />
                    <Route path="/noEmail" component={NoEmail} />
                    <Route path="/sitemap" component={Sitemap} />
                    <Route
                        exact
                        path="/addHouseHolder"
                        component={AddHouseHolder}
                    />

                    <Route exact path="/addHouseHolder/see" component={Board} />

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
                        path="/normal/private"
                        component={GeneralPrivateApi}
                    />
                    <Route path="/normal/nation" component={GeneralNationApi} />
                    <Route path="/rank/first" component={FirstRank} />
                    <Route path="/rank/second" component={SecondRank} />
                    <Route path="/supply/apartmentInfo" component={AptNum} />
                    <Route path="/board" component={Board} />
                    <Route path="/common/personal/addMember" component={Post} />
                    <Route exact path="/boardView/:no" component={BoardView} />
                    <Route path="/case" component={BoardMain} />
                    <Route path="/FAQ" component={FAQ} />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;
