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
} from '@/store/travelStore'
import './publish.scss'

export default function Publish() {
  const {
    travelImageList,
    cover,
    // getImgCollection,
    // publishTravel
  } = useTravelStore(state=>({
    travelImageList:state.travelImageList,
    cover:state.cover,
    // getImgCollection:state.getImgCollection,
    // publishTravel:state.publishTravel
  }))

  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleSubmit = async (err,values) => {
    console.log(values)
    // 检验
    const keysList = Object.keys(values)
    for(let i=0;i<keysList.length;i++){
      if(values[keysList[i]]===undefined) {
        return showErrorToast("标题内容都要噢")
      }
    }

    // 替换封面
    if(cover === ""){
      if(travelImageList.length === 0){
        return showErrorToast("至少上传一张图片")
      } else {
        changeCover(travelImageList[0])
      }
    }

    // const imgCol = await getImageWH(values.cover)
    //
    // console.log(imgCol)
    //
    // // 发送数据
    // const publishFormData = {...values,...imgCol}
    // const res = await publishTravel(publishFormData)
    // if(res){
    //   Taro.switchTab({
    //     url: '/pages/discover/discover'
    //   })
    // }
  }

  return (
    <View className='publish-bg'>
      <View className='header'>
        <Text className='title'>Share</Text>
      </View>
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
        className='form'
      >
        <FormItem
          name='title'
          label='标题'
          layout='vertical'
          className='form-item'
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
          className='form-item'
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
            imageList={travelImageList}
            isOnlyOne={false}
            removeImage={removeTravelUrlList}
            imageType='travel'
          />
        </ScrollView>
        <Button type='primary' formType='submit' className='btn'>发 布</Button>
      </Form>
    </View>
  )
}
