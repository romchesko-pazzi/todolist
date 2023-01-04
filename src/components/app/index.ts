import { initializeApp, setError } from '../../store/reducers/appReducer';

import * as appSelectors from './appSelectors';

export const appActions = { initializeApp, setError };
export { appSelectors };
