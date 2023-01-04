import { logout, login } from '../../store/reducers/authReducer';

import * as authSelectors from './authSelectors';

export const authActions = { logout, login };

export { authSelectors };
