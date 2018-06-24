// pages/home/home.js
var Bmob = require('../../dist/Bmob-1.6.0.min.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uInfo:app.globalData.userInfo,
  },

  //切换账号
  userchange: function(e){
    console.log("用户切换账号")
    app.globalData.userInfo = null
    console.log(app.globalData.userInfo)
    wx.redirectTo({
      url: 'login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

      // this.data.uInfo = app.globalData.userInfo
      this.setData({'uInfo': app.globalData.userInfo})
      if (this.data.uInfo) {
        console.log('存在用户，显示详情', this.data.uInfo)
      }
      else{
        console.log('无用户，进入登录注册界面')
        wx.navigateTo({
          url: 'login/login',
        })
      }
  },

  history:function(){
    wx.navigateTo({
      url: 'history/history',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({ 'uInfo': app.globalData.userInfo})
    console.log('onshow',this.data.uInfo)
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

  },

})