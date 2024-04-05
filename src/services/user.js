import request from '@/utils/request.js'

// 登陆
export function userLogin(userInfo) {
  return request.post(
    `/user/login`,
    {
      username: userInfo.username,
      password: userInfo.password
    }
  )
}

// 注册
export function userSignup(userInfo) {
  return request.post(
    `/user/signup`,
    {
      username: userInfo.username,
      nickname: userInfo.nickname,
      password: userInfo.password,
      avatar: userInfo.avatar,
      gender: userInfo.gender,
    }
  )
}

// 验证登陆状态
export function checkLogin() {
  return request.get(
    `/user/checkLogin`,
  )
}
