import { Text, View } from "@tarojs/components";
import { useDidShow } from '@tarojs/taro'
import './publish.scss'
import { publishTravel } from "@/services/travels";
import EditTravel from "@/components/EditTravel";
import { showSuccessToast } from "@/utils/toast";
import { setCurrentTravelData } from "@/store/travelStore";

export default function Publish() {

  const editSubmit = async (editedData) => {
    await publishTravel(editedData);
    showSuccessToast("发布成功");
  }

  useDidShow(() => {
    setCurrentTravelData();
  })

  return (
    <View className='publish-bg'>
      <View className='header'>
        <Text className='title'>Share</Text>
      </View>
      <EditTravel editType="publish" submit={editSubmit}/>
    </View>
  )
}
