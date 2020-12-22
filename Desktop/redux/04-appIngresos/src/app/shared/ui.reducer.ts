import * as fromUI from './ui.accions';

export interface State {
  isLoading: boolean;
}
const initState: State = {
  isLoading: false,
};
export function uiReducer(state = initState, action: fromUI.accions): State {
  switch (action.type) {
    case fromUI.ACTIVE_lOADING:
      return {
        isLoading: true,
      };
    case fromUI.INACTIVE_lOADING:
      return {
        isLoading: false,
      };

    default:
      return state;
  }
}
