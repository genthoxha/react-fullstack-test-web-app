import axios from "axios";
import { Checkpoint } from "../components/checkpoints/Checkpoint";
import {UserRankingDetail} from "../components/users/UsersComponent";
import {User} from "../components/map/MapComponent";

export interface RootObject {}

const getUsers = async ():Promise<{
  data: {
    users: User[]
  }
}> => {
  return await axios.get("http://localhost:3333/users");
};

const calculateUserDistances = async () => {
  return await axios.get(
    "http://localhost:3333/user-distances/calculate-distances"
  );
};

const addCheckpoints = async () => {
  return await axios.get(
    "http://localhost:3333/user-checkpoints/add-checkpoint-to-users"
  );
};

const getCheckpoints = async (): Promise<{
  data: { checkpoints: Checkpoint[] };
}> => {
  return await axios.get("http://localhost:3333/checkpoints");
};

const getUserRanking = async (checkpointId: number): Promise<{
  data: {
    userRankingDetails: UserRankingDetail[]
  }
}> => {
  return await axios.get(
    `http://localhost:3333/user-distances/user-ranking/${checkpointId}`
  );
};

export {
  getUsers,
  addCheckpoints,
  calculateUserDistances,
  getUserRanking,
  getCheckpoints,
};
