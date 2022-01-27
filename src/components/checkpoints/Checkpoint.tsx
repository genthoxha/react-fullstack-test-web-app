import React, { ReactNode } from 'react';
import './Checkpoint.css';

export interface Checkpoint {
  id: number;
  latitude: string;
  longitude: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const CheckpointCard: React.FC<
  Checkpoint & { children?: ReactNode }
> = ({ id, latitude, longitude, active, onClick }) => {
  return (
    <div
      className="itemContainer"
      onClick={onClick}
      style={
        active ? { backgroundColor: '#3a1b37' } : { backgroundColor: '#1e041b' }
      }
    >
      <div className="verticalLine" />
      <p className="checkpoint-id">Checkpoint: {id}</p>
      <p className="text">Latitude: {latitude}</p>
      <p className="text">Longitude: {longitude}</p>
    </div>
  );
};
