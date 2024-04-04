import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './mine.scss'

export default function Mine() {

  useLoad(() => {
    console.log('Page loaded.')
  })


  return (
    <View className='index'>
      <View>
        <Text>mine</Text>
      </View>
      <Text>Hello world!</Text>
    </View>
  )
}
