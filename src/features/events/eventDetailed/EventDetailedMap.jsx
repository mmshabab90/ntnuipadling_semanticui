import GoogleMapReact from "google-map-react";
import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";

function Marker() {
  return <Icon name='marker' size='big' color='red' />;
}

export default function EventDetailedMap({ latLng }) {
  const zoom = 14;
  return (
    <>
      {!!latLng ? (
        <Segment attached='bottom' style={{ padding: 0 }} placeholder>
          <div style={{ height: 300, width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyA0oPb5KfRiP5rxGq2rgwZUJ8Prcz_OO4o",
              }}
              center={latLng}
              zoom={zoom}
            >
              <Marker lat={latLng.lat} lng={latLng.lng} />
            </GoogleMapReact>
          </div>
        </Segment>
      ) : (
        <Segment raised placeholder attached='bottom'>
          <Header as='h4' color='red'>
            No venue tagged for the event
          </Header>
        </Segment>
      )}
    </>
  );
}
