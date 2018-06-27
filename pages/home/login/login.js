// pages/home/home.js
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '登录',
    current_scroll: '登录',
    hidden:true
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    console.log("current发生变换：",this.data.current)
    if (this.data.current == "登录") {
      this.setData({
        hidden: true
      })
    }
    else {
      this.setData({
        hidden: false
      })
    }
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
    console.log("current_scroll发生变换：", this.data.current)
  },

  //登录
  formSubmit: function (e) {
    var value = e.detail.value
    if (this.data.current == '登录'){
      console.log('form发生了submit事件，携带数据为：', value)
      Bmob.User.login(value["userId"], value["userPw"]).then(res => {
        console.log(res)
        app.globalData.userInfo = res
        console.log('跳到index')
        wx.navigateTo({
          url: '/pages/first/first',
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '用户名或密码输入错误',
          icon: 'none',
          duration: 2000
        })
      })
    }
    else{
      console.log('form发生了regist事件，携带数据为：', value)
      var that = this;
      let params = {
        username: value["userId"],
        password: value["userPw"],
        email: value["userEm"],
      }
      Bmob.User.register(params).then(res => {
        console.log('注册成功', res)
        wx.showModal({
          title: '提示',
          content: '注册成功，请登录'
        })
      }).catch(err => {
        console.log(err)
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})