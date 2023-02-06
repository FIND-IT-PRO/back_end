const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const blobNameFromUrl = require("../helpers/blobNameFromUrl");
require("dotenv").config();

class Storage {
  constructor() {
    const AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object with connection string
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    // const containerName = "images";
    // Get a reference to a container
    // this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  getBlobNames(containerName, files) {
    // console.log(file);

    // console.log(
    //   "🚀 ~ file: storage.js:28 ~ Storage ~ getBlobName ~ file",
    //   files
    // );
    //select a container
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    //adding blockBlobClients to an array
    const blockBlobClients = [];
    Object.keys(files).map((key) => {
      const file = files[key];

      // Create a unique name for the blob
      const blobName =
        file.name + uuidv1() + "." + mime.extension(file.mimetype);
      // console.log(
      //   "🚀 ~ file: storage.js:29 ~ Storage ~ getBlobName ~ blobName",
      //   blobName
      // );
      // Get a block blob client
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      blockBlobClients.push(blockBlobClient);
      // console.log(
      //   "🚀 ~ file: storage.js:32 ~ Storage ~ getBlobName ~ blockBlobClient",
      //   blockBlobClient
      // );
    });
    return blockBlobClients;
  }
  async uploadFiles(blockBlobClients, files) {
    // console.log("🚀 ~ file: storage.js:54 ~ Storage ~ uploadFiles ~ files");
    const filesKyes = Object.keys(files);
    blockBlobClients.map(async (blockBlobClient, index) => {
      await blockBlobClient.uploadData(
        files[filesKyes[index]].data,
        files[filesKyes[index]].size
      );
    });
    // Display blob name and url
    // console.log(
    //   `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    // );
    // const absolutePath = path.join(__dirname, "../public/img.png");
    // Upload data to the blob

    // const uploadBlobResponse = await blockBlobClient.uploadData(
    //   file.data,
    //   file.size
    // );
    // console.log(
    //   `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
    // );
  }
  async updateUploadedFile(url, containerName, file) {
    // containerName is the catgeorie
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      blobNameFromUrl(url)
    );
    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.uploadData(
      file.data,
      file.size
    );
    return uploadBlobResponse;
  }
  async removeUploadedFile(url, containerName) {
    try {
      // console.log(
      //   "🚀 ~ file: storage.js:98 ~ Storage ~ removeUploadedFile ~ url",
      //   url
      // );
      //it remains 7 days by the way but the link will be unuseable
      this.containerClient =
        this.blobServiceClient.getContainerClient(containerName);

      const blockBlobClient = this.containerClient.getBlockBlobClient(
        blobNameFromUrl(url)
      );
      if (!blockBlobClient.exists)
        return new Promise((resolve, reject) => resolve()); // if the img doesn't exists
      // console.log(
      //   "🚀 ~ file: storage.js:117 ~ Storage ~ removeUploadedFile ~ blockBlobClient.exists",
      //   blockBlobClient.exists
      // );

      return await blockBlobClient.delete();
    } catch (e) {
      // console.log(e);
    }
  }
  async validBlobLink(imagesUrl, containerName) {
    let isValid = true;
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    for (let i = 0; i < imagesUrl.length; i++) {
      const blockBlobClient = this.containerClient.getBlockBlobClient(
        blobNameFromUrl(imagesUrl[i])
      );
      isValid = await blockBlobClient.exists();
      if (!isValid) break;
    }
    return isValid;
  }
}

// const S1 = new Storage();

// S1.uploadFile("testimages", ".png").catch((err) => {
//   console.error("Error running sample:", err);
// });
// S1.updateUploadedFile(
//   "testimages099c7a00-9cef-11ed-86eb-35cb833df65e.png"
// ).catch((err) => {
//   console.error("Error running sample:", err);
// });
// S1.removeUploadedFile(
//   "testimages099c7a00-9cef-11ed-86eb-35cb833df65e.png"
// ).catch((err) => {
//   console.error("Error running sample:", err);
// });
module.exports = new Storage();
