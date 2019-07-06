var vocabulary = require('../../data/vocabulary.js');
var five = require('../../data/500.js');
var cetfour=require('../../data/cet4.js');

Page({
    data: {
      innerAudioContext: null,
      
    },

    onLoad: function (options) {
      this.backgroundAudioManager = wx.getBackgroundAudioManager();
        var idx = Math.floor(Math.random() * 100) + 1;
        console.log(idx);
        var word = cetfour.wordList[idx];
        var that = this;
        wx.request({
          url: 'https://api.shanbay.com/bdc/search?word=' + word,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    content: res.data.data.content,
                    audio: res.data.data.audio_addresses.us[0],
                    pron: res.data.data.pron,
                    definition: res.data.data.definition
                })
                // wx.downloadFile({
                //     url: res.data.data.audio_addresses.us[0], 
                //     success: function (res) {
                //         wx.playVoice({
                //             filePath: res.tempFilePath
                //         })
                //     }
                // })
            },
            fail: function () {
            },
            complete: function () {
            }
        })

    },
    show: function () {
        this.setData({
            showNot: true
        })
    },

    next: function () {
        this.setData({
            showNot: false
        })
        var idx = Math.floor(Math.random() * 450) + 1
        var word = vocabulary.wordList[idx];
        var that = this;
        console.log(idx);
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
                // wx.downloadFile({
                //     url: res.data.data.audio_addresses.us[0], 
                //     success: function (res) {
                //         wx.playVoice({
                //             filePath: res.tempFilePath
                //         })
                //     }
                // })
            },
            fail: function () {
            },
            complete: function () {
            }
        })
    },
    read: function () {


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