export default defineAppConfig({
  pages: [
    'pages/login/login',
    'pages/register/register',
    'pages/discover/discover',
    'pages/publish/publish',
    'pages/search/search',
    'pages/mine/mine',
    'pages/detail/detail',
    'pages/edit/edit',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#333",
    selectedColor: "#f03d37",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/discover/discover",
        text: "发现",
        // iconPath: "./assets/images/travels.js.png",
        // selectedIconPath: "./assets/images/index_focus.png"
      },
      {
        pagePath: "pages/publish/publish",
        text: "发布",
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的",
        // iconPath: "./assets/images/person.png",
        // selectedIconPath: "./assets/images/personSelect.png"
      }
    ]
  }
})
