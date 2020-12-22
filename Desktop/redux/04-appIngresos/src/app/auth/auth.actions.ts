import { Action } from '@ngrx/store';
import { UserModel } from '../models/user-model';
export const SET_USER = '[Auth] Set User';

export class setUserAction implements Action {
  readonly type = SET_USER;
  constructor(public user: UserModel) {}
}
export type accions = setUserAction;
