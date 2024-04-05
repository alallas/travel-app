import { create } from "zustand";
import {immer} from "zustand/middleware/immer"
import { createImageUrl } from "@/utils/createImageUrl"

const initialUserValue = {
  username: "",
  expirationTime: "",
  avatar: "",
}

export const useUserStore = create()(
  immer(() => initialUserValue)
)

export const setLoginData = async (userInfo) => {
  useUserStore.setState(() => ({
    username: userInfo.username,
    expirationTime: userInfo.expirationTime,
  }))
}

export const removeAvatar = () => {
  useUserStore.setState(() => ({ avatar: ''  }))
}

export const createAvatarUrl = async (filePath) => {
  try {
    const fileUrl = await createImageUrl(filePath)
    if (fileUrl) {
      useUserStore.setState({ avatar: fileUrl })
    }
  } catch (err) {
    console.log(err)
  }
}

//
//   fetchRegisterData: async (userInfo) => {
//     try {
//       const res = await instance.post('/user/signup', userInfo);
//       return res;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }));
