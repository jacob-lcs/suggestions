// pages/index/detail/index.js
// var Bmob = require('../../../dist/bmob.js');
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
Page({
  data: {
    rows: {}
  },
  onLoad: function (e) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(e.objectId)
    var objectId = e.objectId;

    const query = Bmob.Query("text");
    query.equalTo("objectId", "==", objectId);
    console.log("读取数据成功");

    query.find().then(res => {
      console.log(res);
      this.setData({
        rows: res
      });
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})