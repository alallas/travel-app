import React, {useEffect, useState} from 'react'
import {Text, View} from "@tarojs/components"
import {Icon, Image } from "@antmjs/vantui"
import {useBaseStore} from "@/store/baseStore"
import Taro, {useRouter} from "@tarojs/taro"
import {getUserInfoById} from "@/services/user"
import './user.scss'

function User(props) {
  const router = useRouter()
  const { id } = router.params
  console.log(id)
  const pos = useBaseStore((state) => state.pos)
  const [userInfo, setUserInfo] = useState({})
  // 返回上一层页面
  const goBack = () => {
    Taro.navigateBack()
  }

  useEffect(() => {
    if(id){
      getUserInfo(id)
    }
  }, [id])

  const getUserInfo = async (id)=>{
    try {
      const res = await getUserInfoById(id)
      setUserInfo(res.data.user)
    }catch (err){
      console.log(err)
    }
  }


  return (
    <View className='user-container'>
      <View className='user-header' style={{backgroundImage: `url(${userInfo.avatar})`}} >
        <View className='user-back' style={{top:pos.top}} onClick={goBack}>
          <Icon name='arrow-left' size='24px' color='white' />
        </View>
        <View className='user-show' style={{top: pos.top+80}}>
          <Image
            round
            className='user-avatar'
            fit='cover'
            src={userInfo.avatar}
          />
          <View className='user-name'>
            <View className='line-one'>
              <Text className='nick'>{userInfo.nickname}</Text>
              {userInfo.gender === '1'?(
                <Image
                  className='gender'
                  src='https://tarvels-images.oss-cn-shanghai.aliyuncs.com/default/man.svg'
                />
              ):(
                <Image
                  className='gender'
                  src='https://tarvels-images.oss-cn-shanghai.aliyuncs.com/default/woman.svg'
                />
              )}
            </View>
            <Text className='user'>用户名：{userInfo.username}</Text>
          </View>

        </View>
      </View>
    </View>
  );
}

export default User;
