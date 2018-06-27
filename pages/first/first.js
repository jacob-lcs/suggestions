// pages/first/first.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
        title: '上海大学计算机学院',
        img: '/images/TimerPaper@2x.png',
        text: '上海大学计算机工程与科学学院始建于1988年，由上海工业大学计算机工程系和上海科学技术大学计算机科学系联合成立。',
      },
      {
        title: '自强4000',
        img: '/images/UWP@2x.png',
        text: '2013年建成的第三代集群式高性能计算机“自强4000”共有162个节点机，2480个计算核。',

      },
      {
        title: '热评文章',
        topic: '数码',
        img: '/images/Diss@2x.png',
        text: '针对当下的科技数码大事件作出评论，对新鲜产品第一时间上手体验，分享第一手的观点与感受，既有深度又有风度。',
        total: "",
        time: ""
      }
    ],
    textList: [],
    listNum: 0,
    showLeft1: false,
    username: '',
    x:app.globalData.windowWidth*0.8*0.3,
    y:30,
  },

  pl:function(){
    wx.navigateTo({
      url: '/pages/home/mycomment/mycomment',
    })
  },

  fabu: function () {
    wx.navigateTo({
      url: '/pages/home/mysug/mysug',
    })
  },
  
  onChange: function (e) {
    console.log(e.detail)
    this.setData({
      x: app.globalData.windowWidth * 0.8* 0.3,
      y:30
    })
  },

  to_aboutus: function() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },

  toggleLeft1: function() {
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/home/login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        showLeft1: !this.data.showLeft1
      });
    }
  },

  change: function() {
    console.log("aaaa")
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (app.globalData.userInfo) {
      this.setData({
        username: app.globalData.userInfo.username
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})