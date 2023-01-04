import { RootStateType } from '../../store/store';

const selectIsAppInitialized = (state: RootStateType) => state.app.isInitialized;
const selectAppStatus = (state: RootStateType) => state.app.appStatus;
const selectAppError = (state: RootStateType) => state.app.error;

export { selectAppStatus, selectIsAppInitialized, selectAppError };
