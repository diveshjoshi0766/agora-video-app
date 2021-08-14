import { IBaseModel } from "./basic.model";

export interface ILoginModel extends IBaseModel {
  email: string;
  password: string;
  token?: string;
}
