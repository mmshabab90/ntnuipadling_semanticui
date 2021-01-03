// import "./styles.css";
import React, { Fragment } from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
// import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
// import HomePage from "./../../features/home/HomePage";
import EventDetailedPage from "./../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "./../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "./../common/errors/ErrorComponent";
import AccountPage from "./../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "./../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import NewsDashboard from "../../features/news/newsDashboard/NewsDashboard";
import NewsDetailedPage from "../../features/news/newsDetailed/NewsDetailedPage";
import NewsForm from "../../features/news/NewsForm";
import ResponsiveContainer from "./Containers/ResponsiveContainer";
import About from "../staticPages/About";
import BoardMembers from "../staticPages/BoardMembers";
import GeneralInfo from "../staticPages/GeneralInfo";

// const leftItems = [
//   { as: "a", content: "News", key: "news" },
//   { as: "a", content: "Events", key: "events" },
// ];
// const rightItems = [
//   { as: "a", content: "Login", key: "login" },
//   { as: "a", content: "Register", key: "register" },
// ];

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" />
      <ResponsiveContainer>
        <Container className="main">
          <Route exact path="/" component={NewsDashboard} />
        </Container>

        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              {/* <NavBar /> */}

              <Container className="main">
                {/* <Route exact path="/news" component={NewsDashboard} /> */}
                <Route path="/news/:id" component={NewsDetailedPage} />
                <PrivateRoute
                  path={["/createNews", "/editNews/:id"]}
                  component={NewsForm}
                  key={`createNews-${key}`}
                />
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route exact path="/sandbox" component={Sandbox} />
                <PrivateRoute
                  path={["/createEvent", "/manage/:id"]}
                  component={EventForm}
                  key={`createEvent-${key}`}
                />
                <PrivateRoute path="/account" component={AccountPage} />
                <PrivateRoute path="/profile/:id" component={ProfilePage} />
                <Route path="/about" component={About} />
                <Route path="/board-members" component={BoardMembers} />
                <Route path="/general-info" component={GeneralInfo} />
                <Route path="/error" component={ErrorComponent} />
              </Container>
            </Fragment>
          )}
        />
      </ResponsiveContainer>
    </>
  );
}

export default App;
