import request from "@/utils/requests";
import { ProfileResponse, UpdateUser, loginUser, RegisterUser } from "@/types/user";
import { UserResponse } from "@/types/user";
import { LOGIN, USER, PROFILES, FOLLOW, USERS } from "@/common/url";
export function login(loginUser: loginUser): Promise<UserResponse> {
  return request({
    url: LOGIN,
    method: "post",
    data: {
      user: loginUser,
    },
  });
}

export function register(user: RegisterUser): Promise<UserResponse> {
  return request({
    url: 'users',
    method: "post",
    data: { user },
  });
}

export function getUser(): Promise<UserResponse> {
  return request({
    url: USER,
    method: "get",
    data: {},
  });
}

export function updateUser(data: UpdateUser): Promise<UserResponse> {
  return request({
    url: USER,
    method: "put",
    data,
  });
}

export function getProfile(username: string): Promise<ProfileResponse> {
  return request({
    url: `${PROFILES}/${username}`,
    method: "get",
  });
}

export function follow(username: string): Promise<ProfileResponse> {
  return request({
    url: `${PROFILES}/${username}/${FOLLOW}`,
    method: "post",
  });
}
export function unfollow(username: string): Promise<ProfileResponse> {
  return request({
    url: `${PROFILES}/${username}/${FOLLOW}`,
    method: "delete",
  });
}
