import {Food} from "./food";

export interface Foodintake{
  id: number;
  date: Date;
  name: string;
  quantity: number;
  type:string;
  calories:number;
  foodList: Food[];
}
