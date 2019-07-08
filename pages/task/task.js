var vocabulary = require('../../data/vocabulary.js');
var five = require('../../data/500.js');
var booklis = {
  "cet4": require('../../data/cet4.js'),
  "cet4_import": require('../../data/cet4_import.js'),
  "cet6": require('../../data/cet6.js'),
  "cet6_import": require('../../data/cet6_import.js'),
  "kaoyan": require('../../data/kaoyan.js'),
  "kaoyan_import": require('../../data/kaoyan_import.js')
}
var app = getApp()
Page({
  data: {
    innerAudioContext: null
  },

  onLoad: function(options) {
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    var idx = Math.floor(Math.random() * 450) + 1;
    console.log(idx);
    wx.setStorageSync("book", "cet4");
    var word = booklis[wx.getStorageSync("book")].wordList[idx];
    var that = this;
    wx.request({
      url: 'https://api.shanbay.com/bdc/search?word=' + word,
      data: {},
      method: 'GET',
      success: function(res) {
        console.log(res);
        that.setData({
          content: res.data.data.content,
          audio: res.data.data.audio_addresses.us[0],
          pron: res.data.data.pron,
          definition: res.data.data.definition
        })
      },
      fail: function() {},
      complete: function() {}
    })
  },

  onReady: function () {
    this.toast = this.selectComponent("#toast");
  },

  show: function() {
    this.toast.showToast('笨蛋')
    this.setData({
        showNot: true
      })
  },

  next: function () {
    this.setData({
      showNot: false
    });
    var idx = Math.floor(Math.random() * 450) + 1;
    var word = booklis[wx.getStorageSync("book")].wordList[idx];
    var that = this;
    app.globalData.countWordMemorized = app.globalData.countWordMemorized + 1;
    wx.request({
      url: 'https://api.shanbay.com/bdc/search?word=' + word,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          content: res.data.data.content,
          audio: res.data.data.audio_addresses.us[0],
          pron: res.data.data.pron,
          definition: res.data.data.definition
        })
      },
      fail: function () { },
      complete: function () { }
    })
  },

  read: function() {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.audio
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  }
})