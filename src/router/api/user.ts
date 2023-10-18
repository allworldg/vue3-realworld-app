import request from "@/utils/requests"
import { loginUser } from "@/types/user"
import { URL_LOGIN } from "@/common/url"
export function login(loginUser: loginUser) {
    return request({
        url: URL_LOGIN,
        method: 'post',
        data: loginUser
    })
}