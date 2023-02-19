module.exports = function blobNameFromUrl(url) {
  return url.split("/").pop();
};
