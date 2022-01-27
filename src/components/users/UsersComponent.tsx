import React, {useCallback} from 'react';
import { getCheckpoints, getUserRanking } from '../../api';
import {Checkpoint, CheckpointCard} from '../checkpoints/Checkpoint';
import './UsersComponent.css';

export interface UserRankingDetail {
  users_id: number;
  distance: string;
  username: string;
  checkpointId: number;
  currentLatitude: string;
  currentLongitude: string;
  homeLatitude: string;
  homeLongitude: string;
}

export const UsersComponent: React.FC = () => {
  const [allCheckpoints, setCheckpoints] = React.useState<Checkpoint[]>([]);
  const [userRankList, setUserList] = React.useState<UserRankingDetail[]>([]);
  const [activeCheckpoint, setActiveCheckpoint] = React.useState<{
    id: number;
    active: boolean;
  }>({ id: 0, active: false });


  React.useEffect(() => {
    (async () => {
      const checkpointsResult = await getCheckpoints();
      checkpointsResult.data.checkpoints.forEach((singleCheckpoint) => {
        setCheckpoints((oldData) => [...oldData, singleCheckpoint]);
      });
    })();
  }, []);

  const handleOnClick = useCallback(async (id: number) => {
    setUserList([]);
    setActiveCheckpoint({
      id,
      active: true,
    });
    const result = await getUserRanking(id);
    result.data.userRankingDetails.forEach((singleUserDetails) => {
      setUserList((oldData) => [...oldData, singleUserDetails]);
    });
  }, []);

  return (
    <div className="users-container">
      <div>
        <div className="users-container-checkpoints">
          {allCheckpoints.map(({ id, latitude, longitude }, key) => (
            <CheckpointCard
              key={key}
              onClick={() => handleOnClick(id)}
              id={id}
              latitude={latitude}
              longitude={longitude}
              active={
                activeCheckpoint.active && activeCheckpoint.id === key + 1
              }
            />
          ))}
        </div>
        <div className="users-rank-header">
          <table>
            <thead>
              <tr>
                <th>*</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Distance in Km.</th>
                <th>Home Lat</th>
                <th>Home Lng</th>
                <th>Current Lat</th>
                <th>Current Lng</th>
                <th>Game Round</th>
              </tr>
            </thead>
            <tbody>
              {userRankList.map(
                (
                  {
                    users_id,
                    username,
                    distance,
                    checkpointId,
                    currentLatitude,
                    currentLongitude,
                    homeLatitude,
                    homeLongitude,
                  },
                  idx,
                ) => (
                  <tr key={users_id}>
                    <td>{idx + 1}</td>
                    <td>{users_id}</td>
                    <td>{username}</td>
                    <td>{distance}</td>
                    <td>{homeLatitude}</td>
                    <td>{homeLongitude}</td>
                    <td>{currentLatitude}</td>
                    <td>{currentLongitude}</td>
                    <td>{checkpointId}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
