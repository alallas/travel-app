import Taro from '@tarojs/taro'
import { showSuccessToast } from "./toast";


const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 301,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const setCookie = res => {
      if (res.cookies && res.cookies.length > 0 && url.indexOf('user/login') !== -1) {
        // console.info("res ===>", res)
        let cookies = '';
        res.cookies.forEach((cookie, index) => {
          // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie}`
          }
        })
        console.log('cookies', cookies)
        Taro.setStorageSync('cookies', cookies)
      }
    }
    data = {
      ...data,
      timestamp: new Date().getTime(),
      cookie: Taro.getStorageSync('cookies')
    }
    return new Promise((resolve, reject) => {
        Taro.request({
          url: url.indexOf('http') !== -1 ? url : process.env.TARO_APP_API_BASEURL + url,
          data: data,
          method: method,
          header: {
            'content-type': contentType,
            'Cookie': Taro.getStorageSync('cookies')
          },
          mode: 'cors',
          xhrFields: { withCredentials: true },
          success:(res)=>{
            setCookie(res)
            // if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            //   return console.log('api', '请求资源不存在')
            // } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            //   return console.log('api', '服务端出现了问题')
            // } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            //   return console.log('api', '没有权限访问')
            // } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
            //   Taro.clearStorage()
            //   // Taro.navigateTo({
            //   //   url: '/pages/packageA/pages/login/login.jsx'
            //   // })
            //   return console.log('api', '请先登录')
            // } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            //   resolve(res.data)
            // }
            if (res.statusCode === HTTP_STATUS.SUCCESS) {
              if(res.data.message.indexOf("过期")!==-1){
                Taro.navigateTo({
                  url: `/pages/login/login`
                })
              }
              resolve(res.data)
            }else{
              console.log('api', '请求接口出现问题', res)
              reject(res.data)
            }
          },
          fail:(err)=>{
            console.log('api', '请求接口出现问题', err)
            reject(err)
          }
        })
    })
  },
  get(url, data) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post(url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
