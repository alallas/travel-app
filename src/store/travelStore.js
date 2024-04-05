import { create } from "zustand";
import {immer} from "zustand/middleware/immer"
import { createImageUrl } from "@/utils/createImageUrl"

const initialTravelValue = {
  travelImageList: [],
  cover: "",
  coverWidth:"",
  coverHeight:"",
  travelsList: [],
}

export const useTravelStore = create()(
  immer(() => initialTravelValue)
)

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

// 游记新增与移除
export const createTravelUrlList = async (filePath) => {
  try {
    const fileUrl = await createImageUrl(filePath)
    console.log("store页面的fileUrl", fileUrl)
    if (fileUrl) {
      useTravelStore.setState((state)=>(
        { travelImageList: [...state.travelImageList, fileUrl] }
      ))
    }
  } catch (err) {
    console.log(err)
  }
}

export const removeTravelUrlList = (index) => {
  useTravelStore.setState((state)=>(
    { travelImageList: [...state.travelImageList.slice(0, index), ...state.travelImageList.slice(index + 1)] }
  ))
}

export const changeCover = (cover) => {
  useTravelStore.setState(()=>({ cover }))
}
