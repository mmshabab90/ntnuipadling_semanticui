import React from "react";
import { Button, Container, Menu, Responsive } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SignedInMenu from "../../../features/nav/SignedInMenu";
import SignedOutMenu from "../../../features/nav/SignedOutMenu";

export default function DesktopLayout({ children }) {
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Container fluid>
        <Menu inverted fixed="top">
          <Menu.Item as={NavLink} exact to="/" header>
            <img
              src="/assets/images/logo.png"
              alt="logo"
              style={{ marginRight: "15px" }}
            />
            NTNUI-PADLING
          </Menu.Item>

          {/* <Menu.Item name="News" as={NavLink} to="/news">
            News
          </Menu.Item> */}

          <Menu.Item name="Events" as={NavLink} to="/events">
            Events
          </Menu.Item>

          {authenticated && currentUserProfile?.admin && (
            <Menu.Item as={NavLink} to="/createEvent">
              <Button positive inverted content="Create Event" />
            </Menu.Item>
          )}

          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
        </Menu>
      </Container>

      {children}
    </Responsive>
  );
}
