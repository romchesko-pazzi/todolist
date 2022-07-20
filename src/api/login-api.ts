import {CommonType, instance} from "./todolist-api";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonType<{ userId: number }>>("auth/login", data);
    },
    logout() {
        return instance.delete<CommonType>("auth/login");
    },
    authMe() {
        return instance.get<CommonType<AuthMeType>>("auth/me");
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type AuthMeType = {
    id: number
    email: string
    login: string
}