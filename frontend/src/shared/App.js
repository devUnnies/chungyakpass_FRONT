import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Main, Login, Signup, CommonInput } from "../pages";
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
          <Route path="/common" component={CommonInput} />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
