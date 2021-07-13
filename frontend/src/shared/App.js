import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Main, Login } from "../pages";
import PersonalInfo from "../components/CommonInput/PersonalInfo";
import Header from "./header";
import Footer from "./footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Route exact path="/" component={PersonalInfo} />
        <Route path="/login" component={Login} />
        <Footer></Footer>
      </div>
    );
  }
}

export default App;