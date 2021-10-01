import {Food} from "./food";
import {Appuser} from "./appuser";


export interface Foodintake {
  id: number;
  date: Date;
  quantity: number;
  food: Food;
  appuser: Appuser;
}
