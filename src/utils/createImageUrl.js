import Taro from "@tarojs/taro";
import { showErrorToast, showSuccessToast } from "./toast";

export const createImageUrl = async (filePath) => {
  Taro.showLoading({ title: '加载中', mask: true });
  try {
    const res = await Taro.uploadFile({
      url: `${process.env.TARO_APP_API_BASEURL}/common/upload`,
      filePath: filePath,
      name: "file",
    })
    console.log("createUrl函数工具页面的res", res)

    const result = JSON.parse(res.data);

    if (res.statusCode === 200) {
      const { fileUrl } = result.data;
      Taro.hideLoading();
      showSuccessToast(result.message);
      console.log("createUrl函数工具页面的fileUrl数组", fileUrl)
      return fileUrl
    } else {
      Taro.hideLoading();
      showErrorToast(result.message || "上传头像失败")
    }
  } catch (err) {
    Taro.hideLoading()
    console.log(err)
  }
}


