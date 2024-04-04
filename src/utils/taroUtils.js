import Taro from "@tarojs/taro";

export function getMenuRect() {
    let jn = Taro.getMenuButtonBoundingClientRect()
    return jn
}

export function vibrateShort() {
  Taro.vibrateShort()
}

export function getSystemInfo(){
  let info = Taro.getSystemInfoSync()
  return info
}
