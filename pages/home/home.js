var app = getApp()
Page({
  onShow: function () {
    this.setData({
      count: app.globalData.countWordMemorized
    })
  }
})