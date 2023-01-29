const fileUpload = require("express-fileupload");
module.exports = fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, //byes(octets) -< max 5 megaoctets
  safeFileNames: true,
  preserveExtension: 4,
  debug: false,
  abortOnLimit: true,
});
