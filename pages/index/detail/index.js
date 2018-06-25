// pages/index/detail/index.js
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
Page({
  data: {
    rows: {},
    zans: 0,
    PlId: '',
    objectId:''
  },

  zan: function(e) {
    var zant = this.data.zans + 1;
    this.setData({
      zans: zant
    })

    var qu = Bmob.Query('text');
    qu.get(this.data.objectId).then(res => {

      console.log('resviews__', res.viewed)
      res.set('ding', res.ding + 1)
      this.data.rows.ding = res.ding + 1
      res.save()
    }).catch(err => {
      console.log(err)
    })

  },

  onLoad: function(e) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(e.objectId)
    var objectId = e.objectId;
    var that = this;
    console.log('onload执行')

    const qu = Bmob.Query('text');
    qu.get(objectId).then(res => {
      console.log('res', res)
      res.set('viewed', res.viewed + 1)

      res.save()
      console.log('resviews', res.viewed)

      that.setData({
        rows: res,
        objectId: objectId,
        zans: res.ding
      });
      console.log('rows', that.data.rows);
    }).catch(err => {
      console.log(err)
    })
  },
  onReady: function(e) {
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