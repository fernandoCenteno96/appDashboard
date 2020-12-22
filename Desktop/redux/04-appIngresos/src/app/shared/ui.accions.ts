import { Action } from '@ngrx/store';
export const ACTIVE_lOADING = '[ui loading] loading...';
export const INACTIVE_lOADING = '[ui loading] fin loading...';

export class ActiveLoadingAction implements Action {
  readonly type = ACTIVE_lOADING;
}
export class InactiveLoadingAction implements Action {
  readonly type = INACTIVE_lOADING;
}

export type accions = ActiveLoadingAction | InactiveLoadingAction;
