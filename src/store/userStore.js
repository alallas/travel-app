import { create } from "zustand";
import {immer} from "zustand/middleware/immer"
import { createImageUrl } from "@/utils/createImageUrl"

const initialUserValue = {
  avatar: "",
}

export const useUserStore = create()(
  immer(() => initialUserValue)
)

/* export const setLoginData = (userInfo) => {
  useUserStore.setState((state) => ({
    id: userInfo._id,
    avatar: userInfo.avatar,
    gender: userInfo.gender,
    nickname: userInfo.nickname,
    username: userInfo.username,
    expirationTime: userInfo.expirationTime ? userInfo.expirationTime : state.expirationTime,
  }))
  console.log("useratore", userInfo)
  console.log("useratore travelsListValue", useUserStore.getState())
} */

export const removeAvatar = () => {
  useUserStore.setState(() => ({ avatar: ''  }))
}

export const createAvatarUrl = async (filePath) => {
  try {
    const fileUrl = await createImageUrl(filePath)
    if (fileUrl) {
      useUserStore.setState(()=>({ avatar: fileUrl }))
    }
  } catch (err) {
    console.log(err)
  }
}





