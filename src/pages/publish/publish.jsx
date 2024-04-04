import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './publish.scss'

export default function Publish() {

  useLoad(() => {
    console.log('Page loaded.')
  })


  return (
    <View className='index'>
      <View>
        <Text>publish</Text>
      </View>
      <Text>Hello world!</Text>
    </View>
  )
}
