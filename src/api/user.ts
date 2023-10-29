import request from "@/utils/requests";
import { UpdateUser, loginUser } from "@/types/user";
import { UserResponse,User } from "@/types/user";
import {
  REQUEST_LOGIN,
  REQUEST_GETUSER,
  REQUEST_UPDATEUSER,
} from "@/common/url";
export function login(loginUser: loginUser): Promise<UserResponse> {
  return request({
    url: REQUEST_LOGIN,
    method: "post",
    data: {
      user: loginUser,
    },
  });
}

export function getUser(): Promise<UserResponse> {
  return request({
    url: REQUEST_GETUSER,
    method: "get",
    data: {},
  });
}

export function updateUser(data: UpdateUser): Promise<UserResponse> {
  return request({
    url: REQUEST_UPDATEUSER,
    method: "put",
    data,
  });
}
