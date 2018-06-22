var Bmob = require('dist/Bmob-1.6.0.min.js');
Bmob.initialize("87ae61ecb9cab8424997d11f3646497c", "4ad8c1c20fb212e84e8c4f5d0031b055");

App({

  onLaunch: function () {

    var that = this

    let current = Bmob.User.current()

    this.globalData.userInfo = current

    if (that.globalData.userInfo) {
      console.log('有用户且已登录', that.globalData.userInfo)
    } else {
      console.log('无用户，或用户已退出登录')
    }
  },

  globalData: {
    userInfo: null,
  }
})