import { IBaseModel } from "./basic.model";

export interface IUsers extends IBaseModel {
  name: string;
  email?: string;
  mobile?: number;
  pwdtoken?: string;
  logged_count?: string;
  is_logged?: string;
  roles?: any[];
  status?: number;
}
