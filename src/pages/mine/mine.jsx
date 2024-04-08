import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import {useUserStore} from "@/store/userStore"
import {getUserTravels, getUserInfo} from "@/services/user"
import {useEffect} from "react"
import './mine.scss'

export default function Mine() {
  const id = useUserStore(state=>state.id)
  console.log(id)

  useLoad(() => {
    console.log('Page loaded.')
  })

  useEffect(() => {
    getMyTravelsList()
    getMyUserInfo()
  }, [])

  const getMyTravelsList = async ()=>{
    const res = await getUserTravels()
    console.log(res)
  }

  const getMyUserInfo = async ()=>{
    const res = await getUserInfo()
    console.log(res)
  }


  return (
    <View className='index'>
      <View>
        <Text>mine</Text>
      </View>
      <Text>Hello world!</Text>
    </View>
  )
}
