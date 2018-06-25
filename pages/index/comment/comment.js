// pages/index/comment/comment.js
//index.js
//获取应用实例
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
var common = require('../../../dist/common.js');

var app = getApp();
var that;
Page({

  data: {
    writeDiary: false,
    loading: false,
    limit: 100,
    textList: [],
    amodifyDiarys: false,
    objectId: '',
    pinglun: ''
  },

  tijiao: function(e) {
    console.log(this.data.pinglun)
    if (this.data.pinglun.length == 0) {
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

      console.log("评论：" + this.data.pinglun);
      const query = Bmob.Query('comment');
      query.set("textID", this.data.objectId)
      console.log("this.data.objectId" + this.data.objectId)
      query.set("comment", this.data.pinglun)
      query.set("userID", app.globalData.userInfo.objectId)
      query.save().then(res => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '提交成功',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
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
      this.setData({
        pinglun: "",
      });
    }
  },

  sugInput: function(e) {
    this.setData({
      pinglun: e.detail.value
    })
  },

  onReady: function(e) {
    const query = Bmob.Query("comment");
    query.equalTo("textID", "==", this.data.objectId);
    query.find().then(res => {
      console.log(res)
      this.setData({
        'textList': res
      })
      console.log('textList:', this.data.textList)
    });
  },

  onLoad: function(e) {
    that = this;
    var k = 'http://bmob-cdn-12917.b0.upaiyun.com/2017/07/18/d99d3bb7400cb1ed808f34896bff6fcc.jpg';
    var newUrl = k.replace("http://bmob-cdn-12917.b0.upaiyun.com", "https://bmob-cdn-12917.bmobcloud.com")
    console.log(newUrl);

    console.log(e.objectId)
    var objectId = e.objectId;
    var that = this;
    console.log('onload执行')
    this.setData({
      objectId: objectId
    })
  },

  onShow: function() {
    console.log("onshow函数运行");
    const query = Bmob.Query("comment");
    query.equalTo("textID", "==", this.data.objectId);
    query.find().then(res => {
      console.log(res)
      this.setData({
        'textList': res
      })
      console.log('textList:', this.data.textList)
    });
  }

})