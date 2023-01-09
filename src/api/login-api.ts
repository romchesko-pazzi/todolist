import { instance } from './todolist-api';
import { AuthMeType, CommonType, LoginParamsType } from './types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<CommonType<{ userId: number }>>('auth/login', data);
  },
  logout() {
    return instance.delete<CommonType>('auth/login');
  },
  authMe() {
    return instance.get<CommonType<AuthMeType>>('auth/me');
  },
};
