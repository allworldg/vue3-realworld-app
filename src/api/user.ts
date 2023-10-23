import request from "@/utils/requests";
import { loginUser, User } from "@/types/user";
import { REQUEST_LOGIN, REQUEST_GETUSER } from "@/common/url";
export function login(loginUser: loginUser): Promise<User> {
  return request({
    url: REQUEST_LOGIN,
    method: "post",
    data: {
      user: loginUser,
    },
  });
  // return request.post<any, loginUser>(URL_LOGIN);
}

export function getUser(): Promise<User> {
  return request({
    url: REQUEST_GETUSER,
    method: "get",
    data: {},
  });
}
