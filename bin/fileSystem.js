var fs = require('fs-extra');
var path = require("path");

module.exports = {

  copySlide: function (presentation) {
    console.log("Copying Slide...");
    fs.copy(presentation, path.join(__dirname, "../slide.js"), err => {
      if (err) throw err
      console.log("Slide Copied.");
    });
  },

  copyAssets: function (assets) {
    console.log("Copying Assets...");
    fs.copy(assets, path.join(__dirname, "../assets"), err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Done.");
      }
    });
  },

  watch: function (presentation, assets) {
    fs.watch(presentation, (event, filename) => {
      this.copySlide(presentation);
    });
    fs.watch(assets, (event, filename) => {
      this.copyAssets(assets);
    })
  }

}
