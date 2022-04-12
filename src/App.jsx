import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
import LogOutNavBar from "./components/LogOutNavBar/LogOutNavBar";
import NonBizNavBar from "./components/NonBizNavBar/NonBizNavBar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import AuthGuardRoute from "./components/AuthGuardRoute";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import CardInfoPage from "./pages/CardInfoPage/CardInfoPage";
import CreateCardPage from "./pages/CreateCardPage/CreateCardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OnlyForBizPage from "./pages/OnlyForBizPage/OnlyForBizPage";

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const biz = useSelector((state) => state.auth.biz);

  return (
    <div className="container">
      {loggedIn === true ? (
        biz === true ? (
          <NavBar></NavBar>
        ) : (
          <NonBizNavBar></NonBizNavBar>
        )
      ) : (
        <LogOutNavBar></LogOutNavBar>
      )}

      <ToastContainer />

      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>

        <Route path="/home" exact>
          <HomePage />
        </Route>

        <Route path="/aboutus" exact>
          <AboutUsPage />
        </Route>
        <AuthGuardRoute path="/cardinfo" exact component={CardInfoPage} />

        <AuthGuardRoute path="/createcard" exact component={CreateCardPage} />

        <Route path="/login" exact>
          <LoginPage />
        </Route>

        <Route path="/register" exact>
          <RegisterPage />
        </Route>

        <Route path="/onlyforbiz" exact>
          <OnlyForBizPage />
        </Route>
      </Switch>
      <div className="my-footer-div">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
