const mime = require("mime-types");
class checkExtension {
  constructor() {
    this.supportedExtentions = {
      images: ["jpg", "jpeg", "png", "gif"],
      videos: ["mp4", "avi", "mov", "mkv", "webm"],
      audios: ["mp3", "wav", "ogg"],
    };
  }
  checkType(categorie, files) {
    const filesKyes = Object.keys(files);
    // console.log(
    //   "🚀 ~ file: checkExtension.js:12 ~ checkExtension ~ checkType ~ filesKyes",
    //   filesKyes
    // );
    // console.log(files);
    filesKyes.map((key) => {
      const file = files[key];
      //   console.log(file);
      const extention = mime.extension(file.mimetype);
      console.log(
        "🚀 ~ file: checkExtension.js:16 ~ checkExtension ~ filesKyes.map ~ extention",
        categorie
      );
      if (!this.supportedExtentions[categorie].includes(extention)) {
        throw new Error("file type not supported");
      }
    });
  }
}

module.exports = new checkExtension();
