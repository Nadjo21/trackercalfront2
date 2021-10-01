import {Appuser} from "./appuser";

export interface Weight {
  id: number;
  measurementDate: Date;
  weight: number;
  appuser: Appuser;

}
