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
import BoardMembersDashboard from "../../features/boardMembers/boardMembersDashboard/BoardMembersDashboard";
import BoardMemberDetailedPage from "../../features/boardMembers/boardMemberDetail/BoardMemberDetailedPage";
import BoardMemberForm from "../../features/boardMembers/BoardMemberForm";
import InformationDashboard from "../../features/information/InformationDashboard";
import InfoForm from "../../features/information/InfoForm";
import InfoDetailedPage from "../../features/information/infoDetail/InfoDetailedPage";

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
              <Container className="main">
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
                <Route
                  exact
                  path="/board-members"
                  component={BoardMembersDashboard}
                />
                <Route
                  path="/board-members/:id"
                  component={BoardMemberDetailedPage}
                />
                <PrivateRoute
                  path={["/createBoardMember", "/editBoardMember/:id"]}
                  component={BoardMemberForm}
                  key={`createBoardMember-${key}`}
                />
                <Route
                  exact
                  path="/general-info"
                  component={InformationDashboard}
                />
                <Route path="/general-info/:id" component={InfoDetailedPage} />
                <PrivateRoute
                  path={["/createInfo", "/editInfo/:id"]}
                  component={InfoForm}
                  key={`createInfo-${key}`}
                />
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
