// pages/suggest/suggest.js
var Bmob = require('../../dist/Bmob-1.6.0.min.js');

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {
    userName: '',
    classes: "后勤",
    items: [{
        name: '教学',
        value: '教学'
      },
      {
        name: '后勤',
        value: '后勤',
        checked: 'true'
      },
      {
        name: '课余',
        value: '课余'
      },
      {
        name: '其他',
        value: '其他'
      }
    ]
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      classes: e.detail.value
    })
  },

  sugInput: function(e) {
    this.setData({
      suggestion: e.detail.value
    })
  },

  loginBtnClick: function(e) {
    if (this.data.suggestion == null) {
      wx.showModal({
        title: '提示',
        content: '请不要输入空的内容哦',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      console.log("类别：" + this.data.classes + " 建议：" + this.data.suggestion);
      const query = Bmob.Query('text');
      query.set("classes", this.data.classes)
      query.set("content", this.data.suggestion)
      query.set("writer", app.globalData.userInfo.username)
      query.set("viewed", 0)
      query.set("ding", 0)
      query.set("checked", false)
      query.save().then(res => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '提交成功',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '../index/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

        console.log("跳转界面")
      }).catch(err => {
        console.log(err)
        wx.showModal({
          title: '提示',
          content: '提交失败,请检查网络',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      })
    }
    this.setData({
      suggestion: "",
      userName: ""
    });
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

  },

  upload() {

  },
})