import * as fromAuth from './auth.actions';
import { UserModel } from '../models/user-model';
export interface AuthState {
  user: UserModel;
}

const initState: AuthState = {
  user: null,
};
export function authReducer(
  state = initState,
  action: fromAuth.accions
): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: {
          ...action.user,
        },
      };

    default:
      return state;
  }
}
