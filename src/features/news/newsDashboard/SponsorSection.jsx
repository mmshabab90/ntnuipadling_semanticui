import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Header, Icon, Image, Menu, Segment } from "semantic-ui-react";

export default function SponsorSection() {
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        {authenticated && currentUserProfile?.admin && (
          <Menu.Item as={NavLink} to="/createNews">
            <Button positive inverted content="Add News" />
          </Menu.Item>
        )}

        <Header attached color="teal" content="Social Contacts" />
        <Menu icon="labeled">
          <Menu.Item
            name="facebook official"
            as="a"
            color="blue"
            href="https://www.facebook.com/groups/ntnuipadling/"
          >
            <Icon color="blue" name="facebook official" size="large" />
          </Menu.Item>

          <Menu.Item
            name="instagram"
            as="a"
            color="orange"
            href="https://www.instagram.com/ntnuipadling/?hl=en"
          >
            <Icon color="orange" name="instagram" size="large" />
          </Menu.Item>
        </Menu>
        <Header attached color="teal" content="Sponsors" />

        <Menu.Item as="a" href="https://www.kajakk-fritid.no/">
          <Image
            alt="sponsor-1-img"
            src="/assets/sponsorImages/kajakk_and_fritid.png"
            style={{ width: "100%", height: 100 }}
          />
        </Menu.Item>

        <Menu.Item as="a" href="https://www.vpg.no/">
          <Image
            alt="sponsor-2-img"
            src="/assets/sponsorImages/vertical_playground.png"
            style={{ width: "100%", height: 150 }}
          />
        </Menu.Item>

        <Menu.Item as="a" href="http://www.striestrommer.no/">
          <Image
            alt="sponsor-3-img"
            src="/assets/sponsorImages/strie_strommer.png"
            style={{ width: "100%", height: 120 }}
          />
        </Menu.Item>

        <Menu.Item as="a" href="https://www.kajakk.net/">
          <Image
            alt="sponsor-4-img"
            src="/assets/sponsorImages/seabord.png"
            style={{ width: "100%", height: 100, backgroundColor: "black" }}
          />
        </Menu.Item>
      </Menu>
      <Segment basic vertical></Segment>

      <Segment basic vertical></Segment>

      <Segment basic vertical></Segment>

      <Segment basic vertical></Segment>
    </>
  );
}
