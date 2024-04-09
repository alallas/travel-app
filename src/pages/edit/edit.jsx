import { View, Text } from "@tarojs/components";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import EditTravel from "@/components/EditTravel";
import { Icon } from '@antmjs/vantui'
import { editMyTravel } from "@/services/travels";

import "./edit.scss"
import { showSuccessToast } from "@/utils/toast";

function Edit(){

  useDidShow(()=>{
    console.log("edit page didshow");

  })

  const router=useRouter();
  const {id}=router.params;
  console.log("edit page tarvelid",id)

  const backToMine=()=>{
    Taro.navigateBack()
  }

  const editSubmit=async (editedData)=>{
    await editMyTravel(id,editedData);
    showSuccessToast("修改成功");
    setTimeout(()=>{
      Taro.navigateBack();
    },500)
  }

  return(
    <View className="edit">
      <View className="header">
        <View className="back" onClick={backToMine}>
          <Icon name='arrow-left' size='22px' color='white' className="back-icon"/>
        </View>
        <Text className="title">编辑游记</Text>
      </View>

      <EditTravel editType="edit" submit={editSubmit}/>
    </View>
  )
}

export default Edit;
