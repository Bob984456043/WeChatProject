var app = getApp()
Page({
  onShow: function () {
    this.setData({
      theGlobalData: app.globalData.countWordMemorized
    })
  }
})