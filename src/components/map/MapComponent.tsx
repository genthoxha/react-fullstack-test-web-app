import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapComponent.css';
import { Checkpoint } from '../checkpoints/Checkpoint';
import userJpeg from './../../assets/user.jpg';
import homePng from './../../assets/home.png';
import { getCheckpoints, getUsers } from '../../api';
import L from 'leaflet';

export interface User {
  id: number;
  username: string;
  homeLatitude: string;
  homeLongitude: string;
  currentLatitude: string;
  currentLongitude: string;
}

export const MapComponent: React.FC = () => {
  const [lat] = useState(42.66108);
  const [lng] = useState(21.163324);
  const [allCheckpoints, setCheckpoints] = React.useState<Checkpoint[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [homePositionLat, setHomePositionLat] = React.useState<number>(0);
  const [homePositionLng, setHomePositionLng] = React.useState<number>(0);

  const handleOnClick = (lat: number, lng: number) => {
    setHomePositionLat(lat);
    setHomePositionLng(lng);
  };

  const userIcon = L.icon({
    iconUrl: userJpeg,
    iconSize: [54, 54],
    iconAnchor: [32, 64],
    popupAnchor: [-3, -76],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
  });

  const homeIcon = L.icon({
    iconUrl: homePng,
    iconSize: [44, 54],
    iconAnchor: [32, 64],
    popupAnchor: [-3, -76],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
  });

  React.useEffect(() => {
    (async () => {
      const result = await getCheckpoints();
      result.data.checkpoints.forEach((singleCheckpoint) => {
        setCheckpoints((oldData) => [...oldData, singleCheckpoint]);
      });
    })();
  }, []);


  React.useEffect(() => {
    (async () => {
      const result = await getUsers();
      result.data.users.forEach((user) => {
        setUsers((oldData) => [...oldData, user]);
      });
    })();
  }, []);

  const [zoom] = useState(13);

  React.useEffect(() => {
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  return (
    <Map className="map" zoom={zoom} center={[lat, lng]}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allCheckpoints.length > 0 &&
        allCheckpoints.map(({ id, latitude, longitude }) => (
          <Marker position={[parseFloat(latitude), parseFloat(longitude)]}>
            <Popup>
              <div>
                <h2>Checkpoint {id} coordinates:</h2>
                <span>Latitude: {latitude}</span>
                <hr />
                <span>Longitude: {longitude}</span>
              </div>
            </Popup>
          </Marker>
        ))}

      {users.length > 0 &&
        users.map(
          ({
            username,
            currentLatitude,
            currentLongitude,
            homeLatitude,
            homeLongitude,
          }) => (
            <Marker
              position={[
                parseFloat(currentLatitude),
                parseFloat(currentLongitude),
              ]}
              icon={userIcon}
            >
              <Popup>
                <div
                  onClick={() =>
                    handleOnClick(
                      parseFloat(homeLatitude),
                      parseFloat(homeLongitude),
                    )
                  }
                >
                  <h2>User {username} coordinates:</h2>
                  <span>
                    Current position of user: Lat: {currentLatitude} Lng:{' '}
                    {currentLongitude}
                  </span>
                  <hr />
                  <span>
                    Home position of user: Lat: {homeLatitude} Lng:{' '}
                    {homeLongitude}
                    <hr />
                    <button style={{ color: '#3a1b37' }}>
                      Click here for checking home position!
                    </button>
                  </span>
                </div>
              </Popup>
            </Marker>
          ),
        )}
      {homePositionLat && homePositionLat && (
        <Marker position={[homePositionLat, homePositionLng]} icon={homeIcon} />
      )}
    </Map>
  );
};
