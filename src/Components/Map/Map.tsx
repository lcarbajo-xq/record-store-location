import React, { Component } from "react";

import ReactMapboxGl, { ZoomControl, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoSearchProvided } from "react-instantsearch-core";
import { connectGeoSearch } from "react-instantsearch-dom";

import { Map } from "mapbox-gl";
import { LngLat } from "../../types/LngLat";

import { ReactComponent as MarkerUnselected } from "../../assets/marker.svg";
import { ReactComponent as MarkerSelected } from "../../assets/marker-selected.svg";
import SearchAsMoving from "./SearchAsMoving";
import { comparePosition } from "../../lib/comparePosition";

interface MapState {
  lat: number;
  lng: number;
  zoom: number;
  markers: LngLat[];
  currentStore: LngLat | null;
  isUserInteraction: boolean;
  userInteractionEnabled: boolean;
}

interface MapProps {
  currentStore: LngLat;
  onClickMarker: (marker: LngLat) => void;
}

const ReactMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN as string,
});

class MapComponent extends Component<GeoSearchProvided & MapProps, MapState> {
  map: any;

  state = {
    lat: 30.5,
    lng: 50.5,
    zoom: 9,
    markers: [],
    currentStore: this.props.currentStore || ["0", "0"],
    isUserInteraction: false,
    userInteractionEnabled: true,
  };

  constructor(props: GeoSearchProvided & MapProps) {
    super(props);
    this.centerMapOnCoordinates = this.centerMapOnCoordinates.bind(this);
    this.onMapInteraction = this.onMapInteraction.bind(this);
  }

  componentWillReceiveProps(nextProps: Readonly<GeoSearchProvided & MapProps>) {
    const { hits, currentStore } = nextProps;

    if (hits.length && hits !== this.props.hits) {
      const markers: LngLat[] = hits.map(
        ({
          geometry: { coordinates },
        }: {
          geometry: { coordinates: LngLat };
        }) => {
          // ({ _geoloc }: { _geoloc: { lat: number; lng: number } }) => {
          return [coordinates[0], coordinates[1]];
        }
      );
      this.setState({ markers }, () => {
        this.centerMapOnCoordinates(markers[0]);
      });
    }

    if (currentStore && currentStore !== this.props.currentStore) {
      this.setState({ currentStore }, () => {
        this.centerMapOnCoordinates(this.state.currentStore);
      });
    }
  }

  centerMapOnCoordinates(coordinates: LngLat) {
    if (!this.state.isUserInteraction) {
      const { refine } = this.props;
      this.setState({ isUserInteraction: true }, () => {
        this.map.flyTo({
          essential: false,
          center: coordinates,
          zoom: 7,
        });

        refine({
          northEast: this.map.getBounds().getNorthEast(),
          southWest: this.map.getBounds().getSouthWest(),
        });
      });
    }
  }

  onMapInteraction(map: Map) {
    if (this.state.userInteractionEnabled) {
      const { refine } = this.props;

      refine({
        northEast: map.getBounds().getNorthEast(),
        southWest: map.getBounds().getSouthWest(),
      });
    }
  }

  render() {
    return (
      <div className={"h-full w-full relative"}>
        <ReactMap
          ref={(e) => {
            this.map = e?.state.map;
          }}
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: "100%",
            width: "100%",
            position: "relative",
            display: "block",
            //overflow: 'hidden'
          }}
          onMoveEnd={this.onMapInteraction}
        >
          <>
            {this.state.markers.map((marker: LngLat) => {
              return (
                <Marker coordinates={marker}>
                  {comparePosition(this.state.currentStore, marker) ? (
                    <MarkerSelected />
                  ) : (
                    <MarkerUnselected />
                  )}
                </Marker>
              );
            })}
            <ZoomControl position={"bottom-right"} />
          </>
        </ReactMap>
        <SearchAsMoving
          checked={this.state.userInteractionEnabled}
          onChange={(userInteractionEnabled) => {
            this.setState({ userInteractionEnabled });
          }}
        />
      </div>
    );
  }
}

export default connectGeoSearch(MapComponent);
