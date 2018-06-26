// pages/index/detail/index.js
// pages/index / detail / index.js
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
var app = getApp();

Page({
  data: {
    rows: {},
    zans: 0,
    PlId: '',
    objectId: '',
    textList: [],
    pinglun: '',
    hiddenmodalput: true,
  },

  //点击按钮指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
    this.setData({
      pinglun: "",
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })

    console.log("评论：" + this.data.pinglun);
    const query = Bmob.Query('comment');
    query.set("textID", this.data.objectId)
    console.log("this.data.objectId" + this.data.objectId)
    query.set("comment", this.data.pinglun)
    query.set("commentator", app.globalData.userInfo.username)
    query.save().then(res => {
      console.log(res)
      wx.showModal({
        title: '提示',
        content: '提交成功',
        success: function (res) {
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
        success: function (res) {
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
  },


  tijiao: function (e) {

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    // console.log("评论：" + this.data.pinglun);
    // const query = Bmob.Query('comment');
    // query.set("textID", this.data.objectId)
    // console.log("this.data.objectId" + this.data.objectId)
    // query.set("comment", this.data.pinglun)
    // query.set("userID", app.globalData.userInfo.objectId)
    // query.save().then(res => {
    //   console.log(res)
    //   wx.showModal({
    //     title: '提示',
    //     content: '提交成功',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }).catch(err => {
    //   console.log(err)
    //   wx.showModal({
    //     title: '提示',
    //     content: '提交失败,请检查网络',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // })
    // this.setData({
    //   pinglun: "",
    // });
  },

  sugInput: function (e) {
    this.setData({
      pinglun: e.detail.value
    })
  },


  zan: function (e) {
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

  onLoad: function (e) {
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

    const query = Bmob.Query("comment");
    query.equalTo("textID", "==", objectId);
    query.find().then(res => {
      console.log(res)
      this.setData({
        'commentList': res
      })
      console.log('commentList:', this.data.commentList)
    });

  },

  onReady: function (e) {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示


  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})








// var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
// var app = getApp();
// Page({
//   data: {
//     rows: {},
//     zans: 0,
//     PlId: '',
//     objectId: ''
//   },
//   zan: function(e) {
//     const qu1 = Bmob.Query("ding");
//     qu1.equalTo("textID", "==", this.data.objectId);
//     qu1.equalTo("userID", "==", app.globalData.userInfo.objectId);
//     qu1.find().then(res => {
//       if (res.length != 0) {
//         wx.showModal({
//           title: '提示',
//           content: '每个人只能赞一次哦',
//           success: function(res) {
//             if (res.confirm) {
//               console.log('用户点击确定')
//             } else if (res.cancel) {
//               console.log('用户点击取消')
//             }
//           }
//         })
//       } else {
//         var zant = this.data.zans + 1;
//         this.setData({
//           zans: zant
//         })
//         var query = Bmob.Query('ding');
//         query.set("textID", this.data.objectId)
//         query.set("userID", app.globalData.userInfo.objectId)
//         query.save().then(res => {
//           console.log(res)
//         }).catch(err => {
//           console.log(err)
//         })
//         var qu = Bmob.Query('text');
//         qu.get(this.data.objectId).then(res => {

//           console.log('resviews__', res.viewed)
//           res.set('ding', res.ding + 1)
//           this.data.rows.ding = res.ding + 1
//           res.save()
//         }).catch(err => {
//           console.log(err)
//         })
//       }

//     });
//   },

//   onLoad: function(e) {
//     // 页面初始化 options为页面跳转所带来的参数

//     console.log(e.objectId)
//     var objectId = e.objectId;
//     var that = this;
//     console.log('onload执行')

//     const qu = Bmob.Query('text');
//     qu.get(objectId).then(res => {
//       console.log('res', res)
//       res.set('viewed', res.viewed + 1)

//       res.save()
//       console.log('resviews', res.viewed)

//       that.setData({
//         rows: res,
//         objectId: objectId,
//         zans: res.ding
//       });
//       console.log('rows', that.data.rows);
//     }).catch(err => {
//       console.log(err)
//     })
//   },
//   onReady: function(e) {
//     // 页面渲染完成
//   },
//   onShow: function() {

//     // 页面显示
//   },
//   onHide: function() {
//     // 页面隐藏
//   },
//   onUnload: function() {
//     // 页面关闭
//   }
// })