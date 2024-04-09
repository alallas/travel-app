import { Form, FormItem, Button } from "@antmjs/vantui";
import { Text, View, ScrollView, Textarea } from "@tarojs/components";
import Taro, { useLoad } from '@tarojs/taro'
import Uploader from "@/components/Uploader"
import {
  createCoverUrl,
  useTravelStore,
  createTravelUrlList,
  removeTravelUrlList,
  changeCover,
  setCurrentTravelData,
} from '@/store/travelStore'
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { getImageWH } from "@/utils/taroUtils";

import "./index.scss";

function EditTravel (props){
  const { editType, submit }=props;

  const {
    images,
    cover,
    title,
    content,
  } = useTravelStore(state=>({
    images:state.images,
    cover:state.cover,
    title:state.title,
    content:state.content,
  }))


  const handleSubmit = async (err,values) => {
    console.log("edit cpn form value",values)
    // 检验
    const keysList = Object.keys(values)
    for(let i=0;i<keysList.length;i++){
      if(values[keysList[i]]===undefined || values[keysList[i]]==="") {
        return showErrorToast("标题内容都要填")
      }
    }

    // 替换封面
    if(cover === ""){
      if(images.length === 0){
        return showErrorToast("至少上传一张图片")
      } else {
        changeCover(images[0])
      }
    }
    const {width,height} = await getImageWH(cover);
    console.log("edit cpn data",{...values,cover,images,coverHeight:height,coverWidth:width})

    await submit({...values,cover,images,coverHeight:height,coverWidth:width});

    setCurrentTravelData();

  }

  return(
    <ScrollView>
      <View className='cover'>
        <Uploader
          createUrlList={createCoverUrl}
          imageList={[cover]}
          isOnlyOne
          removeImage={()=>changeCover("")}
          imageType='cover'
        />
      </View>
      <Form
        onFinish={handleSubmit}
        className='edit-form'
        initialValues={
          editType==="edit"
            ? {
                title:title,
                content:content,
              }
            : {}
          }
      >
        <FormItem
          name='title'
          label='标题'
          layout='vertical'
          className='edit-form-item'
          valueFormat={(e)=>e.detail.value}
          trigger='onInput'
        >
          <Textarea
            type='text'
            placeholder='填写标题更容易被推荐噢~'
            autoHeight
            className='input-title'
            maxlength={-1}
          />
        </FormItem>
        <FormItem
          name='content'
          label='旅途中的发现'
          layout='vertical'
          className='edit-form-item'
          valueFormat={(e)=>e.detail.value}
          trigger='onInput'
        >
          <Textarea
            type='text'
            placeholder='来分享你的玩乐生活吧！'
            autoHeight
            className='input-content'
            maxlength={-1}
          />
        </FormItem>
        <ScrollView
          scrollX
          className='image-list'
        >
          <Uploader
            createUrlList={createTravelUrlList}
            imageList={images}
            isOnlyOne={false}
            removeImage={removeTravelUrlList}
            imageType='travel'
          />
        </ScrollView>
        <Button
          type='primary'
          formType='submit'
          className='btn'
        >
          {
            editType==="edit"?"修 改":"发 布"
          }
        </Button>
      </Form>
      <View style={{height:"50px"}}></View>
    </ScrollView>
  )
}

export default EditTravel;
