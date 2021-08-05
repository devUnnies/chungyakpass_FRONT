import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, Login, Signup, PersonalInfo, PassbookInfo, HousingInfo, MemberInfo, MemberHousingInfo, Board, Post, BoardMain, BoardView } from "../pages";
import Header from "./header/header";
import Footer from "./footer/footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/common" component={PersonalInfo} />
          <Route path="/passbook" component={PassbookInfo} />
          <Route path="/housing" component={HousingInfo} />
          <Route path="/member" component={MemberInfo} />
          <Route path="/memberHousing" component={MemberHousingInfo} />
          <Route path="/board" component={Board} />
          <Route path="/post" component={Post} />
          <Route exact path='/boardView/:no' component={BoardView} />
          <Route path="/case" component={BoardMain} />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;