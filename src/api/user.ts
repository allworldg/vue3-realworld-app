import request from "@/utils/requests";
import { ProfileResponse, UpdateUser, loginUser } from "@/types/user";
import { UserResponse } from "@/types/user";
import { LOGIN, GETUSER, UPDATEUSER, GETPROFILE } from "@/common/url";
export function login(loginUser: loginUser): Promise<UserResponse> {
  return request({
    url: LOGIN,
    method: "post",
    data: {
      user: loginUser,
    },
  });
}

export function getUser(): Promise<UserResponse> {
  return request({
    url: GETUSER,
    method: "get",
    data: {},
  });
}

export function updateUser(data: UpdateUser): Promise<UserResponse> {
  return request({
    url: UPDATEUSER,
    method: "put",
    data,
  });
}

export function getProfile(username: string): Promise<ProfileResponse> {
  return request({
    url: `${GETPROFILE}/${username}`,
    method: "get",
  });
}
