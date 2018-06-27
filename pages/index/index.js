//index.js
//获取应用实例
var Bmob = require('../../dist/Bmob-1.6.0.min.js');
var common = require('../../dist/common.js');

var app = getApp();
var that;
Page({
  data: {
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 1000,
    textList: {},
    amodifyDiarys: false,
    classes: ['全部', '教学', '后勤', '课余', '其他'],
    index: 0,
    current: '全部',
    current_scroll: '全部',
    color: ["#72afd3, #37ecba"],
    deg: 135,
    showLeft1: false,
    username: ''
  },

  change:function(){
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },

  home:function(){
    wx.navigateTo({
      url: '/pages/first/first',
    })
  },

  aboutus:function(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },

  toggleLeft1() {
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
    }
    else{
      this.setData({
        showLeft1: !this.data.showLeft1
      });
    }
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  fabu: function() {
    wx.navigateTo({
      url: '/pages/home/mysug/mysug',
    })
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
    const query = Bmob.Query("text");
    query.order("-ding");
    if (detail.key == "全部") {
      query.find().then(res => {
        console.log(res)
        this.setData({
          textList: res
        })
      });
    } else {
      query.equalTo("classes", "==", detail.key);
      console.log("detail.key", detail.key)
      query.find().then(res => {
        console.log(res)
        this.setData({
          textList: res
        })
      });
    }
  },

  onReady: function(e) {
    const query = Bmob.Query("text");
    query.order("-ding");
    query.find().then(res => {
      console.log(res)
      this.setData({
        'textList': res
      })
      console.log('textList:', this.data.textList)
    });
    this.setData({
      username: app.globalData.userInfo.username
    })
  },

  onShareAppMessage: function() {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
        console.log('成功', res)

        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {

            //内部调用云端代码
            var currentUser = Bmob.User.current();
            var data = {
              "objectId": currentUser.id,
              "encryptedData": res.encryptedData,
              "iv": res.iv
            };
            console.log(data);

            // console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function(obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function(err) {
              console.log(err)
            });

            data = {
              "objectId": currentUser.id,
              "encryptedData": "Q3h+kMwbKZ52BsxgNT4GS5LTYeLLGIXnA/BZrg/9iMJBD5Qv3Fs5H66xe9ml7iNIsOBEtaeUG0InAxbZOhn1qEeAJ2aC3wYpjARR4pCYA1v87+bj9khaUDY6pvaKX5/4TFHrofKAmA0gTT6bSaHyiw==",
              "iv": "YHoSkWomdfiyvAWHoYvKiQ=="
            };
            console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function(obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function(err) {
              console.log(err)
            });

          }
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onLoad: function() {
    that = this;

    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })

    var k = 'http://bmob-cdn-12917.b0.upaiyun.com/2017/07/18/d99d3bb7400cb1ed808f34896bff6fcc.jpg';
    var newUrl = k.replace("http://bmob-cdn-12917.b0.upaiyun.com", "https://bmob-cdn-12917.bmobcloud.com")

    console.log(newUrl);
  },
  noneWindows: function() {
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  shijian:function(){
    const query = Bmob.Query("text");
    query.order("-createdAt");
      query.find().then(res => {
        console.log("res", res)
        this.setData({
          textList: res
        })
      });
  },

  zanpai:function(){
    const query = Bmob.Query("text");
    query.order("-ding");
    query.find().then(res => {
      console.log("res", res)
      this.setData({
        textList: res
      })
    });
  },
  onShow: function() {

    // getList(this);
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
    console.log("onshow函数运行");
    const query = Bmob.Query("text");
    query.order("-ding");
    if (this.data.current_scroll == "全部") {
      query.find().then(res => {
        console.log("res", res)
        this.setData({
          textList: res
        })
      });
    } else {
      query.equalTo("classes", "==", this.data.current_scroll);
      query.find().then(res => {
        console.log(res)
        this.setData({
          textList: res
        })
      });
    }
  },
  // pullUpLoad: function(e) { //下拉触底
  //   var limit = that.data.limit + 2
  //   this.setData({
  //     limit: limit
  //   })
  //   this.onShow()
  // },
  closeLayer: function() {
    that.setData({
      writeDiary: false
    })
  },
  toModifyDiary: function(event) {
    var nowTile = event.target.dataset.title;
    var nowContent = event.target.dataset.content;
    var nowId = event.target.dataset.id;
    that.setData({
      modifyDiarys: true,
      nowTitle: nowTile,
      nowContent: nowContent,
      nowId: nowId
    })
  },
  modifyDiary: function(e) {
    var t = this;
    modify(t, e)
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    getLike(this);
    this.onShow();
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
    getLike(this);
    this.onShow();
  },
  inputTyping: function(e) {
    //搜索数据
    getLike(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  closeAddLayer: function() {
    that.setData({
      modifyDiarys: false
    })
  }

})

function getLike(t, k) {
  that = t;
  const query = Bmob.Query("text");
  query.find().then(res => {
    console.log(res)
    var i;
    var test = [];
    for (i = 0; i < res.length; i++) {
      if (res[i].content.indexOf(k) >= 0) {
        console.log("成功");
        test[test.length] = res[i]
        that.setData({
          textList: null,
          textList: test,
        })
      };
    }
  })
  console.log("TextList",t.data.textList)
}