import {View, Text, ScrollView} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// import {useUserStore} from "@/store/userStore"
// import {getUserTravels, getUserInfo} from "@/services/user"
import {useEffect, useState} from "react"
import {DropdownItem, DropdownMenu, Empty, Search, Tab, Tabs} from '@antmjs/vantui'
import KeywordsShow from "../../components/KeywordsShow"
import {showTextToast} from "@/utils/toast"
import {searchUsersByKeyword} from "@/services/user"
import UserItemCard from "@/components/UserItemCard"
import OverlayLoading from "@/components/OverlayLoading"
import {searchTravelsByKeyword} from "@/services/user";
import './search.scss'


const sortOptions =  [
  {
    text: '综合排序',
    value: '1',
  },
  {
    text: '按时间排序',
    value: '2',
  },
  {
    text: '按热度排序',
    value: '3',
  },
]
export default function MySearch() {
  const [isSearch, setIsSearch] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sort, setSort] = useState('1')

  const [userList, setUserList] = useState([])
  const [travelsList, setTravelsList] = useState([])
  const [travelsTotal, setTravelsTotal] = useState(0)


  useLoad(() => {
    console.log('Page loaded.')
  })

  // useEffect(() => {
  //   getMyTravelsList()
  //   getMyUserInfo()
  // }, [])
  //
  // const getMyTravelsList = async ()=>{
  //   const res = await getUserTravels()
  //   console.log(res)
  // }
  //
  // const getMyUserInfo = async ()=>{
  //   const res = await getUserInfo()
  //   console.log(res)
  // }

  const onSearch = (e) => {
    console.log(`search: ${e.detail}`)
  }

  const searchAction = async () => {
    console.log(`search:`, searchValue)
    if(searchValue === ''){
      showTextToast('请输入关键字')
    }else{
      setIsloading(true)
      setIsSearch(true)
      try {
        const res = await searchUsersByKeyword(searchValue)
        const res_t = await searchTravelsByKeyword(searchValue)
        setUserList(res.data.users)
        setTravelsList(res_t.data.travels)
        setTravelsTotal(res_t.data.total)
        console.log(res.data.users)
      }catch (err){
        console.log(err)
      }
      setIsloading(false)
    }
  }

  const onClick = (e) => {
    console.log(e)
  }

  const sortChoose = (e)=>{
    setSort(e)
  }



  return (
    <View className='search-container'>
      <OverlayLoading isloading={isloading} />
      <View className='search-part'>
        {/*<SearchBar onSearch={onSearch} />*/}
        <Search
          onChange={(e) => setSearchValue(e.detail)}
          placeholder='请输入搜索关键词'
          onSearch={onSearch}
          renderAction={<View onClick={searchAction}>搜索</View>}
        />
      </View>
      {
        isSearch?(
          // <ScrollView
          //   className='search-result'
          // >
          // </ScrollView>
          <Tabs onClick={onClick} color='#7667C2' animated>
            <Tab title='全部'>
              <View className='drop-menu'>
                <View>
                  <Text>
                    共 {travelsTotal} 篇游记
                  </Text>
                </View>
                {/*<DropdownMenu activeColor='#7667C2'>*/}
                {/*  <DropdownItem value={sort} options={sortOptions} onChange={sortChoose} />*/}
                {/*</DropdownMenu>*/}
              </View>
              <View className='search-content-travels'>
                {
                  travelsList.length === 0 ?(
                    <Empty image='search' description='搜索为空' />
                  ):(
                    <View>
                      <Text>游记</Text>
                    </View>
                  )
                }
              </View>
            </Tab>
            <Tab title='用户'>
              {
                userList.length === 0 ? (
                  <Empty image='search' description='搜索为空' />
                ):(
                  <View className='usercard-part'>
                    {
                      userList.map((item)=>{
                        return(
                          <UserItemCard userInfo={item} key={item._id} />
                        )
                      })
                    }
                  </View>
                )
              }
            </Tab>
          </Tabs>
        ):(
          <View className='search-keywords'>
            <KeywordsShow title='历史记录' keywords={['火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条']} />
            <KeywordsShow title='热门记录' keywords={['火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条','火腿','面条']} />
          </View>
        )
      }
    </View>
  )
}
