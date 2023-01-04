import { RootStateType } from '../../store/store';

export const selectIsAuth = (state: RootStateType) => state.auth.isAuth;
