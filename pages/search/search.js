// index.js

var app = getApp();

Page({
  data: {
    text: "",
    sentext: "",
    checkWord: null,
    string: 2323123
  },
  wordInput: function (e) {
    console.log(e);
    this.setData({ checkWord: e.detail.value });
  },
  setnumber: function () {
    this.setData({
      string: 123
    })
  },
  btnClick: function () {
    var thispage = this;
    app.getInfo(this.data.checkWord, function (data) {
      if (data.data.cn_definition) {
        console.log(data.data.id);
        thispage.setData({ text: data.data.cn_definition.defn });
        app.getSen(data.data.id, function (data) {
          var sen = (data.data)[0].annotation;
          sen = sen.replace(/<[^>]+>/g, "");
          var tran = (data.data)[0].translation;
          var showText = "例句:" + "\n" + sen + "\n" + tran;
          thispage.setData({ sentext: showText });
          console.log(sen);
        })
      } else {
        thispage.setData({ text: "查询不到这个单词" });
        thispage.setData({ sentext: "" });
      }
    })
  }

})