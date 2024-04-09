import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
import { createImageUrl } from "@/utils/createImageUrl"
import { getImageWH } from "@/utils/taroUtils";

const initialTravelValue = {
  images: [],
  cover: "",
  coverWidth: 0,
  coverHeight: 0,
  title: "",
  content: "",
  travelsList: [],
  myTravelsList: [],
}

export const useTravelStore = create()(
  immer(() => initialTravelValue)
)

// 封面新增与修改
export const createCoverUrl = async (filePath) => {
  try {
    const fileUrl = await createImageUrl(filePath)
    if (fileUrl) {
      useTravelStore.setState({ cover: fileUrl })
    }
  } catch (err) {
    console.log(err)
  }
}

export const changeCover = (cover) => {
  useTravelStore.setState(() => ({ cover }))
}

// 游记新增与移除
export const createTravelUrlList = async (filePath) => {
  try {
    const fileUrl = await createImageUrl(filePath)

    if (fileUrl) {
      useTravelStore.setState((state) => (
        { images: [...state.images, fileUrl] }
      ))
    }
  } catch (err) {
    console.log(err)
  }
}

export const removeTravelUrlList = (index) => {
  useTravelStore.setState((state) => (
    { images: [...state.images.slice(0, index), ...state.images.slice(index + 1)] }
  ))
}

// 保存指定游记数据
export const setCurrentTravelData = async (currentTravel) => {
  if(!currentTravel){
    useTravelStore.setState(initialTravelValue);
    return;
  }
  const coverTemp = currentTravel?.cover || "";
  const { width, height } = await getImageWH(coverTemp);
  useTravelStore.setState((state) => ({
    title: currentTravel.title || "",
    content: currentTravel.content || "",
    cover: currentTravel.cover || "",
    images: currentTravel.images || [],
    coverWidth: width || 0,
    coverHeight: height || 0,
  }))
  console.log("目前的travel store ---", useTravelStore.getState())
}


